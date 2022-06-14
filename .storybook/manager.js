import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import yourTheme from './YourTheme';
import '/build/css/daylight/tokens.css';

addons.setConfig({
  theme: yourTheme,
});