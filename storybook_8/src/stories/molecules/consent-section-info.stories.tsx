import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentSectionInfo, TestUtil } from '../../lib';

const meta: Meta<typeof ConsentSectionInfo> = {
  title: 'Components/Molecules/Consent Section Info',
  component: ConsentSectionInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConsentSectionInfo>;

export const WithNoDataHandler: Story = {
  args: {
    useCase: TestUtil.testData.useCase.homeLoan(),
  },
};

export const WithOneDataHandler: Story = {
  args: {
    useCase: TestUtil.testData.useCase.homeLoan(),
    dataHandlers: [TestUtil.testData.dataRecipient.accreditedDataRecipient()],
  },
};

export const WithManyDataHandler: Story = {
  args: {
    useCase: TestUtil.testData.useCase.homeLoan(),
    dataHandlers: TestUtil.testData.dataRecipient.all(),
  },
};
