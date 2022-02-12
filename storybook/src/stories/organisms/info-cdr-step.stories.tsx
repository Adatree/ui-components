import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoCdrStep } from '../../lib';

export default {
  title: 'Components/Organisms/Consent steps/CDR info step',
  component: InfoCdrStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InfoCdrStep>;

const Template: ComponentStory<typeof InfoCdrStep> = (args) => <InfoCdrStep {...args} />;

export const Default = Template.bind({});
Default.args = {
  companyName: 'Adatree',
  accreditationNumber: '1234567890',
};
