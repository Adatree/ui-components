import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AlertInputFrom } from '../../lib';

export default {
  title: 'Components/Molecules/Alert Input From',
  component: AlertInputFrom,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AlertInputFrom>;

const Template: ComponentStory<typeof AlertInputFrom> = (args) => <AlertInputFrom {...args} />;

export const WithPrimaryButton = Template.bind({});
WithPrimaryButton.args = {
  alertSeverity: 'success',
  alertMessage: 'Enter some text and click the button to see it displayed in an alert box',
  inputErrorMessage: '',
  inputLabel: 'Enter some text',
  isLoading: false,
  primaryLabel: 'Click me',
  primaryOnClick: (value) => {
    alert(`You enter ${value}`);
  },
};

export const WithPrimaryAndSecondaryButton = Template.bind({});
WithPrimaryAndSecondaryButton.args = {
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
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  alertSeverity: 'success',
  alertMessage: 'Enter some text and click the button to see it displayed in an alert box',
  inputErrorMessage: '',
  inputLabel: 'Enter some text',
  isLoading: true,
  primaryLabel: 'Click me',
  primaryOnClick: (value) => {
    alert(`You enter ${value}`);
  },
};

export const WithNonFullWidth = Template.bind({});
WithNonFullWidth.args = {
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
};

export const WithInputError = Template.bind({});
WithInputError.args = {
  alertSeverity: 'success',
  alertMessage: 'Enter some text and click the button to see it displayed in an alert box',
  inputErrorMessage: 'Your input is invalid',
  inputLabel: 'Enter some text',
  isLoading: false,
  primaryLabel: 'Click me',
  primaryOnClick: (value) => {
    alert(`You enter ${value}`);
  },
};

export const WithSeverityError = Template.bind({});
WithSeverityError.args = {
  alertSeverity: 'error',
  alertMessage: 'This is an error message.',
  inputErrorMessage: '',
  inputLabel: 'Enter some text',
  isLoading: false,
  primaryLabel: 'Click me',
  primaryOnClick: (value) => {
    alert(`You enter ${value}`);
  },
};
