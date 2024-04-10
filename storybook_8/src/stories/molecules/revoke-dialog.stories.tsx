import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RevokeDialog, TestUtil } from '../../lib';

const meta: Meta<typeof RevokeDialog> = {
  title: 'Components/Molecules/Revoke Dialog',
  component: RevokeDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RevokeDialog>;

export const Open: Story = {
  args: {
    dataHolderName: TestUtil.testData.dataHolder.yellowBank().brandName,
    isOpen: true,
    isLoading: false,
    onCancelClick: () => {
      alert('The cancel button has been clicked');
    },
    onRevokeClick: () => {
      alert('The revoke button has been clicked');
    },
  },
};
export const Loading: Story = {
  args: {
    dataHolderName: TestUtil.testData.dataHolder.yellowBank().brandName,
    isOpen: true,
    isLoading: true,
    onCancelClick: () => {
      alert('The cancel button has been clicked');
    },
    onRevokeClick: () => {
      alert('The revoke button has been clicked');
    },
  },
};
