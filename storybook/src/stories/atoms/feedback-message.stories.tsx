import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FeedbackMessage } from '../../lib';
import { Typography } from '@mui/material';
import { Check, AlertCircle } from 'mdi-material-ui';

export default {
  title: 'Components/Atoms/Feedback Message',
  component: FeedbackMessage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FeedbackMessage>;

const Template: ComponentStory<typeof FeedbackMessage> = (args) => <FeedbackMessage {...args} />;

const iconFontSize = '56px';

export const IconOnly = Template.bind({});
IconOnly.args = {
  icon: <Check sx={{ fontSize: iconFontSize, color: 'primary.main' }} />,
};

export const MessageOnly = Template.bind({});
MessageOnly.args = {
  message: 'Please wait while the component is loading...',
};

export const MessageWithSpinner = Template.bind({});
MessageWithSpinner.args = {
  showSpinner: true,
  message: 'Please wait while the component is loading...',
};

export const MessageWithIcon = Template.bind({});
MessageWithIcon.args = {
  message: 'Congratulation the process was successful',
  icon: <Check sx={{ fontSize: iconFontSize, color: 'primary.main' }} />,
};

export const MessageWithErrorIcon = Template.bind({});
MessageWithErrorIcon.args = {
  message: 'There was a problem',
  icon: <AlertCircle sx={{ fontSize: iconFontSize, color: 'error.main' }} />,
};

export const MessageWithChildren = Template.bind({});
MessageWithChildren.args = {
  message: 'Congratulation the process was successful',
  icon: <Check sx={{ fontSize: iconFontSize, color: 'primary.main' }} />,
  children: <Typography>This is some extra information to display.</Typography>,
};
