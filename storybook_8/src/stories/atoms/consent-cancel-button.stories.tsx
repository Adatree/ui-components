import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentCancelButton } from '../../lib';

const meta: Meta<typeof ConsentCancelButton> = {
  title: 'Components/Atoms/Consent Cancel Button',
  component: ConsentCancelButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConsentCancelButton>;

export const Default: Story = {
  args: {
    label: 'cancel',
    dialogText: 'Are you sure you want to cancel this consent?',
    onCancel: () => {
      alert('Consent cancelled');
    },
  },
};
