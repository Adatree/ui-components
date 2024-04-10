import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateSummary, TestUtil } from '../../lib';

const meta: Meta<typeof DateSummary> = {
  title: 'Components/Molecules/Date Summary',
  component: DateSummary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateSummary>;

export const WithOnceOffFrequency: Story = {
  args: {
    title: 'Data we are currently receiving',
    consent: TestUtil.testData.consent.active(),
  },
};
export const WithOngoingFrequency: Story = {
  args: {
    title: 'Data we are currently receiving',
    consent: TestUtil.testData.consent.revoked(),
  },
};
