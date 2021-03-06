import { html } from 'lit-html';
import './button.css';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary = null, variant, label, onClick, iconStyle, btnIcon }) => {
  const mode = primary;


  return html`
<button
type="button"
class=${['moyo-button', `moyo-button--${variant || 'primary'}`, mode].join(' ')}
@click=${onClick}
>
<i class="${iconStyle} fa-${btnIcon}" role="none"></i> ${label}
</button>
  `;
};
