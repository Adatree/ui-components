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
  consent: TestUtil.testData.consent.active(),
  dateTitle: 'Key dates',
  useCasetTitle: 'Data we are currently receiving',
  dataRecipients: TestUtil.testData.dataRecipient.all(),
  onRevokeClick: () => {
    alert('The revoke button has been clicked');
  },
};

export const WithActiveStatusAndGrantee = Template.bind({});
WithActiveStatusAndGrantee.args = {
  consent: TestUtil.testData.consent.activeWithGrantee(),
  dateTitle: 'Key dates',
  useCasetTitle: 'Data we are currently receiving',
  onRevokeClick: () => {
    alert('The revoke button has been clicked');
  },
};

export const WithExpiredStatusAndGrantee = Template.bind({});
WithExpiredStatusAndGrantee.args = {
  consent: TestUtil.testData.consent.expiredWithGrantee(),
  dateTitle: 'Key dates',
  useCasetTitle: 'Data we are currently receiving',
  onRevokeClick: () => {
    alert('The revoke button has been clicked');
  },
};

export const WithRequestedStatusAndGrantee = Template.bind({});
WithRequestedStatusAndGrantee.args = {
  consent: TestUtil.testData.consent.requestedWithGrantee(),
  dateTitle: 'Key dates',
  useCasetTitle: 'Data we are currently receiving',
  onRevokeClick: () => {
    alert('The revoke button has been clicked');
  },
};

export const WithRevokedStatusAndGrantee = Template.bind({});
WithRevokedStatusAndGrantee.args = {
  consent: TestUtil.testData.consent.revokedWithGrantee(),
  dateTitle: 'Key dates',
  useCasetTitle: 'Data we are currently receiving',
  onRevokeClick: () => {
    alert('The revoke button has been clicked');
  },
};
