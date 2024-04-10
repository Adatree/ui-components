import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InsightList, TestUtil } from '../../lib';

const meta: Meta<typeof InsightList> = {
  title: 'Components/Atoms/Insight List',
  component: InsightList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InsightList>;

export const WithOneInsight: Story = {
  args: {
    insightResponse: TestUtil.testData.insights.single(),
    dataHolderName: 'Red Australian Bank',
  },
};

export const WithManyInsights: Story = {
  args: {
    insightResponse: TestUtil.testData.insights.all(),
    dataHolderName: 'Red Australian Bank',
  },
};
