module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@etchteam/storybook-addon-css-variables-theme",
    "@storybook/addon-essentials",
    '@storybook/addon-viewport'
  ],
  "framework": "@storybook/web-components"
}