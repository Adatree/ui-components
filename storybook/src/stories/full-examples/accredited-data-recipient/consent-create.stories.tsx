import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  ConsentCreate,
  PostUsageAction,
  SharingDuration,
  TestUtil,
} from '../../../lib';

export default {
  title: 'Full examples/Accredited Data Recipient/Create consent',
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
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.THREEMONTHS],
    accessFrequency: AccessFrequency.ONGOING,
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};

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
  useCase: TestUtil.testData.useCase.ongoingConsentMinScopes(),
  onCancel: handleCancel,
  onSubmit: handleSummit,
};
