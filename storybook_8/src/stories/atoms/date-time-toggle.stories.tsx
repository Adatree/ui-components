import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stack, Typography } from '@mui/material';
import { DateTimePreferenceProvider, DateTimePreferenceToggle, DateTimeDisplay } from '../../lib';

const meta: Meta<typeof DateTimePreferenceToggle> = {
  title: 'Date Time/DateTimePreferenceToggle',
  component: DateTimePreferenceToggle,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'small',
    showLabel: true,
  },
};
export default meta;

type Story = StoryObj<typeof DateTimePreferenceToggle>;

const WithProvider: React.FC<{
  children: React.ReactNode;
  defaultPreference?: 'local' | 'utc';
}> = ({ children, defaultPreference = 'local' }) => (
  <DateTimePreferenceProvider
    defaultPreference={defaultPreference}
    // avoid polluting localStorage while developing stories
    persist={false}
  >
    {children}
  </DateTimePreferenceProvider>
);

export const Default: Story = {
  render: (args) => (
    <WithProvider defaultPreference="local">
      <Stack spacing={2} alignItems="flex-start">
        <DateTimePreferenceToggle {...args} />
        <Stack spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            Preview
          </Typography>
          <DateTimeDisplay value={new Date('2026-02-04T13:34:56Z')} showTzLabel={true} />
        </Stack>
      </Stack>
    </WithProvider>
  ),
};

export const DefaultUtc: Story = {
  render: (args) => (
    <WithProvider defaultPreference="utc">
      <Stack spacing={2} alignItems="flex-start">
        <DateTimePreferenceToggle {...args} />
        <Stack spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            Preview
          </Typography>
          <DateTimeDisplay value={new Date('2026-02-04T13:34:56Z')} showTzLabel={true} />
        </Stack>
      </Stack>
    </WithProvider>
  ),
};

export const NoLabel: Story = {
  args: { showLabel: false },
  render: (args) => (
    <WithProvider defaultPreference="local">
      <Stack spacing={2} alignItems="flex-start">
        <DateTimePreferenceToggle {...args} />
        <DateTimeDisplay value={new Date('2026-02-04T13:34:56Z')} showTzLabel={true} />
      </Stack>
    </WithProvider>
  ),
};

export const Large: Story = {
  args: { size: 'large' },
  render: (args) => (
    <WithProvider defaultPreference="local">
      <Stack spacing={2} alignItems="flex-start">
        <DateTimePreferenceToggle {...args} />
        <DateTimeDisplay value={new Date('2026-02-04T13:34:56Z')} showTzLabel={true} />
      </Stack>
    </WithProvider>
  ),
};
