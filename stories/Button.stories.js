import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
    onClick: { action: 'onClick' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'tertiary', 'ghost', 'layer'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args
const Template = (args) => Button(args);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Primary.args = {
  label: 'Button',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  variant: 'secondary',
};

export const Danger = Template.bind({});
Danger.args = {
  label: 'Button',
  variant: 'danger',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  label: 'Button',
  variant: 'tertiary',
};

export const Ghost = Template.bind({});
Ghost.args = {
  label: 'Button',
  variant: 'ghost',
};

export const Layer = Template.bind({});
Layer.args = {
  label: 'Button',
  variant: 'layer',
};

