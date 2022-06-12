
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  cssVariables: {
    files: {
      'Light Theme': light,
      'Dark Theme': dark,
    },
    defaultTheme: 'Light Theme'
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'

import light from '!!style-loader?injectType=lazyStyleTag!css-loader!../build/css/daylight/tokens.css'
import dark from '!!style-loader?injectType=lazyStyleTag!css-loader!../build/css/nightfall/tokens.css'

export const decorators = [
  cssVariablesTheme,
];

