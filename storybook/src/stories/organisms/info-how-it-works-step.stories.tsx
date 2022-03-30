import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoHowItWorksStep } from '../../lib';

export default {
  title: 'Components/Organisms/Consent steps/How it works info step',
  component: InfoHowItWorksStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InfoHowItWorksStep>;

const Template: ComponentStory<typeof InfoHowItWorksStep> = (args) => <InfoHowItWorksStep {...args} />;

export const Default = Template.bind({});
Default.args = {
  dataSharingRevocationEmail: 'datasharing@adatree.com.au',
  cdrPolicyUrl: 'https://adatree.com.au/cdrpolicy'
};
