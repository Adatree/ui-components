import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconWithText } from '../../lib';

export default {
  title: 'Atomic Components/Atoms/Icon with text',
  component: IconWithText,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof IconWithText>;

const Template: ComponentStory<typeof IconWithText> = (args) => <IconWithText {...args} />;

export const Icon = Template.bind({});
Icon.args = {
  icon: 'CheckboxMultipleMarked',
};

export const IconAndTitle = Template.bind({});
IconAndTitle.args = {
  icon: 'CloudLock',
  title: 'This is the title',
};

export const IconTitleAndText = Template.bind({});
IconTitleAndText.args = {
  icon: 'BankCheck',
  title: 'This is the title',
  text: 'This is the some text that relates to the this Icon with Text component.',
};
