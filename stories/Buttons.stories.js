import { Buttons } from './Buttons';
import * as ButtonStories from './Button.stories';
import * as HeaderStories from './Header.stories';

export default {
  title: 'All/Buttons',
  parameters: {
    backgrounds: { disable: true },
    layout: 'padded',
  },
};

const Template = (args) => Buttons(args);

export const Button = Template.bind({});
Button.args = {
  // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition
  ...Button.args,
};