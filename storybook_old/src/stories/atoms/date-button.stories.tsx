import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateButton } from '../../lib';
import { SharingDuration } from '../../lib';

export default {
  title: 'Components/Atoms/Date button',
  component: DateButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DateButton>;

const sharingDurations = [
  SharingDuration.OnceOff,
  SharingDuration.OneDay,
  SharingDuration.OneWeek,
  SharingDuration.OneMonth,
  SharingDuration.SixMonths,
  SharingDuration.OneYear,
];
const Template: ComponentStory<typeof DateButton> = (args) => <DateButton {...args} />;

export const WithValueUnselected = Template.bind({});
WithValueUnselected.args = {
  sharingDurations: sharingDurations,
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const WithValueSelected = Template.bind({});
WithValueSelected.args = {
  sharingDurations: sharingDurations,
  selectedSharingDuration: SharingDuration.OneMonth,
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  sharingDurations: sharingDurations,
  disabled: true,
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};
