import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataHandlingInfo, TestUtil } from '../../lib';

const meta: Meta<typeof DataHandlingInfo> = {
  title: 'Components/Atoms/Data Handling Info',
  component: DataHandlingInfo,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataHandlingInfo>;

export const WithOneDataHandler: Story = {
  args: {
    dataHandlers: [TestUtil.testData.dataRecipient.accreditedDataRecipient()],
  },
};

export const WithManyDataHandler: Story = {
  args: {
    dataHandlers: TestUtil.testData.dataRecipient.all(),
  },
};
