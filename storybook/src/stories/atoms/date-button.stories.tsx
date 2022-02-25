import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateButton, DateDurationList } from '../../lib';

export default {
  title: 'Components/Atoms/Date button',
  component: DateButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DateButton>;

const Template: ComponentStory<typeof DateButton> = (args) => <DateButton {...args} />;

export const DaysMonthsYears = Template.bind({});
DaysMonthsYears.args = {
  dateDurations: Object.values(DateDurationList),
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const WithValueSelected = Template.bind({});
WithValueSelected.args = {
  dateDurations: [
    {
      text: '1 month',
      unit: 'm',
      value: 1,
    },
    {
      text: '3 months',
      unit: 'm',
      value: 3,
      isSelected: true,
    },
    {
      text: '6 months',
      unit: 'm',
      value: 6,
    },
  ],
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  dateDurations: Object.values(DateDurationList),
  disabled: true,
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};
