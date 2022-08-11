import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentCancelButton } from '../../lib';

export default {
  title: 'Components/Atoms/Cancel Consent Button',
  component: ConsentCancelButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentCancelButton>;

const Template: ComponentStory<typeof ConsentCancelButton> = (args) => <ConsentCancelButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  dialogText: 'Are you sure you want to cancel this consent?',
  onCancel: () => {
    alert('Consent cancelled');
  },
};
