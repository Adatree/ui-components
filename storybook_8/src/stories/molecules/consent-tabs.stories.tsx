import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentTabs, TestUtil } from '../../lib';

const meta: Meta<typeof ConsentTabs> = {
  title: 'Components/Molecules/Consent Tabs',
  component: ConsentTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const allConsents = TestUtil.testData.consentV2.all();
const activeConsents = allConsents.filter((consent) => consent.status === 'ACTIVE');
const expiredConsents = allConsents.filter((consent) => consent.status === 'EXPIRED');
const revokedConsents = allConsents.filter((consent) => consent.status === 'REVOKED');

type Story = StoryObj<typeof ConsentTabs>;

export const WithConsents: Story = {
  args: {
    activeConsents: activeConsents,
    expiredConsents: expiredConsents,
    revokedConsents: revokedConsents,
  },
};

export const WithPagination: Story = {
  args: {
    activeConsents: activeConsents,
    expiredConsents: expiredConsents,
    revokedConsents: revokedConsents,
    pagination: { page: 1, pageSize: 25, totalPages: 3, totalRecords: 53 },
  },
};

export const WithNoConsents: Story = {
  args: {},
};

export const WithNoConsentsAndNavigation: Story = {
  args: {
    onNavigation: () => {
      alert('Button clicked');
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
