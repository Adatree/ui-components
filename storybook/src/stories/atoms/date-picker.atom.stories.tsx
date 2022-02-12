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
  onChange: () => {},
};

export const SetDate = Template.bind({});
SetDate.args = {
  label: 'Set date',
  date: new Date('1998-06-18T21:11:54'),
  onChange: () => {},
};

export const AmericanFormat = Template.bind({});
AmericanFormat.args = {
  label: 'American format',
  date: new Date('2022-01-24T21:11:54'),
  inputFormat: 'MM/dd/yyyy',
  onChange: () => {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
  onChange: () => {},
};
