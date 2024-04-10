import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GeneralInformation } from '../../lib';

const meta: Meta<typeof GeneralInformation> = {
  title: 'Components/Atoms/General Information',
  component: GeneralInformation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GeneralInformation>;

export const WithAllListItems: Story = {
  args: {},
};

export const WithoutDuplicateListItem: Story = {
  args: {
    hideDuplicateListItem: true,
  },
};
