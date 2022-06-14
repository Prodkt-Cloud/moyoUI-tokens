import { Header } from './Header';

export default {
  title: 'Learner Portal/Header',
  parameters: {
    backgrounds: { disable: true },
  },
};

const Template = (args) => Header(args);

export const LearnerPortal = Template.bind({});
LearnerPortal.args = {
  user: {},
};
