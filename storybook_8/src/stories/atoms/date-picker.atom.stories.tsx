import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '../../lib';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Atoms/Date Picker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const futureDate = new Date();
futureDate.setFullYear(futureDate.getFullYear() + 1);

export const CurrentDate: Story = {
  args: {
    label: 'Current date',
    date: new Date(),
    onChange: (date) => {
      alert(`The computed date is ${date.toISOString()}`);
    },
  },
};

export const SetDate: Story = {
  args: {
    label: 'Future date',
    date: futureDate,
    onChange: (date) => {
      alert(`The computed date is ${date.toISOString()}`);
    },
  },
};

export const AmericanFormat: Story = {
  args: {
    label: 'American format',
    date: new Date(),
    inputFormat: 'MM/dd/yyyy',
    onChange: (date) => {
      alert(`The computed date is ${date.toISOString()}`);
    },
  },
};

export const NoDate: Story = {
  args: {
    label: 'Pick a date',
    onChange: (date) => {
      alert(`The computed date is ${date.toISOString()}`);
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    date: new Date(),
    disabled: true,
    onChange: (date) => {
      alert(`The computed date is ${date.toISOString()}`);
    },
  },
};

export const Error: Story = {
  args: {
    label: 'Error date',
    date: new Date('2032-06-18T21:11:54'),
    onChange: (date) => {
      alert(`The computed date is ${date.toISOString()}`);
    },
  },
};
