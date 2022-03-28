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
  content: (
    <>
      <p>This Tooltip uses the Info Icon</p>
    </>
  ),
};

export const WithCustomTitle = Template.bind({});
WithCustomTitle.args = {
  content: (
    <>
      <p>This Tooltip uses the a custom title</p>
    </>
  ),
  title: <span>This is a custom tooltip title</span>,
};
