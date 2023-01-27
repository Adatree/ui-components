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
  sharingDurations: [SharingDuration.OnceOff],
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
  sharingDurations: [SharingDuration.OneWeek],
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
  sharingDurations: [SharingDuration.TwoWeeks],
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
  sharingDurations: [SharingDuration.Custom],
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
    SharingDuration.OneDay,
    SharingDuration.OneWeek,
    SharingDuration.OneMonth,
    SharingDuration.OneYear,
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
    SharingDuration.OnceOff,
    SharingDuration.OneDay,
    SharingDuration.TwoWeeks,
    SharingDuration.ThreeMonths,
    SharingDuration.Custom,
  ],
};
