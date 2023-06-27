import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SwitchDialog } from '../../lib';

export default {
  title: 'Components/Atoms/Switch Dialog',
  component: SwitchDialog,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SwitchDialog>;

const Template: ComponentStory<typeof SwitchDialog> = (args) => <SwitchDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  switchTitle: <>Switch title</>,
  dialogTitle: 'Dialog title',
  children: <>Some Dialog Content</>,
  onCheck: (value) => {
    alert(`Switch has been checked with value ${value}`);
  },
};
