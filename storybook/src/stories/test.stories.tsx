import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Test } from '../lib';

export default {
  title: 'Example/Test',
  component: Test,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Test>;

const Template: ComponentStory<typeof Test> = (args) => <Test {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'This is some sample text',
};
