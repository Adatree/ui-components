import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  PostUsageAction,
  ReviewStep,
  SharingDuration,
  TestUtil,
} from '../../lib';

export default {
  title: 'Components/Organisms/Consent steps/Review step',
  component: ReviewStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ReviewStep>;

const Template: ComponentStory<typeof ReviewStep> = (args) => <ReviewStep {...args} />;

const baseConsentFormValues = {
  accessFrequency: AccessFrequency.ONCEOFF,
  checkedScopes: [],
  dataHolder: TestUtil.testData.dataHolder.redBank(),
  selectedSharingDurations: SharingDuration.ONCEOFF,
  postUsageAction: PostUsageAction.DELETION,
  sharingEndDate: new Date(),
  useCaseId: TestUtil.testData.useCase.homeLoan().id,
};

// #######################################################################################

export const WithOnceOffDuration = Template.bind({});
WithOnceOffDuration.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider
        initialValues={{ ...baseConsentFormValues, selectedSharingDurations: SharingDuration.ONCEOFF }}
      >
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithOnceOffDuration.args = {
  useCase: TestUtil.testData.useCase.onceOffConsentMinScopes(),
};

// #######################################################################################

export const WithCustomDuration = Template.bind({});
WithCustomDuration.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider
        initialValues={{ ...baseConsentFormValues, selectedSharingDurations: SharingDuration.CUSTOM }}
      >
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithCustomDuration.args = {
  useCase: TestUtil.testData.useCase.onceOffConsentMinScopes(),
};

// #######################################################################################

export const WithDateDuration = Template.bind({});
WithDateDuration.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider
        initialValues={{ ...baseConsentFormValues, selectedSharingDurations: SharingDuration.THREEMONTHS }}
      >
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithDateDuration.args = {
  useCase: TestUtil.testData.useCase.onceOffConsentMinScopes(),
};

// #######################################################################################

export const WithDeletion = Template.bind({});
WithDeletion.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues, postUsageAction: PostUsageAction.DELETION }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithDeletion.args = {
  useCase: TestUtil.testData.useCase.homeLoan(),
};

// #######################################################################################

export const WithDeidentification = Template.bind({});
WithDeidentification.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider
        initialValues={{ ...baseConsentFormValues, postUsageAction: PostUsageAction.DEIDENTIFICATION }}
      >
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithDeidentification.args = {
  useCase: TestUtil.testData.useCase.homeLoan(),
};
