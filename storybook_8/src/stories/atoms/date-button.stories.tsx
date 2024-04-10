import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SharingDuration, DateButton } from '../../lib';

const meta: Meta<typeof DateButton> = {
  title: 'Components/Atoms/Date Button',
  component: DateButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateButton>;

const sharingDurations = [
  SharingDuration.OnceOff,
  SharingDuration.OneDay,
  SharingDuration.OneWeek,
  SharingDuration.OneMonth,
  SharingDuration.SixMonths,
  SharingDuration.OneYear,
];

export const WithValueUnselected: Story = {
  args: {
    sharingDurations: sharingDurations,
    onClick: (date) => {
      alert(`The computed date is ${date.toISOString()}`);
    },
  },
};

export const WithValueSelected: Story = {
  args: {
    sharingDurations: sharingDurations,
    selectedSharingDuration: SharingDuration.OneMonth,
    onClick: (date) => {
      alert(`The computed date is ${date.toISOString()}`);
    },
  },
};

export const Disabled: Story = {
  args: {
    sharingDurations: sharingDurations,
    disabled: true,
    onClick: (date) => {
      alert(`The computed date is ${date.toISOString()}`);
    },
  },
};
