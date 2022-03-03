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

export const CurrentDate = Template.bind({});
CurrentDate.args = {
  label: 'Current date',
  date: new Date(),
  onChange: () => {},
};

export const SetDate = Template.bind({});
SetDate.args = {
  label: 'Future date',
  date: new Date('2032-06-18T21:11:54'),
  onChange: () => {},
};

export const AmericanFormat = Template.bind({});
AmericanFormat.args = {
  label: 'American format',
  date: new Date('2032-01-24T21:11:54'),
  inputFormat: 'MM/dd/yyyy',
  onChange: () => {},
};

export const NoDate = Template.bind({});
NoDate.args = {
  label: 'Pick a date',
  onChange: () => {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  date: new Date(),
  disabled: true,
  onChange: () => {},
};
