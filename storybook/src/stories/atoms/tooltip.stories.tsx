import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tooltip } from '../../lib';

export default {
  title: 'Components/Atoms/Tooltip',
  component: Tooltip,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const WithInfoIconTitle = Template.bind({});
WithInfoIconTitle.args = {
  content: 'This Tooltip uses the Info Icon',
};

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  content: <h1>This Tooltip content is a H1</h1>,
};

export const WithCustomTitle = Template.bind({});
WithCustomTitle.args = {
  content: 'This Tooltip uses the a custom title',
  title: <span>This is a custom tooltip title</span>,
};
