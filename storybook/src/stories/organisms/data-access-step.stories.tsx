import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  DataAccessStep,
  Logger,
  PostUsageAction,
  SharingDuration,
  TestUtil,
} from '../../lib';

const scopes = TestUtil.getTestDataHomeUseCase().scopes ?? [];
const sharingDurations = TestUtil.getTestDataHomeUseCase().sharingDurations ?? [];

const testConsentFormWithUnselectedValues = {
  accessFrequency: undefined,
  checkedScopes: [],
  dataHolder: TestUtil.getTestDataRedBankDataHolder(),
  sharingDurations: sharingDurations,
  selectedSharingDurations: undefined,
  postUsageAction: undefined,
  sharingEndDate: undefined,
};

const testConsentFormWithSelectedValues = {
  accessFrequency: AccessFrequency.ONGOING,
  checkedScopes: [scopes[0].id ?? '', scopes[1].id ?? ''],
  dataHolder: TestUtil.getTestDataRedBankDataHolder(),
  sharingDurations: sharingDurations,
  selectedSharingDurations: sharingDurations[2],
  postUsageAction: PostUsageAction.DEIDENTIFICATION,
  sharingEndDate: new Date(),
};

export default {
  title: 'Components/Organisms/Consent steps/Data access step',
  component: DataAccessStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DataAccessStep>;

const Template: ComponentStory<typeof DataAccessStep> = (args) => <DataAccessStep {...args} />;

// #######################################################################################

export const WithValuesUnselected = Template.bind({});
WithValuesUnselected.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={testConsentFormWithUnselectedValues}>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithValuesUnselected.args = {
  companyName: 'Adatree',
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

// #######################################################################################

export const WithValuesSelected = Template.bind({});
WithValuesSelected.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={testConsentFormWithSelectedValues}>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithValuesSelected.args = {
  companyName: 'Adatree',
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

// #######################################################################################

export const WithOnceOffSharingDurationOnly = Template.bind({});
WithOnceOffSharingDurationOnly.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider
        initialValues={{ ...testConsentFormWithUnselectedValues, sharingDurations: [SharingDuration.ONCEOFF] }}
      >
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithOnceOffSharingDurationOnly.args = {
  companyName: 'Adatree',
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

// #######################################################################################

export const WithCustomSharingDurationOnly = Template.bind({});
WithCustomSharingDurationOnly.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider
        initialValues={{ ...testConsentFormWithUnselectedValues, sharingDurations: [SharingDuration.CUSTOM] }}
      >
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithCustomSharingDurationOnly.args = {
  companyName: 'Adatree',
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

// #######################################################################################
