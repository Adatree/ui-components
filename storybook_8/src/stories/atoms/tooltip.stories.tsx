import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../../lib';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const WithInfoIconTitle: Story = {
  args: {
    content: 'This Tooltip uses the Info Icon',
  },
};

export const WithCustomContent: Story = {
  args: {
    content: <h1>This Tooltip content is a H1</h1>,
  },
};

export const WithCustomTitle: Story = {
  args: {
    content: 'This Tooltip uses the a custom title',
    title: <span>This is a custom tooltip title</span>,
  },
};
