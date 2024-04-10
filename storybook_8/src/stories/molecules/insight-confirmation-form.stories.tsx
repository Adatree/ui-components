import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InsightConfirmationForm, TestUtil } from '../../lib';

const meta: Meta<typeof InsightConfirmationForm> = {
  title: 'Components/Molecules/Insight Confirmation Form',
  component: InsightConfirmationForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InsightConfirmationForm>;

export const WithOneInsight: Story = {
  args: {
    insightResponse: TestUtil.testData.insights.single(),
    dataHolderName: 'Red Australian Bank',
    onChange: (confirmation) => {
      alert(`User has click the confirmation checkbox with the value: ${confirmation}`);
    },
  },
};
export const WithManyInsights: Story = {
  args: {
    insightResponse: TestUtil.testData.insights.all(),
    dataHolderName: 'Red Australian Bank',
    onChange: (confirmation) => {
      alert(`User has click the confirmation checkbox with the value: ${confirmation}`);
    },
  },
};
