import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataHolderHeader, TestUtil } from '../../lib';

const meta: Meta<typeof DataHolderHeader> = {
  title: 'Components/Molecules/Data Holder Header',
  component: DataHolderHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataHolderHeader>;

export const WithActiveStatus: Story = {
  args: {
    consent: TestUtil.testData.consent.active(),
    onRevokeClick: () => {
      alert(`The revoke button was clicked`);
    },
  },
};

export const WithActiveStatusAndGrantee: Story = {
  args: {
    consent: TestUtil.testData.consent.activeWithGrantee(),
    onRevokeClick: () => {
      alert(`The revoke button was clicked`);
    },
  },
};

export const WithActiveStatusAndEditAction: Story = {
  args: {
    consent: TestUtil.testData.consent.active(),
    editUrl: '/?path=/story/components-molecules-data-holder-header--with-active-status-and-edit-action',
    onRevokeClick: () => {
      alert(`The revoke button was clicked`);
    },
  },
};

export const WithExpiredStatus: Story = {
  args: {
    consent: TestUtil.testData.consent.expired(),
  },
};

export const WithRequestedStatus: Story = {
  args: {
    consent: TestUtil.testData.consent.requested(),
  },
};

export const WithRevokedStatus: Story = {
  args: {
    consent: TestUtil.testData.consent.revoked(),
  },
};
