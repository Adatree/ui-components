import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  ConsentEdit,
  PostUsageAction,
  TestUtil,
  SharingDuration,
} from '../../../lib';

const handleSummit = () => {
  alert('Consent submitted');
};

const handleCancel = () => {
  alert('Consent canceled');
};

const meta: Meta<typeof ConsentEdit> = {
  title: 'Full examples/Edit consent',
  parameters: {
    layout: 'centered',
  },
  component: ConsentEdit,
  args: {
    consent: TestUtil.testData.consent.active(),
    useCase: {
      ...TestUtil.testData.useCase.homeLoan(),
      accessFrequency: AccessFrequency.Ongoing,
    },
    onCancel: handleCancel,
    onSubmit: handleSummit,
  },
};

export default meta;
type Story = StoryObj<typeof ConsentEdit>;

const baseConsentFormValues = {
  accessFrequency: undefined,
  allAddScopesChecked: true,
  allRemoveScopesChecked: false,
  dataHolder: undefined,
  insightsConfirmation: false,
  selectedSharingDurations: undefined,
  postUsageAction: PostUsageAction.Deletion,
  sharingEndDate: undefined,
  useCaseId: undefined,
};

// ####################################

export const WithNoChanges: Story = {
  render: (args) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentEdit {...args} />
      </ConsentFormProvider>
    );
  },
};

// ####################################

export const WithCustomDate: Story = {
  render: (args) => {
    args.useCase = {
      ...TestUtil.testData.useCase.homeLoan(),
      sharingDurations: [SharingDuration.Custom],
    };
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentEdit {...args} />
      </ConsentFormProvider>
    );
  },
};

// ####################################

export const WithSingleDate: Story = {
  render: (args) => {
    args.useCase = {
      ...TestUtil.testData.useCase.homeLoan(),
      sharingDurations: [SharingDuration.OneMonth],
    };
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentEdit {...args} />
      </ConsentFormProvider>
    );
  },
};

// ####################################

export const WithMultiDates: Story = {
  render: (args) => {
    args.useCase = {
      ...TestUtil.testData.useCase.homeLoan(),
      sharingDurations: [SharingDuration.OneMonth, SharingDuration.SixMonths, SharingDuration.OneYear],
    };
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentEdit {...args} />
      </ConsentFormProvider>
    );
  },
};

// ####################################

export const WithMultiDatesAndCustom: Story = {
  render: (args) => {
    args.useCase = {
      ...TestUtil.testData.useCase.homeLoan(),
      sharingDurations: [SharingDuration.Custom, SharingDuration.SixMonths, SharingDuration.OneYear],
    };
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentEdit {...args} />
      </ConsentFormProvider>
    );
  },
};

// ####################################

export const WithNonActiveConsent: Story = {
  render: (args) => {
    args.consent = TestUtil.testData.consent.revoked();
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentEdit {...args} />
      </ConsentFormProvider>
    );
  },
};
