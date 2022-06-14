import { Buttons } from './Buttons';
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'All/Buttons',
  decorators: [withDesign],
  parameters: {
    backgrounds: { disable: true },
    layout: 'fullscreen',
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/lxjmMvpCQw5oBCvps0PJZO/%F0%9F%8E%89--%F0%9F%8E%89--MOYO-UI-%F0%9F%98%88-THE-FINAL--%F0%9F%8E%89--%F0%9F%8E%89?node-id=169%3A32902',
      },
  },
};

const Template = (args) => Buttons(args);

export const Button = Template.bind({});
Button.args = {
  // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition
  ...Button.args,
};