import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateButton, TestUtil } from '../../lib';
import { SharingDuration } from '../../lib';

export default {
  title: 'Components/Atoms/Date button',
  component: DateButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DateButton>;

const sharingDurations = [
  SharingDuration.ONCEOFF,
  SharingDuration.ONEDAY,
  SharingDuration.ONEWEEK,
  SharingDuration.ONEMONTH,
  SharingDuration.SIXMONTHS,
  SharingDuration.ONEYEAR,
];
const Template: ComponentStory<typeof DateButton> = (args) => <DateButton {...args} />;

export const WithValueUnselected = Template.bind({});
WithValueUnselected.args = {
  sharingDuration: sharingDurations,
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const WithValueSelected = Template.bind({});
WithValueSelected.args = {
  sharingDuration: sharingDurations,
  selectedSharingDuration: SharingDuration.ONEMONTH,
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  sharingDuration: sharingDurations,
  disabled: true,
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};
