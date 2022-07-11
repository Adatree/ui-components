import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentFormProvider, DateSelector, SharingDuration } from '../../lib';

export default {
  title: 'Components/Molecules/Date Selector',
  component: DateSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DateSelector>;

const companyName = 'TestCompany';

const Template: ComponentStory<typeof DateSelector> = (args) => <DateSelector {...args} />;

export const WithOnceOffDuration = Template.bind({});
WithOnceOffDuration.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithOnceOffDuration.args = {
  companyName: companyName,
  sharingDurations: [SharingDuration.ONCEOFF],
};

export const WithOneWeekDuration = Template.bind({});
WithOneWeekDuration.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithOneWeekDuration.args = {
  companyName: companyName,
  sharingDurations: [SharingDuration.ONEWEEK],
};

export const WithTwoWeeksDuration = Template.bind({});
WithTwoWeeksDuration.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithTwoWeeksDuration.args = {
  companyName: companyName,
  sharingDurations: [SharingDuration.TWOWEEKS],
};

export const WithCustomDuration = Template.bind({});
WithCustomDuration.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithCustomDuration.args = {
  companyName: companyName,
  sharingDurations: [SharingDuration.CUSTOM],
};

export const WithManyDurations = Template.bind({});
WithManyDurations.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithManyDurations.args = {
  companyName: companyName,
  sharingDurations: [
    SharingDuration.ONEDAY,
    SharingDuration.ONEWEEK,
    SharingDuration.ONEMONTH,
    SharingDuration.ONEYEAR,
  ],
};

export const WithManyDurationsAndCustom = Template.bind({});
WithManyDurationsAndCustom.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithManyDurationsAndCustom.args = {
  companyName: companyName,
  sharingDurations: [
    SharingDuration.ONCEOFF,
    SharingDuration.ONEDAY,
    SharingDuration.TWOWEEKS,
    SharingDuration.THREEMONTHS,
    SharingDuration.CUSTOM,
  ],
};
