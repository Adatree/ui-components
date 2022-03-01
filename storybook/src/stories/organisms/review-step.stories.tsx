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
  dataHolder: TestUtil.getTestDataRedBankDataHolder(),
  sharingDurations: [],
  selectedSharingDurations: SharingDuration.ONCEOFF,
  postUsageAction: PostUsageAction.DELETION,
  sharingEndDate: new Date(),
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
  useCase: TestUtil.getTestDataBudgetingToolUseCase(),
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
  useCase: TestUtil.getTestDataBudgetingToolUseCase(),
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
  useCase: TestUtil.getTestDataBudgetingToolUseCase(),
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
  useCase: TestUtil.getTestDataHomeUseCase(),
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
  useCase: TestUtil.getTestDataHomeUseCase(),
};
