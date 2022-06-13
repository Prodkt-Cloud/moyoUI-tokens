import { html } from 'lit-html';


export default {
    title: 'TopBar',
}
export const Primary = () => html`<demo-button .background="#ff0" .label="Button"></demo-button>`;
export const Secondary = () => html`<demo-button .background="#ff0" .label="😄👍😍💯"></demo-button>`;
export const Tertiary = () => html`<demo-button .background="#ff0" .label="📚📕📈🤓"></demo-button>`;