import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UseCaseSelector, TestUtil } from '../../lib';

const meta: Meta<typeof UseCaseSelector> = {
  title: 'Components/Molecules/Use Case Selector',
  component: UseCaseSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UseCaseSelector>;

const useCases = TestUtil.testData.useCase.all();

export const WithUseCases: Story = {
  args: {
    useCases: useCases,
    onChange: (useCaseId: string) => {
      alert(`The radio button with the value ${useCaseId} is selected.`);
    },
  },
};
