import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  DataAccessStep,
  DateDuration,
  PostUsageAction,
  TestUtil,
} from '../../lib';
import { addMonths } from 'date-fns';

const testDateDurations: DateDuration[] = [
  {
    text: '1 month',
    unit: 'm',
    value: 1,
  },
  {
    text: '3 months',
    unit: 'm',
    value: 3,
  },
  {
    text: '6 months',
    unit: 'm',
    value: 6,
  },
];

const testDateDurationsWithSelectedValue: DateDuration[] = [
  {
    text: '1 month',
    unit: 'm',
    value: 1,
  },
  {
    text: '3 months',
    unit: 'm',
    value: 3,
    isSelected: true,
  },
  {
    text: '6 months',
    unit: 'm',
    value: 6,
  },
];

const scopes = TestUtil.getTestDataHomeUseCase().scopes ?? [];

const testConsentFormWithUnselectedValues = {
  accessFrequency: undefined,
  checkedScopes: [],
  dataHolder: undefined,
  dateDurations: testDateDurations,
  postUsageAction: undefined,
  sharingEndDate: new Date(),
};

const testConsentFormWithSelectedValues = {
  accessFrequency: AccessFrequency.ONCEOFF,
  checkedScopes: [scopes[0].id ?? '', scopes[1].id ?? ''],
  dataHolder: TestUtil.getTestDataRedBankDataHolder(),
  dateDurations: testDateDurations,
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
          dateDurations: testDateDurationsWithSelectedValue,
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
