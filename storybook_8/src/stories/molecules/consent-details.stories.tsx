import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentDetails, TestUtil } from '../../lib';
import { StoryHelper } from '../helpers/story.helpers';

const meta: Meta<typeof ConsentDetails> = {
  title: 'Components/Molecules/Consent Details',
  component: ConsentDetails,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConsentDetails>;

export const WithAllDates: Story = {
  args: {
    consent: TestUtil.testData.consent.active(),
    dateTitle: 'Key dates',
    useCasetTitle: 'Data we are currently receiving',
    dataRecipients: TestUtil.testData.dataRecipient.all(),
    onRevokeClick: () => {
      alert('The revoke button has been clicked');
    },
  },
};

export const WithActiveStatusAndGrantee: Story = {
  args: {
    consent: TestUtil.testData.consent.activeWithGrantee(),
    dateTitle: 'Key dates',
    useCasetTitle: 'Data we are currently receiving',
    onRevokeClick: () => {
      alert('The revoke button has been clicked');
    },
  },
};

export const WithExpiredStatusAndGrantee: Story = {
  args: {
    consent: TestUtil.testData.consent.expiredWithGrantee(),
    dateTitle: 'Key dates',
    useCasetTitle: 'Data we are currently receiving',
    onRevokeClick: () => {
      alert('The revoke button has been clicked');
    },
  },
};

export const WithRequestedStatusAndGrantee: Story = {
  args: {
    consent: TestUtil.testData.consent.requestedWithGrantee(),
    dateTitle: 'Key dates',
    useCasetTitle: 'Data we are currently receiving',
    onRevokeClick: () => {
      alert('The revoke button has been clicked');
    },
  },
};

export const WithRevokedStatusAndGrantee: Story = {
  args: {
    consent: TestUtil.testData.consent.revokedWithGrantee(),
    dateTitle: 'Key dates',
    useCasetTitle: 'Data we are currently receiving',
    onRevokeClick: () => {
      alert('The revoke button has been clicked');
    },
  },
};

// ToDo JK to fix hardcoded StoryHelper.getDataRecipients
export const WithConsumerTypeOrganisation: Story = {
  args: {
    consent: TestUtil.testData.consent.activeWithConsumerTypeOrganisation(),
    dateTitle: 'Key dates',
    dataRecipients: StoryHelper.getDataRecipients('Accredited Data Recipient'),
    useCasetTitle: 'Data we are currently receiving',
    onRevokeClick: () => {
      alert('The revoke button has been clicked');
    },
  },
};
