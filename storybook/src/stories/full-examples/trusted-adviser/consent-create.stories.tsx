import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  ConsentFormProvider,
  ConsentCreate,
  PostUsageAction,
  TestUtil,
  SharingDuration,
  AccessFrequency,
} from '../../../lib';

export default {
  title: 'Full examples/Trusted Adviser/Create consent',
  component: ConsentCreate,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentCreate>;

const baseConsentFormValues = {
  accessFrequency: undefined,
  allAddScopesChecked: false,
  allRemoveScopesChecked: false,
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

const Template: ComponentStory<typeof ConsentCreate> = (args) => <ConsentCreate {...args} />;

// ####################################

export const WithOneTrustedAdvisor = Template.bind({});
WithOneTrustedAdvisor.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithOneTrustedAdvisor.args = {
  existingConsents: TestUtil.testData.consent.all(),
  favouriteDataHolders: TestUtil.testData.dataHolder.all(),
  trustedAdvisors: [TestUtil.testData.trustedAdvisor.trustedAdvisor1()],
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.THREEMONTHS],
    accessFrequency: AccessFrequency.ONGOING,
  },

  onCancel: handleCancel,
  onSubmit: handleSummit,
};

// ####################################

export const WithManyTrustedAdvisors = Template.bind({});
WithManyTrustedAdvisors.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithManyTrustedAdvisors.args = {
  existingConsents: TestUtil.testData.consent.all(),
  favouriteDataHolders: TestUtil.testData.dataHolder.all(),
  trustedAdvisors: TestUtil.testData.trustedAdvisor.all(),
  useCase: TestUtil.testData.useCase.ongoingConsentMinScopes(),
  onCancel: handleCancel,
  onSubmit: handleSummit,
};
