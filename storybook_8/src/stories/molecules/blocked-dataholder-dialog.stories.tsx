import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BlockedDataholderDialog, TestUtil } from '../../lib';

const meta: Meta<typeof BlockedDataholderDialog> = {
  title: 'Components/Molecules/Blocked Data holder Dialog',
  component: BlockedDataholderDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlockedDataholderDialog>;

export const WithAllDates: Story = {
  args: {
    dataHolder: TestUtil.testData.dataHolder.redBank(),
    isOpen: true,
    onClose: () => {
      alert('The close button has been clicked');
    },
  },
};
