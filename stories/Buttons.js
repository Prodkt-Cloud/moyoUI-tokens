import { html } from 'lit-html';
import { Header } from './Header';
import { Button } from './Button';
import './buttons.css';

export const Buttons = ({ LearnerPortal }) => html`
${Header({
LearnerPortal,
})}
<article class="buttons">
${Button({
variant: 'primary',
label: 'Primary Button',
iconStyle: 'fa-solid',
btnIcon: 'axe-battle',
})}
${Button({
variant: 'secondary',
label: 'Secondary Button',
iconStyle: 'fa-solid',
btnIcon: 'axe-battle',
})}
${Button({
variant: 'danger',
label: 'Danger Button',
iconStyle: 'fa-solid',
btnIcon: 'axe-battle',
})}
${Button({
variant: 'warning',
label: 'Warning Button',
iconStyle: 'fa-solid',
btnIcon: 'axe-battle',
})}
${Button({
variant: 'tertiary',
label: 'Tertiary Button',
iconStyle: 'fa-solid',
btnIcon: 'axe-battle',
})}
${Button({
variant: 'ghost',
label: 'Ghost Button',
iconStyle: 'fa-solid',
btnIcon: 'axe-battle',
})}
${Button({
variant: 'layer',
label: 'Layer Button',
iconStyle: 'fa-solid',
btnIcon: 'axe-battle',
})}
</article>
`;

