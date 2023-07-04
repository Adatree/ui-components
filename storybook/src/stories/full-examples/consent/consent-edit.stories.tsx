import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  ConsentEdit,
  PostUsageAction,
  TestUtil,
  SharingDuration,
} from '../../../lib';

export default {
  title: 'Full examples/Edit consent',
  component: ConsentEdit,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentEdit>;

const baseConsentFormValues = {
  accessFrequency: undefined,
  allAddScopesChecked: false,
  allRemoveScopesChecked: false,
  dataHolder: undefined,
  insightsConfirmation: false,
  selectedSharingDurations: undefined,
  postUsageAction: PostUsageAction.Deletion,
  sharingEndDate: undefined,
  useCaseId: undefined,
};

const handleSummit = () => {
  alert('Consent submitted');
};
const handleCancel = () => {
  alert('Consent canceled');
};

const Template: ComponentStory<typeof ConsentEdit> = (args) => <ConsentEdit {...args} />;

// ####################################

export const WithNoChanges = Template.bind({});
WithNoChanges.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithNoChanges.args = {
  consent: TestUtil.testData.consent.active(),
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    accessFrequency: AccessFrequency.Ongoing,
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithNonActiveConsent = Template.bind({});
WithNonActiveConsent.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithNonActiveConsent.args = {
  consent: TestUtil.testData.consent.revoked(),
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    accessFrequency: AccessFrequency.Ongoing,
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithCustomDate = Template.bind({});
WithCustomDate.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithCustomDate.args = {
  consent: TestUtil.testData.consent.active(),
  useCase: { ...TestUtil.testData.useCase.homeLoan(), sharingDurations: [SharingDuration.Custom] },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithSingleDate = Template.bind({});
WithSingleDate.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithSingleDate.args = {
  consent: TestUtil.testData.consent.active(),
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.OneMonth],
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithMultiDates = Template.bind({});
WithMultiDates.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithMultiDates.args = {
  consent: TestUtil.testData.consent.active(),
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.OneMonth, SharingDuration.SixMonths, SharingDuration.OneYear],
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithMultiDatesAndCustom = Template.bind({});
WithMultiDatesAndCustom.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithMultiDatesAndCustom.args = {
  consent: TestUtil.testData.consent.active(),
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.Custom, SharingDuration.SixMonths, SharingDuration.OneYear],
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithPostUsageActionDeidentification = Template.bind({});

WithPostUsageActionDeidentification.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithPostUsageActionDeidentification.args = {
  consent: TestUtil.testData.consent.activeWithDeIdentification(),
  useCase: {
    ...TestUtil.testData.useCase.deIdentification(),
    sharingDurations: [SharingDuration.Custom, SharingDuration.SixMonths, SharingDuration.OneYear],
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};
