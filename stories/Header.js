import { html } from 'lit-html';

import './header.css';

export const Header = ({ }) => html`
<header>
  <div class="wrapper">
    <div class="moyo-topbar--left">
      <button class="moyo-menu--toggle" aria-label="Menu Trigger" aria-expanded="true" id="menu-trigger">
        <i class="fa-solid fa-bars" aria-hidden="true" focusable="false"></i>
      </button>
      <div class="moyo-logo--topbar">
      <img id="brand-logo--topbar" src="./tovuti/tovuti-lms-logo.png" alt="test">
      </div>
      <div class="moyo-topbar--comsbar">
      <button class="moyo-topbar--comsitem" aria-label="Inbox"><i class="fa-solid fa-inbox" aria-hidden="true" focusable="false"></i></button>
      <button class="moyo-topbar--comsitem" aria-label="Notifications"><i class="fa-solid fa-bell" aria-hidden="true" focusable="false"></i></button>
      <button class="moyo-topbar--comsitem" aria-label="Share"><i class="fa-solid fa-share-nodes" aria-hidden="true" focusable="false"></i></button>
      <button class="moyo-topbar--comsitem" aria-label="Friend Requests"><i class="fa-solid fa-users" aria-hidden="true" focusable="false"></i></button>
      <button class="moyo-topbar--comsitem" aria-label="Private Share Link"><i class="fa-solid fa-link" aria-hidden="true" focusable="false"></i></button>
      </div>
    </div>
    <div class="moyo-topbar--right">
      <button class="moyo-topbar--right---itembase">
        <span class="moyo-topbar--cart---count">10</span>
        <i class="fa-solid fa-basket-shopping"></i>
      </button>
      <button class="moyo-topbar--right---itembase">
        <img src="https://twemoji.maxcdn.com/v/latest/svg/1f1fa-1f1f2.svg"> English
      </button>
      <button class="moyo-topbar--right---itembase">
        <div class="moyo-topbar--userpanel">
          Bryan Funk
          <div class="moyo-points--badge">1,000,000 Points</div>
        </div>
        <img class="moyo-topbar--userpanel---avatar" src="./tovuti/bryanfunk.jpg" alt="test">
      </button>
    </div>
  </div>
</header>
`;
