import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../../lib';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Atoms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  args: {
    title: 'This is the title',
    content: <p>This is the Accordion content</p>,
  },
};
