const StyleDictionaryPackage = require('style-dictionary');


module.exports = {
    format: {
      // Adding a custom format to show how to get an alias's name.
      customFormat: function({dictionary, options}) {
        return dictionary.allTokens.map(token => {
          let value = JSON.stringify(token.value);
          // new option added to decide whether or not to output references
          if (options.outputReferences) {
            // the `dictionary` object now has `usesReference()` and
            // `getReferences()` methods. `usesReference()` will return true if
            // the value has a reference in it. `getReferences()` will return
            // an array of references to the whole tokens so that you can access
            // their names or any other attributes.
            if (dictionary.usesReference(token.original.value)) {
              const refs = dictionary.getReferences(token.original.value);
              refs.forEach(ref => {
                value = value.replace(ref.value, function() {
                  return `${ref.name}`;
                });
              });
            }
          }
  
          return `export const ${token.name} = ${value};`
        }).join(`\n`)
      }
    }
}

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(theme, platform) {
  return {

    
    "source": [
      "design/global/*.json",
      "design/brand-base/*.json",
      `design/${theme}/*.json`
    ],
    "platforms": {
      "web": {
        "transformGroup": "web",
        "buildPath": `build/web/${theme}/`,
        "files": [{
          "destination": "tokens.scss",
          "format": "scss/variables",
          options: {
            outputReferences: true, // new setting, if true will use variable references
          }
        }]
      },
      "css": {
        transformGroup: 'css',
        buildPath: `build/css/${theme}/`,
        files: [{
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true, // new setting, if true will use variable references
          }
        }]
      },
      "android": {
        "transformGroup": "android",
        "buildPath": `build/android/${theme}/`,
        "files": [{
          "destination": "tokens.colors.xml",
          "format": "android/colors"
        },{
          "destination": "tokens.dimens.xml",
          "format": "android/dimens"
        },{
          "destination": "tokens.font_dimens.xml",
          "format": "android/fontDimens"
        }]
      },
      "ios": {
        "transformGroup": "ios",
        "buildPath": `build/ios/${theme}/`,
        "files": [{
          "destination": "tokens.h",
          "format": "ios/macros"
        }]
      }
    }
  };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['daylight', 'nightfall'].map(function (theme) {
  ['web', 'ios', 'android', 'css'].map(function (platform) {

    

    console.log('\n==============================================');
    console.log(`\nProcessing: [${platform}] [${theme}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme, platform));


    module.exports = {
        format: {
          // Adding a custom format to show how to get an alias's name.
          customFormat: function({dictionary, options}) {
            return dictionary.allTokens.map(token => {
              let value = JSON.stringify(token.value);
              // new option added to decide whether or not to output references
              if (options.outputReferences) {
                // the `dictionary` object now has `usesReference()` and
                // `getReferences()` methods. `usesReference()` will return true if
                // the value has a reference in it. `getReferences()` will return
                // an array of references to the whole tokens so that you can access
                // their names or any other attributes.
                if (dictionary.usesReference(token.original.value)) {
                  const refs = dictionary.getReferences(token.original.value);
                  refs.forEach(ref => {
                    value = value.replace(ref.value, function() {
                      return `${ref.name}`;
                    });
                  });
                }
              }
      
              return `export const ${token.name} = ${value};`
            }).join(`\n`)
          }
        },
      
        source: ['tokens/**/*.json'],
        platforms: {
          json: {
            buildPath: 'build/',
            files: [{
              destination: 'tokens.json',
              format: 'json/nested'
            }]
          },
          js: {
            buildPath: 'build/',
            transformGroup: 'js',
            files: [{
              destination: 'tokens.js',
              format: 'customFormat',
              options: {
                outputReferences: true
              }
            }]
          },
          css: {
            transformGroup: 'css',
            buildPath: 'build/',
            files: [{
              destination: 'tokens.css',
              format: 'css/variables',
              options: {
                outputReferences: true, // new setting, if true will use variable references
              }
            },{
              destination: 'tokens.scss',
              format: 'scss/variables',
              options: {
                outputReferences: true, // new setting, if true will use variable references
              }
            }]
          }
        }
      };

    StyleDictionary.buildPlatform(platform);

    console.log('\nEnd processing');

  })
})

console.log('\n==============================================');
console.log('\nBuild completed!');