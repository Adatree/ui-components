import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  CreateConsentStepV2,
  PostUsageAction,
  SharingDuration,
  TestUtil,
} from '../../lib';

export default {
  title: 'Full examples/Create consent single step/version 2',
  component: CreateConsentStepV2,
  parameters: {
    backgrounds: {
      default: 'Adatree',
      values: [{ name: 'Adatree', value: '#F8F8F8' }],
    },
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CreateConsentStepV2>;

const accreditationNumber = '1234-5678';
const cdrPolicyUrl = 'https://www.adatree.com.au/cdrpolicy';
const companyName = 'TestComapnay';
const baseConsentFormValues = {
  accessFrequency: undefined,
  checkedScopes: [],
  dataHolder: undefined,
  selectedSharingDurations: undefined,
  postUsageAction: PostUsageAction.DELETION,
  sharingEndDate: undefined,
  useCaseId: undefined,
};
const handleSummit = () => {
  alert('Consent submitted');
};
const handleCancel = () => {
  alert('Consent canceled');
};

const Template: ComponentStory<typeof CreateConsentStepV2> = (args) => <CreateConsentStepV2 {...args} />;

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
  accreditationNumber: accreditationNumber,
  companyName: companyName,
  cdrPolicyUrl: cdrPolicyUrl,
  existingConsents: TestUtil.testData.consent.all(),
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
  accreditationNumber: accreditationNumber,
  companyName: companyName,
  cdrPolicyUrl: cdrPolicyUrl,
  existingConsents: TestUtil.testData.consent.all(),
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
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
  accreditationNumber: accreditationNumber,
  companyName: companyName,
  cdrPolicyUrl: cdrPolicyUrl,
  existingConsents: TestUtil.testData.consent.all(),
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
  accreditationNumber: accreditationNumber,
  companyName: companyName,
  cdrPolicyUrl: cdrPolicyUrl,
  existingConsents: TestUtil.testData.consent.all(),
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
  accreditationNumber: accreditationNumber,
  cdrPolicyUrl: cdrPolicyUrl,
  companyName: companyName,
  existingConsents: [
    ...TestUtil.testData.consent.all(),
    ...[
      TestUtil.testData.consent.generateConsent({
        dataHolderBrandId: 'a3e0c26a-db81-491f-bfb2-90ea2da621c8',
        useCaseId: TestUtil.testData.useCase.homeLoan().id,
      }),
    ],
  ],
  useCase: TestUtil.testData.useCase.homeLoan(),
  onCancel: handleCancel,
  onSubmit: handleSummit,
};
