import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AccessFrequency, ConsentFormProvider, DataAccessStep, Helper, PostUsageAction, TestUtil } from '../../lib';

const scopes = TestUtil.getTestDataHomeUseCase().scopes ?? [];
const sharingDurations = TestUtil.getTestDataHomeUseCase().sharingDurations ?? [];

let dateDurationsWithSelected = Helper.parseSharingDuration(sharingDurations);
dateDurationsWithSelected[2].isSelected = true;

const testConsentFormWithSelectedValues = {
  accessFrequency: AccessFrequency.ONCEOFF,
  checkedScopes: [scopes[0].id ?? '', scopes[1].id ?? ''],
  dataHolder: TestUtil.getTestDataRedBankDataHolder(),
  dateDurations: dateDurationsWithSelected,
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
    alert(`This step is ${isValid ? '' : 'not '}valid`);
  },
};
