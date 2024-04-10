import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AlertInputFrom } from '../../lib';

const meta: Meta<typeof AlertInputFrom> = {
  title: 'Components/Molecules/Alert Input From',
  component: AlertInputFrom,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlertInputFrom>;

export const WithPrimaryButton: Story = {
  args: {
    alertSeverity: 'success',
    alertMessage: 'Enter some text and click the button to see it displayed in an alert box',
    inputErrorMessage: '',
    inputLabel: 'Enter some text',
    isLoading: false,
    primaryLabel: 'Click me',
    primaryOnClick: (value) => {
      alert(`You enter ${value}`);
    },
  },
};

export const WithPrimaryAndSecondaryButton: Story = {
  args: {
    alertSeverity: 'success',
    alertMessage: 'Enter some text and click the button to see it displayed in an alert box',
    inputErrorMessage: '',
    inputLabel: 'Enter some text',
    isLoading: false,
    primaryLabel: 'Primary action',
    primaryOnClick: (value) => {
      alert(`You enter ${value}`);
    },
    secondaryLabel: 'Secondary action',
    secondaryMessage: 'This is the Secondary message',
    secondaryOnClick: () => {
      alert('You clicked the secondary button');
    },
  },
};

export const WithLoading: Story = {
  args: {
    alertSeverity: 'success',
    alertMessage: 'Enter some text and click the button to see it displayed in an alert box',
    inputErrorMessage: '',
    inputLabel: 'Enter some text',
    isLoading: true,
    primaryLabel: 'Click me',
    primaryOnClick: (value) => {
      alert(`You enter ${value}`);
    },
  },
};

export const WithNonFullWidth: Story = {
  args: {
    alertSeverity: 'success',
    alertMessage: 'Enter some text and click the button to see it displayed in an alert box',
    inputErrorMessage: '',
    inputLabel: 'Enter some text',
    isLoading: false,
    primaryLabel: 'Click me',
    primaryOnClick: (value) => {
      alert(`You enter ${value}`);
    },
    fullWidth: false,
  },
};
export const WithInputError: Story = {
  args: {
    alertSeverity: 'success',
    alertMessage: 'Enter some text and click the button to see it displayed in an alert box',
    inputErrorMessage: 'Your input is invalid',
    inputLabel: 'Enter some text',
    isLoading: false,
    primaryLabel: 'Click me',
    primaryOnClick: (value) => {
      alert(`You enter ${value}`);
    },
  },
};

export const WithSeverityError: Story = {
  args: {
    alertSeverity: 'error',
    alertMessage: 'This is an error message.',
    inputErrorMessage: '',
    inputLabel: 'Enter some text',
    isLoading: false,
    primaryLabel: 'Click me',
    primaryOnClick: (value) => {
      alert(`You enter ${value}`);
    },
  },
};
