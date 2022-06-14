import { Header } from './Header';

export default {
  title: 'Learner Portal/Header',
};

const Template = (args) => Header(args);

export const LearnerPortal = Template.bind({});
LearnerPortal.args = {
  user: {},
};
