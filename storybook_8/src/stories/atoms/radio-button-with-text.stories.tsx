import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioButtonWithText } from '../../lib';

const meta: Meta<typeof RadioButtonWithText> = {
  title: 'Components/Atoms/Radio Button with Text',
  component: RadioButtonWithText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioButtonWithText>;

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

export const DefaultButtons: Story = {
  args: {
    radioButtonItems: data,
    onChange: (value) => {
      alert(`The radio button with the value ${value} is selected`);
    },
  },
};

export const ButtonsWithValueSet: Story = {
  args: {
    radioButtonItems: data,
    defaultValue: data[1].value,
    onChange: (value) => {
      alert(`The radio button with the value ${value} is selected`);
    },
  },
};

export const ButtonsWithLabel: Story = {
  args: {
    label: 'Gender',
    radioButtonItems: data,
    onChange: (value) => {
      alert(`The radio button with the value ${value} is selected`);
    },
  },
};

export const ButtonsWithDescription: Story = {
  args: {
    label: 'Gender',
    radioButtonItems: dataWithDescription,
    onChange: (value) => {
      alert(`The radio button with the value ${value} is selected`);
    },
  },
};
