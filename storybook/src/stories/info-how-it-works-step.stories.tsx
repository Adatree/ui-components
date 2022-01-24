import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoHowItWorksStep } from '../lib';

export default {
  title: 'Consent/Steps/Info How It Works',
  component: InfoHowItWorksStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InfoHowItWorksStep>;

const Template: ComponentStory<typeof InfoHowItWorksStep> = () => <InfoHowItWorksStep />;

export const InfoHowItWorks = Template.bind({});
