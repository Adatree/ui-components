import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RadioButtonWithText } from '../../lib';

export default {
  title: 'Components/Atoms/Radio button with text',
  component: RadioButtonWithText,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RadioButtonWithText>;

const data = [
  { value: 'f', label: 'Female' },
  { value: 'm', label: 'Male' },
  { value: 'o', label: 'Other' },
  { value: 'd', label: 'Disabled', disable: true },
];

const dataWithDescription = [
  { value: 'f', label: 'Female', description: 'This is the female option' },
  { value: 'm', label: 'Male', description: 'This is an male option' },
  { value: 'o', label: 'Other', description: 'This is other option' },
];

const Template: ComponentStory<typeof RadioButtonWithText> = (args) => <RadioButtonWithText {...args} />;

export const DefaultButtons = Template.bind({});
DefaultButtons.args = {
  radioButtonItems: data,
  onChange: (value) => {
    alert(`The radio button with the value ${value} is selected`);
  },
};

export const ButtonsWithValueSet = Template.bind({});
ButtonsWithValueSet.args = {
  radioButtonItems: data,
  defaultValue: data[1].value,
  onChange: (value) => {
    alert(`The radio button with the value ${value} is selected`);
  },
};

export const ButtonsWithLabel = Template.bind({});
ButtonsWithLabel.args = {
  label: 'Gender',
  radioButtonItems: data,
  onChange: (value) => {
    alert(`The radio button with the value ${value} is selected`);
  },
};

export const ButtonsWithDescription = Template.bind({});
ButtonsWithDescription.args = {
  label: 'Gender',
  radioButtonItems: dataWithDescription,
  onChange: (value) => {
    alert(`The radio button with the value ${value} is selected`);
  },
};
