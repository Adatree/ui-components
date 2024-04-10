import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SupportingParties, TestUtil } from '../../lib';

const meta: Meta<typeof SupportingParties> = {
  title: 'Components/Molecules/Supporting Parties',
  component: SupportingParties,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SupportingParties>;

export const Default: Story = {
  args: {
    title: 'Supporting parties',
    useCase: TestUtil.testData.useCase.homeLoan(),
    outsourcedServiceProviders: TestUtil.testData.outsourcedServiceProvider.all(),
  },
};
