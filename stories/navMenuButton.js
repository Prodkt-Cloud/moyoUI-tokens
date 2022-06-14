import { html } from 'lit-html';
import './navmenubutton.css';

/**
 * Primary UI component for user interaction
 */
export const navMenuButton = ({ primary = null, variant, label, onClick, iconStyle, btnIcon }) => {
  const mode = primary;


  return html`
<button
type="button"
class=${['moyo-navBtn', `moyo-navBtn--${variant || 'primary'}`, mode].join(' ')}
@click=${onClick}
>
<i class="${iconStyle} fa-${btnIcon}"></i> ${label}
</button>
  `;
};
