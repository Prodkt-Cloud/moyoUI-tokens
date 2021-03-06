module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@etchteam/storybook-addon-css-variables-theme',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    'storybook-addon-designs'
  ],
  "framework": "@storybook/web-components"
}