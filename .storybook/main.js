module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@etchteam/storybook-addon-css-variables-theme",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/web-components"
}