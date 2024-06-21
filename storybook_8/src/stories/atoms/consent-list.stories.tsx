import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentList, TestUtil } from '../../lib';

const meta: Meta<typeof ConsentList> = {
  title: 'Components/Atoms/Consent List',
  component: ConsentList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConsentList>;

export const Active: Story = {
  args: {
    consents: TestUtil.testData.consent.all(),
    url: '/url-to-the-consent',
  },
};

export const WithPagination: Story = {
  args: {
    consents: TestUtil.testData.consent.all(),
    pagination: { page: 1, pageSize: 25, totalRecords: 52, totalPages: 3 },
    onPagination: (page: number) => alert(`Showing page ${page}`),
  },
};
