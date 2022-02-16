import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AccessFrequency, ConsentFormProvider, DataAccessStep, PostUsageAction, TestUtil } from '../../lib';
import { DateOption } from '../../lib/atoms/date-button/date-button.atom';
import { addMonths } from 'date-fns';

const testDateOptions: DateOption[] = [
  { unit: 'm', value: 1, isSelected: false },
  { unit: 'm', value: 3, isSelected: false },
  { unit: 'm', value: 6, isSelected: false },
  { unit: 'y', value: 1, isSelected: false },
];

const testDateOptionsWithSelectedValue: DateOption[] = [
  { unit: 'm', value: 1, isSelected: false },
  { unit: 'm', value: 3, isSelected: false },
  { unit: 'm', value: 6, isSelected: true },
  { unit: 'y', value: 1, isSelected: false },
];

const scopes = TestUtil.getTestDataHomeUseCase().scopes ?? [];

const testConsentFormWithUnselectedValues = {
  accessFrequency: undefined,
  checkedScopes: [],
  dataHolder: undefined,
  dateOptions: testDateOptions,
  postUsageAction: undefined,
  sharingEndDate: new Date(),
};

const testConsentFormWithSelectedValues = {
  accessFrequency: AccessFrequency.ONCEOFF,
  checkedScopes: [scopes[0].id ?? '', scopes[1].id ?? ''],
  dataHolder: TestUtil.getTestDataRedBankDataHolder(),
  dateOptions: testDateOptions,
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

export const WithValuesUnselected = Template.bind({});
WithValuesUnselected.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithValuesUnselected.args = {
  companyName: 'Adatree',
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid) => {
    alert(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

export const WithValuesUnselectedAndDateButtons = Template.bind({});
WithValuesUnselectedAndDateButtons.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={testConsentFormWithUnselectedValues}>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithValuesUnselectedAndDateButtons.args = {
  companyName: 'Adatree',
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid) => {
    alert(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

export const WithValuesSelected = Template.bind({});
WithValuesSelected.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider
        initialValues={{
          ...testConsentFormWithSelectedValues,
          dateOptions: testDateOptionsWithSelectedValue,
          sharingEndDate: addMonths(new Date(), 6),
        }}
      >
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithValuesSelected.args = {
  companyName: 'Adatree',
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid) => {
    alert(`This step is ${isValid ? '' : 'not '}valid`);
  },
};
