import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Confirmation, SharingDuration } from '../../lib';

export default {
  title: 'Components/Atoms/Confirmation',
  component: Confirmation,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Confirmation>;

const companyName = 'TestCompany';
const Template: ComponentStory<typeof Confirmation> = (args) => <Confirmation {...args} />;

export const WithPeriod = Template.bind({});
WithPeriod.args = {
  companyName: companyName,
  sharingDuration: SharingDuration.SixMonths,
  endDate: new Date(),
  onChange: (checked: boolean) => {
    alert(`Confirmation checkbox is ${checked === true ? 'checked' : 'unchecked'}`);
  },
};

export const WithOnceOff = Template.bind({});
WithOnceOff.args = {
  companyName: companyName,
  sharingDuration: SharingDuration.OnceOff,
  endDate: new Date(),
  onChange: (checked: boolean) => {
    alert(`Confirmation checkbox is ${checked === true ? 'checked' : 'unchecked'}`);
  },
};

export const WithCustom = Template.bind({});
WithCustom.args = {
  companyName: companyName,
  sharingDuration: SharingDuration.Custom,
  endDate: new Date(),
  onChange: (checked: boolean) => {
    alert(`Confirmation checkbox is ${checked === true ? 'checked' : 'unchecked'}`);
  },
};

export const WithNoDates = Template.bind({});
WithNoDates.args = {
  companyName: companyName,
  sharingDuration: undefined,
  endDate: undefined,
  onChange: (checked: boolean) => {
    alert(`Confirmation checkbox is ${checked === true ? 'checked' : 'unchecked'}`);
  },
};
