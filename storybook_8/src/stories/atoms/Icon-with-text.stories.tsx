import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconWithText } from '../../lib';

const meta: Meta<typeof IconWithText> = {
  title: 'Components/Atoms/Icon with text',
  component: IconWithText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconWithText>;

export const Icon: Story = {
  args: {
    icon: 'CheckboxMultipleMarked',
  },
};

export const IconAndTitle: Story = {
  args: {
    icon: 'CloudLock',
    title: 'This is the title',
  },
};

export const IconTitleAndText: Story = {
  args: {
    icon: 'BankCheck',
    title: 'This is the title',
    text: 'This is the some text that relates to the this Icon with Text component.',
  },
};
