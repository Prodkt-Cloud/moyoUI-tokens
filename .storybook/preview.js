
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  cssVariables: {
    files: {
      'Daylight': light,
      'Nightfall': dark,
    },
    defaultTheme: 'Daylight'
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  toolbar: {
    icon: 'circlehollow',
    // Array of plain string values or MenuItem shape (see below)
    // Property that specifies if the name of the item will be displayed
    showName: true,
    // Change title based on selected value
    dynamicTitle: true,
  }
}

import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'

import light from '!!style-loader?injectType=lazyStyleTag!css-loader!../build/css/daylight/tokens.css'
import dark from '!!style-loader?injectType=lazyStyleTag!css-loader!../build/css/nightfall/tokens.css'

export const decorators = [
  cssVariablesTheme,
];

