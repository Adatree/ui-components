import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NewFeature } from '../../lib';

const meta: Meta<typeof NewFeature> = {
  title: 'Components/Atoms/New Feature',
  component: NewFeature,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NewFeature>;

export const WithDefaultTitle: Story = {
  args: {
    open: true,
    children: <button>New feature</button>,
    placement: 'right',
    onClose: () => {
      alert('onClosed fired');
    },
  },
};

export const WithCustomTitle: Story = {
  args: {
    title: 'Look at this new feature',
    open: true,
    children: <button>New feature</button>,
    placement: 'right',
    onClose: () => {
      alert('onClosed fired');
    },
  },
};

export const WithDescription: Story = {
  args: {
    description: 'The is a description about the new feature',
    open: true,
    children: <button>New feature</button>,
    placement: 'right',
    onClose: () => {
      alert('onClosed fired');
    },
  },
};

export const Visible: Story = {
  args: {
    title: 'Look at this new feature',
    open: true,
    children: <button>New feature</button>,
    placement: 'right',
    onClose: () => {
      alert('onClosed fired');
    },
  },
};

export const Hidden: Story = {
  args: {
    title: 'This should not be shown',
    open: false,
    children: <button>New feature</button>,
    placement: 'right',
    onClose: () => {
      alert('onClosed fired');
    },
  },
};
