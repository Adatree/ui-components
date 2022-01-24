import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentStepperDesktop, InfoCdrStep, InfoHowItWorksStep } from '../lib';

export default {
  title: 'Consent/Stepper',
  component: ConsentStepperDesktop,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentStepperDesktop>;

const Template: ComponentStory<typeof ConsentStepperDesktop> = (args) => <ConsentStepperDesktop {...args} />;

export const Desktop = Template.bind({});
Desktop.args = {
  steps: [
    {
      label: 'CDR',
      content: <InfoCdrStep companyName="My comoany" accreditationNumber="1234567890" />,
      onPrevious: () => {
        return '';
      },
      onNext: () => {
        return '';
      },
    },
    {
      label: 'How it works',
      content: <InfoHowItWorksStep />,
      onPrevious: () => {
        return '';
      },
      onNext: () => {
        return '';
      },
    },
    {
      label: 'Summary',
      content: <>This is Step 3's content.</>,
      nextButtonLabel: 'Consent',
      onPrevious: () => {
        return '';
      },
      onNext: () => {
        alert('Consent sent');
        return '';
      },
    },
  ],
};
