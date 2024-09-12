import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Confirmation } from '../../lib';
import { SharingDuration } from '@adatree/react-api-sdk';

const meta: Meta<typeof Confirmation> = {
  title: 'Components/Atoms/Confirmation',
  component: Confirmation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Confirmation>;

const companyName = 'TestCompany';

export const WithPeriod: Story = {
  args: {
    companyName: companyName,
    sharingDuration: SharingDuration.SixMonths,
    endDate: new Date(),
    onChange: (checked: boolean) => {
      alert(`Confirmation checkbox is ${checked === true ? 'checked' : 'unchecked'}`);
    },
  },
};
export const WithOnceOff: Story = {
  args: {
    companyName: companyName,
    sharingDuration: SharingDuration.OnceOff,
    endDate: new Date(),
    onChange: (checked: boolean) => {
      alert(`Confirmation checkbox is ${checked === true ? 'checked' : 'unchecked'}`);
    },
  },
};
export const WithCustom: Story = {
  args: {
    companyName: companyName,
    sharingDuration: SharingDuration.Custom,
    endDate: new Date(),
    onChange: (checked: boolean) => {
      alert(`Confirmation checkbox is ${checked === true ? 'checked' : 'unchecked'}`);
    },
  },
};
export const WithNoDates: Story = {
  args: {
    companyName: companyName,
    sharingDuration: undefined,
    endDate: undefined,
    onChange: (checked: boolean) => {
      alert(`Confirmation checkbox is ${checked === true ? 'checked' : 'unchecked'}`);
    },
  },
};
