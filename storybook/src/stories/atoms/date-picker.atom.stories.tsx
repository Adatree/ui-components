import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DatePicker } from '../../lib';

export default {
  title: 'Components/Atoms/Date picker',
  component: DatePicker,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker {...args} />;

const futureDate = new Date();
futureDate.setFullYear(futureDate.getFullYear() + 1);

export const CurrentDate = Template.bind({});
CurrentDate.args = {
  label: 'Current date',
  date: new Date(),
  onChange: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const SetDate = Template.bind({});
SetDate.args = {
  label: 'Future date',
  date: futureDate,
  onChange: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const AmericanFormat = Template.bind({});
AmericanFormat.args = {
  label: 'American format',
  date: new Date(),
  inputFormat: 'MM/dd/yyyy',
  onChange: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const NoDate = Template.bind({});
NoDate.args = {
  label: 'Pick a date',
  onChange: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  date: new Date(),
  disabled: true,
  onChange: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const Error = Template.bind({});
Error.args = {
  label: 'Error date',
  date: new Date('2032-06-18T21:11:54'),
  onChange: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};
