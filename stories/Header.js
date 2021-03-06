import { html } from 'lit-html';

import './header.css';

export const Header = ({  }) => html`
<header>
  <div class="wrapper">
    <div class="moyo-topbar--left">
      <button class="moyo-menu--toggle" aria-label="Menu Trigger" aria-expanded="true" id="menu-trigger">
        <i class="fa-solid fa-bars" aria-hidden="true" focusable="false"></i>
      </button>
      <div class="moyo-logo--topbar">
        <svg width="191" height="48" viewBox="0 0 191 48" fill="none" xmlns="http://www.w3.org/2000/svg" alt="Tovuti User Interface">
          <g clip-path="url(#clip0_77_104)">
          <g clip-path="url(#clip1_77_104)">
          <path d="M30.9678 18.9294V27.8851H22.03L30.9678 18.9294Z" fill="var(--support-success)"/>
          <path d="M18.9598 8.0202V27.0182H0L18.9598 8.0202Z" fill="var(--blue-600)"/>
          <ellipse cx="4.47885" cy="12.4985" rx="4.47885" ry="4.47839" fill="var(--blue-700)"/>
          <ellipse cx="26.4889" cy="34.5095" rx="4.47885" ry="4.47839" fill="var(--support-info-inverse)"/>
          <rect y="30.0311" width="18.9598" height="8.95678" fill="var(--support-warning)"/>
          <rect x="22.01" y="8.02014" width="8.95771" height="8.95678" fill="var(--support-error)"/>
          </g>
          <path d="M49.3173 37.0622H44.7332V13.3531H49.1694V16.5077C49.8923 15.259 50.911 14.306 52.2254 13.6488C53.5399 12.9916 54.92 12.663 56.3659 12.663C57.9104 12.663 59.3234 13.0409 60.605 13.7967C61.8866 14.5525 62.8395 15.6698 63.4639 17.1485C65.1069 14.1582 67.7522 12.663 71.3998 12.663C73.6672 12.663 75.5896 13.4352 77.1669 14.9797C78.7771 16.5241 79.5822 18.7587 79.5822 21.6833V37.0622H74.9981V22.1762C74.9981 20.5332 74.5709 19.2187 73.7165 18.2329C72.895 17.2471 71.6463 16.7542 69.9704 16.7542C68.3602 16.7542 67.0457 17.3292 66.027 18.4794C65.0084 19.5966 64.499 21.0097 64.499 22.7184V37.0622H59.8656V22.1762C59.8656 20.5332 59.4384 19.2187 58.584 18.2329C57.7625 17.2471 56.5138 16.7542 54.8379 16.7542C53.1948 16.7542 51.864 17.3128 50.8453 18.4301C49.8266 19.5474 49.3173 20.9932 49.3173 22.7677V37.0622Z" fill="var(--text-primary)"/>
          <path d="M88.6726 31.443C90.1185 32.9218 91.8765 33.6611 93.9468 33.6611C96.017 33.6611 97.7586 32.9218 99.1717 31.443C100.618 29.9314 101.34 27.8447 101.34 25.183C101.34 22.5541 100.618 20.5003 99.1717 19.0216C97.7586 17.51 96.017 16.7542 93.9468 16.7542C91.8765 16.7542 90.1185 17.51 88.6726 19.0216C87.2596 20.5003 86.5531 22.5541 86.5531 25.183C86.5531 27.8447 87.2596 29.9314 88.6726 31.443ZM85.2222 16.212C87.5225 13.8131 90.4307 12.6137 93.9468 12.6137C97.4629 12.6137 100.355 13.8131 102.622 16.212C104.922 18.578 106.072 21.5683 106.072 25.183C106.072 28.8306 104.939 31.8538 102.671 34.2526C100.404 36.6186 97.4958 37.8016 93.9468 37.8016C90.3978 37.8016 87.4896 36.6186 85.2222 34.2526C82.9548 31.8538 81.8211 28.8306 81.8211 25.183C81.8211 21.5683 82.9548 18.578 85.2222 16.212Z" fill="var(--text-primary)"/>
          <path d="M113.749 46.9698H108.672L114.587 34.4498L104.383 13.3531H109.707L117.101 29.7178L124.199 13.3531H129.177L113.749 46.9698Z" fill="var(--text-primary)"/>
          <path d="M135.311 31.443C136.757 32.9218 138.515 33.6611 140.585 33.6611C142.655 33.6611 144.397 32.9218 145.81 31.443C147.256 29.9314 147.979 27.8447 147.979 25.183C147.979 22.5541 147.256 20.5003 145.81 19.0216C144.397 17.51 142.655 16.7542 140.585 16.7542C138.515 16.7542 136.757 17.51 135.311 19.0216C133.898 20.5003 133.191 22.5541 133.191 25.183C133.191 27.8447 133.898 29.9314 135.311 31.443ZM131.86 16.212C134.161 13.8131 137.069 12.6137 140.585 12.6137C144.101 12.6137 146.993 13.8131 149.26 16.212C151.56 18.578 152.711 21.5683 152.711 25.183C152.711 28.8306 151.577 31.8538 149.31 34.2526C147.042 36.6186 144.134 37.8016 140.585 37.8016C137.036 37.8016 134.128 36.6186 131.86 34.2526C129.593 31.8538 128.459 28.8306 128.459 25.183C128.459 21.5683 129.593 18.578 131.86 16.212Z" fill="var(--text-primary)"/>
          <path d="M177.222 34.2033C176.597 35.3863 175.644 36.29 174.363 36.9144C173.081 37.5059 171.701 37.8016 170.222 37.8016C167.528 37.8016 165.375 36.9144 163.765 35.1399C162.155 33.3325 161.35 31.0487 161.35 28.2884V13.3531H165.983V27.5983C165.983 29.3728 166.41 30.8351 167.265 31.9852C168.152 33.1354 169.516 33.7104 171.356 33.7104C173.196 33.7104 174.593 33.1682 175.546 32.0838C176.499 30.9665 176.975 29.4878 176.975 27.6476V13.3531H181.608V32.6753C181.608 34.2198 181.691 35.6821 181.855 37.0622H177.419C177.287 36.3393 177.222 35.3863 177.222 34.2033Z" fill="var(--text-primary)"/>
          <path d="M189.417 37.0622H184.832V13.3531H189.417V37.0622ZM184.734 6.74802C184.11 6.0908 183.797 5.30213 183.797 4.38203C183.797 3.46192 184.11 2.67326 184.734 2.01604C185.391 1.35882 186.18 1.03021 187.1 1.03021C188.02 1.03021 188.809 1.35882 189.466 2.01604C190.123 2.6404 190.452 3.42906 190.452 4.38203C190.452 5.30213 190.123 6.0908 189.466 6.74802C188.809 7.37237 188.02 7.68455 187.1 7.68455C186.18 7.68455 185.391 7.37237 184.734 6.74802Z" fill="var(--text-primary)"/>
          </g>
          <defs>
          <clipPath id="clip0_77_104">
          <rect width="190.452" height="48" fill="white"/>
          </clipPath>
          <clipPath id="clip1_77_104">
          <rect width="30.9677" height="30.9677" fill="white" transform="translate(0 8.02014)"/>
          </clipPath>
          </defs>
        </svg>
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
          Callie Mulvihill
          <div class="moyo-badge">1,000,000 Points</div>
        </div>
        <div class="moyo-topbar--userpanel---avatar"></div>
      </button>
    </div>
  </div>
</header>
`;
