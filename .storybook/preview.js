export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  cssVariables: {
    files: {
      'Daylight': light,
      'Nightfall': dark,
    },
    defaultTheme: 'Daylight'
  }
}

import light from '!!style-loader?injectType=lazyStyleTag!css-loader!../build/css/daylight/tokens.css'
import dark from '!!style-loader?injectType=lazyStyleTag!css-loader!../build/css/nightfall/tokens.css'

import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'

export const decorators = [
  cssVariablesTheme,
];
