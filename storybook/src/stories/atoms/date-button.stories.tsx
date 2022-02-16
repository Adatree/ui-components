import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateButton } from '../../lib';

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
  dateOptions: [
    {
      unit: 'd',
      value: 1,
    },
    {
      unit: 'd',
      value: 3,
    },
    {
      unit: 'w',
      value: 1,
    },
    {
      unit: 'w',
      value: 3,
    },
    {
      unit: 'm',
      value: 1,
    },
    {
      unit: 'm',
      value: 3,
    },
    {
      unit: 'y',
      value: 1,
    },
    {
      unit: 'y',
      value: 3,
    },
  ],
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};
