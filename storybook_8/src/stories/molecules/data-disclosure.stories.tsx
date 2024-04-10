import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataDisclosure, TestUtil } from '../../lib';

const meta: Meta<typeof DataDisclosure> = {
  title: 'Components/Molecules/Data Disclosure',
  component: DataDisclosure,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataDisclosure>;

export const Default: Story = {
  args: {
    dataRecipients: TestUtil.testData.dataRecipient.all(),
  },
};
