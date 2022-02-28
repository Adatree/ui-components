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

const Template: ComponentStory<typeof DateButton> = (args) => <DateButton {...args} />;

export const WithValueUnselected = Template.bind({});
WithValueUnselected.args = {
  sharingDuration: TestUtil.getTestDataHomeUseCase().sharingDurations ?? [],
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const WithValueSelected = Template.bind({});
WithValueSelected.args = {
  sharingDuration: TestUtil.getTestDataHomeUseCase().sharingDurations ?? [],
  selectedSharingDuration: SharingDuration.THREEMONTHS,
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  sharingDuration: TestUtil.getTestDataHomeUseCase().sharingDurations ?? [],
  disabled: true,
  onClick: (date) => {
    alert(`The computed date is ${date.toISOString()}`);
  },
};
