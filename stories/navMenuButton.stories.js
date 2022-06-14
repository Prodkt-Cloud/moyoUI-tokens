import { navMenuButton } from './navMenuButton';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: 'Components/Navigation Button',
  parameters: {
    backgrounds: { disable: true },
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'layer'],
    },
    iconStyle: {
      control: { type: 'select' },
      table: { category: 'Icon' },
      defaultValue: 'fa-solid',
      options: ['fa-solid', 'fa-regular', 'fa-light', 'fa-thin', 'fa-duotone'],
    },
    btnIcon: {
      control: { type: 'select' },
      table: { category: 'Icon' },
      defaultValue: 'dice-d20',
      options: ['dice-d20', 'cards', 'text', 'warning', 'ghost', 'campfire'],
    },
    // onClick: { action: 'onClick' },
  },
};

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args
const Template = (args) => navMenuButton(args);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Primary.args = {
  label: 'Button',
  variant: 'primary',
};

export const Secondary = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Secondary.args = {
  label: 'Button',
  variant: 'secondary',
};

export const Layer = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Layer.args = {
  label: 'Button',
  variant: 'layer',
};

