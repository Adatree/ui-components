import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentDetails, TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Consent Details',
  component: ConsentDetails,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentDetails>;

const Template: ComponentStory<typeof ConsentDetails> = (args) => <ConsentDetails {...args} />;

export const WithAllDates = Template.bind({});
WithAllDates.args = {
  consent: TestUtil.getTestDataConsentResponse(),
  dateTitle: 'Key dates',
  useCasetTitle: 'Data we are currently receiving',
  onRevokeClick: () => {
    alert('The revoke button has been clicked');
  },
};
