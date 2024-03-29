import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentCancelButton } from '../../lib';

export default {
  title: 'Components/Atoms/Consent Cancel Button',
  component: ConsentCancelButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentCancelButton>;

const Template: ComponentStory<typeof ConsentCancelButton> = (args) => <ConsentCancelButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'cancel',
  dialogText: 'Are you sure you want to cancel this consent?',
  onCancel: () => {
    alert('Consent cancelled');
  },
};
