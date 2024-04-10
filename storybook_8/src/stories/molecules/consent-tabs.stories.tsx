import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentTabs, TestUtil } from '../../lib';

const meta: Meta<typeof ConsentTabs> = {
  title: 'Components/Molecules/Consent Tabs',
  component: ConsentTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConsentTabs>;

export const WithConsentItems: Story = {
  args: {
    consents: TestUtil.testData.consent.all(),
  },
};

export const WithNoConsentItems: Story = {
  args: {
    consents: undefined,
  },
};

export const Loading: Story = {
  args: {
    consents: [],
    isLoading: true,
  },
};
