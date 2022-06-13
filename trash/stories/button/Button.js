import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';
import './button.css';

/**
 * Primary UI component for user interaction
 */
export const DevTest = ({ DevTest = null, text, onClick }) => {
  const mode = DevTest;

  return html`
    <button
      type="button"
      class="moyo-button moyo-button--primary"
      @click=${onClick}
    >
      ${text}
    </button>
    <button
      type="button"
      class="moyo-button moyo-button--secondary"
      @click=${onClick}
    >
      ${text}
    </button>
    <button
      type="button"
      class="moyo-button moyo-button--danger"
      @click=${onClick}
    >
      ${text}
    </button>
    <button
      type="button"
      class="moyo-button moyo-button--tertiary"
      @click=${onClick}
    >
      ${text}
    </button>
    <button
      type="button"
      class="moyo-button moyo-button--layer"
      @click=${onClick}
    >
      ${text}
    </button>
  `;
};
