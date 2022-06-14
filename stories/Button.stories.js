import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  backgrounds: { disable: true },
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'warning', 'tertiary', 'ghost', 'layer'],
    },
    iconStyle: {
      control: { type: 'select' },
      table: { category: 'Icon Style' },
      defaultValue: 'fa-solid',
      options: ['fa-solid', 'fa-regular', 'fa-light', 'fa-thin', 'fa-duotone'],
    },
    btnIcon: {
      control: { type: 'select' },
      table: { category: 'Icon Left' },
      defaultValue: 'dice-d20',
      options: ['dice-d20', 'cards', 'text', 'warning', 'ghost', 'campfire'],
    },
    // onClick: { action: 'onClick' },
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

export const Warning = Template.bind({});
Warning.args = {
  label: 'Button',
  variant: 'warning',
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