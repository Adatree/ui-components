import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentList, TestUtil } from '../../lib';

const meta: Meta<typeof ConsentList> = {
  title: 'Components/Atoms/Consent List',
  component: ConsentList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConsentList>;

export const Active: Story = {
  args: {
    consents: TestUtil.testData.consent.all(),
    url: '/url-to-the-consent',
  },
};
