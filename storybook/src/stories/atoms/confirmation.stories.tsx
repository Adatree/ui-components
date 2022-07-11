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
  sharingDuration: SharingDuration.SIXMONTHS,
  endDate: new Date(),
  onChange: (checked: boolean) => {
    alert(`Confirmation checkbox is ${checked === true ? 'checked' : 'unchecked'}`);
  },
};

export const WithOnceOff = Template.bind({});
WithOnceOff.args = {
  companyName: companyName,
  sharingDuration: SharingDuration.ONCEOFF,
  endDate: new Date(),
  onChange: (checked: boolean) => {
    alert(`Confirmation checkbox is ${checked === true ? 'checked' : 'unchecked'}`);
  },
};

export const WithCustom = Template.bind({});
WithCustom.args = {
  companyName: companyName,
  sharingDuration: SharingDuration.CUSTOM,
  endDate: new Date(),
  onChange: (checked: boolean) => {
    alert(`Confirmation checkbox is ${checked === true ? 'checked' : 'unchecked'}`);
  },
};
