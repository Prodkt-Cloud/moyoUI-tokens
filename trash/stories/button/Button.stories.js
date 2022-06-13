import { Meta, Story, Canvas } from '@storybook/addon-docs';
import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: 'MOYO UI/Buttons',
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
    onClick: { action: 'onClick' },
    variant: {
      options: ['primary', 'secondary', 'danger', 'tertiary', 'ghost', 'layer'],
      control: { type: 'inline-radio' },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args
const Template = (args) => DevTest(args);

export const DevTest = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
DevTest.args = {
  text: 'Button',
};