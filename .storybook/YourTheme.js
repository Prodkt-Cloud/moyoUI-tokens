import { create } from '@storybook/theming';

export default create({
base: 'dark',
brandTitle: 'MOYO UI | Figma to CSS',
//   brandUrl: 'https://example.com',
brandImage: 'https://cdn.bfldr.com/5E87S3GN/at/g4bjxxncsjfcsnnfrcpk4n/moyoui-wide--onDark.svg',
//   brandTarget: '_self',

// Typography
fontBase: '"Inter", sans-serif',
fontCode: '"Inter", sans-serif',

colorPrimary: '#60a5fa',
colorSecondary: '#3b82f6',

// UI
appBg: '#1f2937',
appContentBg: '#111827',
appBorderColor: '#1f2937',
appBorderRadius: '16px',

// Toolbar default and active colors
barTextColor: 'silver',
barSelectedColor: '#3b82f6',
barBg: 'black',


  // Form colors
  inputBg: 'black',
  inputBorder: '#111827',
  inputTextColor: 'silver',
  inputBorderRadius: 6,
});