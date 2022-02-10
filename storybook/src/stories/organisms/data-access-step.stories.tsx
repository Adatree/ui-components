import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AccessFrequency, ConsentFormProvider, DataAccessStep, PostUsageAction, TestUtil } from '../../lib';

export default {
  title: 'Atomic Components/Organisms/Consent steps/Data access step',
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

const scopes = TestUtil.getTestDataHomeUseCase().scopes ?? [];

const ConsentFormValues = {
  accessFrequency: AccessFrequency.ONCEOFF,
  checkedScopes: [scopes[0].id ?? '', scopes[1].id ?? ''],
  dataHolder: TestUtil.getTestDataRedBankDataHolder(),
  postUsageAction: PostUsageAction.DEIDENTIFICATION,
  sharingEndDate: new Date(),
};

export const WithValuesSelected = Template.bind({});
WithValuesSelected.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={ConsentFormValues}>
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
