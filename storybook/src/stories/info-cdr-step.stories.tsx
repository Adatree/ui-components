import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoCdrStep } from '../lib';

export default {
  title: 'Consent/Steps',
  component: InfoCdrStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InfoCdrStep>;

const Template: ComponentStory<typeof InfoCdrStep> = (args) => <InfoCdrStep {...args} />;

export const InfoCDR = Template.bind({});
InfoCDR.args = {
  companyName: 'My Great Company',
  accreditationNumber: '1234567890',
};
