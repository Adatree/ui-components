import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FeedbackMessage } from '../../lib';
import { Check, AlertCircle } from 'mdi-material-ui';

const meta: Meta<typeof FeedbackMessage> = {
  title: 'Components/Atoms/Feedback Message',
  component: FeedbackMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeedbackMessage>;

const iconFontSize = '56px';

export const IconOnly: Story = {
  args: {
    icon: <Check sx={{ fontSize: iconFontSize, color: 'primary.main' }} />,
  },
};

export const MessageOnly: Story = {
  args: {
    message: 'Please wait while the component is loading...',
  },
};

export const MessageWithSpinner: Story = {
  args: {
    showSpinner: true,
    message: 'Please wait while the component is loading...',
  },
};

export const MessageWithIcon: Story = {
  args: {
    message: 'Congratulation the process was successful',
    icon: <Check sx={{ fontSize: iconFontSize, color: 'primary.main' }} />,
  },
};

export const MessageWithErrorIcon: Story = {
  args: {
    message: 'There was a problem',
    icon: <AlertCircle sx={{ fontSize: iconFontSize, color: 'error.main' }} />,
  },
};

export const MessageWithChildren: Story = {
  args: {
    message: 'Congratulation the process was successful',
    icon: <Check sx={{ fontSize: iconFontSize, color: 'primary.main' }} />,
    children: <p>This is some extra information to display.</p>,
  },
};
