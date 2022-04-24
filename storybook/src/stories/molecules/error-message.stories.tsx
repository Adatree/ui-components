import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ErrorMessage } from '../../lib';

export default {
  title: 'Components/Molecules/Error Message',
  component: ErrorMessage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (args) => <ErrorMessage {...args} />;

export const ApiError = Template.bind({});
ApiError.args = {
  code: '503',
  data: {
    request: 'GET',
    response: {
      status: 503,
      message: 'Server encountered an error',
    },
  },
  message: 'Server encountered an error.',
  timeStamp: new Date(),
  type: 'API',
  url: 'api.adatree.com.au/information',
};

export const GenericError = Template.bind({});
GenericError.args = {
  code: 'ERR_001',
  message: 'This is a generic error.',
};
