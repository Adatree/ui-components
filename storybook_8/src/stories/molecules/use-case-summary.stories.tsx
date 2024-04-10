import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UseCaseSummary, TestUtil } from '../../lib';

const meta: Meta<typeof UseCaseSummary> = {
  title: 'Components/Molecules/Use Case Summary',
  component: UseCaseSummary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UseCaseSummary>;

export const HomeUseCase: Story = {
  args: {
    title: 'Data we are currently receiving',
    useCase: TestUtil.testData.useCase.homeLoan(),
  },
};
export const OpenEnergyUseCase: Story = {
  args: {
    title: 'Data we are currently receiving',
    useCase: TestUtil.testData.useCase.openEnergy(),
  },
};
export const OnceOffUseCase: Story = {
  args: {
    title: 'Data we are currently receiving',
    useCase: TestUtil.testData.useCase.onceOffConsentMinScopes(),
  },
};
export const OngoingUseCase: Story = {
  args: {
    title: 'Data we are currently receiving',
    useCase: TestUtil.testData.useCase.ongoingConsentMinScopes(),
  },
};
