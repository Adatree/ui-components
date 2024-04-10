import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MaxAccountConnectedMessage, TestUtil } from '../../lib';

const meta: Meta<typeof MaxAccountConnectedMessage> = {
  title: 'Components/Atoms/Max Account Message',
  component: MaxAccountConnectedMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MaxAccountConnectedMessage>;

export const Default: Story = {
  args: {
    useCase: TestUtil.testData.useCase.homeLoan(),
    onClick: () => {
      alert('onClick fired');
    },
  },
};

export const WithoutBackButton: Story = {
  args: {
    useCase: TestUtil.testData.useCase.homeLoan(),
    hideBackButton: true,
    onClick: () => {
      alert('onClick fired');
    },
  },
};
