import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AccessFrequency, ConsentFormProvider, ConsentEdit, PostUsageAction, TestUtil } from '../../lib';

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
  checkedScopes: [],
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

export const NonEditable = Template.bind({});
NonEditable.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

NonEditable.args = {
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
  consent: TestUtil.testData.consent.active(),
  copy: copy,
  organisation: organisation,
  useCase: TestUtil.testData.useCase.ongoingConsentMinScopes(),
  onCancel: handleCancel,
  onSubmit: handleSummit,
};
