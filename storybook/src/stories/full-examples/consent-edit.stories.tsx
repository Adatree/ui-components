import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  ConsentEdit,
  PostUsageAction,
  TestUtil,
  SharingDuration,
} from '../../lib';

export default {
  title: 'Full examples/Edit consent',
  component: ConsentEdit,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentEdit>;

const accreditationNumber = '1234-5678';
const cdrPolicyUrl = 'https://www.adatree.com.au/cdrpolicy';
const companyName = 'TestCompany';
const dataSharingRevocationEmail = 'name@example.com';
const baseConsentFormValues = {
  accessFrequency: undefined,
  allScopesChecked: false,
  dataHolder: undefined,
  selectedSharingDurations: undefined,
  postUsageAction: PostUsageAction.DELETION,
  sharingEndDate: undefined,
  useCaseId: undefined,
};
const organisation = {
  accreditationNumber: accreditationNumber,
  dataSharingRevocationEmail: dataSharingRevocationEmail,
  cdrPolicyUrl: cdrPolicyUrl,
  logo: '/assets/images/test-company-logo.png',
  name: companyName,
  underCdrPrincipal: false,
};

const copy = TestUtil.testData.copy;

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
  copy: copy,
  organisation: organisation,
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    accessFrequency: AccessFrequency.ONGOING,
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
  copy: copy,
  organisation: organisation,
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    accessFrequency: AccessFrequency.ONGOING,
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithAdditionalUseCaseScopes = Template.bind({});
WithAdditionalUseCaseScopes.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithAdditionalUseCaseScopes.args = {
  consent: TestUtil.testData.consent.active(),
  copy: copy,
  organisation: organisation,
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    accessFrequency: AccessFrequency.ONGOING,
    scopes: [
      TestUtil.testData.scope.bankAccountsBasicRead(),
      TestUtil.testData.scope.bankTransactionsRead(),
      TestUtil.testData.scope.bankAccountsDetailRead(),
    ],
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithRemovedUseCaseScopes = Template.bind({});
WithRemovedUseCaseScopes.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithRemovedUseCaseScopes.args = {
  consent: TestUtil.testData.consent.active(),
  copy: copy,
  organisation: organisation,
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    scopes: [TestUtil.testData.scope.bankAccountsBasicRead()],
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithAdditionalAndRemovedUseCaseScopes = Template.bind({});
WithAdditionalAndRemovedUseCaseScopes.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithAdditionalAndRemovedUseCaseScopes.args = {
  consent: TestUtil.testData.consent.active(),
  copy: copy,
  organisation: organisation,
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    scopes: [TestUtil.testData.scope.bankAccountsBasicRead(), TestUtil.testData.scope.bankAccountsDetailRead()],
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
  copy: copy,
  organisation: organisation,
  useCase: { ...TestUtil.testData.useCase.homeLoan(), sharingDurations: [SharingDuration.CUSTOM] },
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
  copy: copy,
  organisation: organisation,
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.ONEMONTH, SharingDuration.SIXMONTHS, SharingDuration.ONEYEAR],
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
  copy: copy,
  organisation: organisation,
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.CUSTOM, SharingDuration.SIXMONTHS, SharingDuration.ONEYEAR],
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithAll = Template.bind({});
WithAll.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithAll.args = {
  consent: TestUtil.testData.consent.active(),
  copy: copy,
  organisation: organisation,
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.CUSTOM, SharingDuration.SIXMONTHS, SharingDuration.ONEYEAR],
    scopes: [TestUtil.testData.scope.bankAccountsBasicRead(), TestUtil.testData.scope.bankAccountsDetailRead()],
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};
