import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  ConsentCreate,
  PostUsageAction,
  SharingDuration,
  TestUtil,
} from '../../lib';

export default {
  title: 'Full examples/Create consent',
  component: ConsentCreate,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentCreate>;

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

const handleSummit = () => {
  alert('Consent submitted');
};
const handleCancel = () => {
  alert('Consent canceled');
};

const Template: ComponentStory<typeof ConsentCreate> = (args) => <ConsentCreate {...args} />;

// ####################################

export const WithOngoingAccess = Template.bind({});
WithOngoingAccess.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithOngoingAccess.args = {
  existingConsents: TestUtil.testData.consent.all(),
  favouriteDataHolders: TestUtil.testData.dataHolder.all(),
  organisation: organisation,
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.THREEMONTHS],
    accessFrequency: AccessFrequency.ONGOING,
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithOnceOffAccess = Template.bind({});
WithOnceOffAccess.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithOnceOffAccess.args = {
  organisation: organisation,
  existingConsents: TestUtil.testData.consent.all(),
  favouriteDataHolders: TestUtil.testData.dataHolder.all(),
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.ONCEOFF],
    accessFrequency: AccessFrequency.ONCEOFF,
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithUnderCdrPrincipal = Template.bind({});
WithUnderCdrPrincipal.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithUnderCdrPrincipal.args = {
  existingConsents: TestUtil.testData.consent.all(),
  favouriteDataHolders: TestUtil.testData.dataHolder.all(),
  organisation: { ...organisation, underCdrPrincipal: true },
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.ONCEOFF],
    accessFrequency: AccessFrequency.ONCEOFF,
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithSupportingParties = Template.bind({});
WithSupportingParties.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithSupportingParties.args = {
  organisation: organisation,
  existingConsents: TestUtil.testData.consent.all(),
  favouriteDataHolders: TestUtil.testData.dataHolder.all(),
  useCase: {
    ...TestUtil.testData.useCase.homeLoanWithOsps(),
    sharingDurations: [SharingDuration.ONCEOFF],
    accessFrequency: AccessFrequency.ONCEOFF,
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithLongScopes = Template.bind({});
WithLongScopes.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithLongScopes.args = {
  existingConsents: TestUtil.testData.consent.all(),
  favouriteDataHolders: TestUtil.testData.dataHolder.all(),
  organisation: organisation,
  useCase: TestUtil.testData.useCase.openEnergy(),
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
  existingConsents: TestUtil.testData.consent.all(),
  favouriteDataHolders: TestUtil.testData.dataHolder.all(),
  organisation: organisation,
  useCase: TestUtil.testData.useCase.ongoingConsentMinScopes(),
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithNoFavouriteDataHolders = Template.bind({});
WithNoFavouriteDataHolders.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithNoFavouriteDataHolders.args = {
  existingConsents: TestUtil.testData.consent.all(),
  organisation: organisation,
  useCase: TestUtil.testData.useCase.ongoingConsentMinScopes(),
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithNoRemainingDataHolders = Template.bind({});
WithNoRemainingDataHolders.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithNoRemainingDataHolders.args = {
  existingConsents: [
    ...TestUtil.testData.consent.all(),
    ...[
      TestUtil.testData.consent.generateConsent({
        dataHolderBrandId: 'a3e0c26a-db81-491f-bfb2-90ea2da621c8',
        useCaseId: TestUtil.testData.useCase.homeLoan().id,
      }),
      TestUtil.testData.consent.generateConsent({
        dataHolderBrandId: '7a7cea5d-19c4-458b-ab79-c926455475d3',
        useCaseId: TestUtil.testData.useCase.homeLoan().id,
      }),
      TestUtil.testData.consent.generateConsent({
        dataHolderBrandId: '8a8cea5d-19c4-458b-ab79-c926455475d3',
        useCaseId: TestUtil.testData.useCase.homeLoan().id,
      }),
    ],
  ],
  favouriteDataHolders: TestUtil.testData.dataHolder.all(),
  organisation: organisation,
  useCase: TestUtil.testData.useCase.homeLoan(),
  onCancel: handleCancel,
  onSubmit: handleSummit,
};
