import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentFormProvider, DateSelector } from '../../lib';
import { SharingDuration } from '@adatree/react-api-sdk';

const meta: Meta<typeof DateSelector> = {
  title: 'Components/Molecules/Date Selector',
  component: DateSelector,
  decorators: [
    (Story) => (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateSelector>;

const companyName = 'TestCompany';

export const WithOnceOffDuration: Story = {
  args: {
    companyName: companyName,
    sharingDurations: [SharingDuration.OnceOff],
  },
};

export const WithOneWeekDuration: Story = {
  args: {
    companyName: companyName,
    sharingDurations: [SharingDuration.OneWeek],
  },
};

export const WithTwoWeeksDuration: Story = {
  args: {
    companyName: companyName,
    sharingDurations: [SharingDuration.TwoWeeks],
  },
};

export const WithOneDurationAndShowOptionsTrue: Story = {
  args: {
    companyName: companyName,
    sharingDurations: [SharingDuration.TwoWeeks],
    showSharingDurationsOptions: true,
  },
};

export const WithCustomDuration: Story = {
  args: {
    companyName: companyName,
    sharingDurations: [SharingDuration.Custom],
  },
};

export const WithManyDurations: Story = {
  args: {
    companyName: companyName,
    sharingDurations: [
      SharingDuration.OneDay,
      SharingDuration.OneWeek,
      SharingDuration.OneMonth,
      SharingDuration.OneYear,
    ],
  },
};

export const WithManyDurationsAndCustom: Story = {
  args: {
    companyName: companyName,
    sharingDurations: [
      SharingDuration.OnceOff,
      SharingDuration.OneDay,
      SharingDuration.TwoWeeks,
      SharingDuration.ThreeMonths,
      SharingDuration.Custom,
    ],
  },
};
