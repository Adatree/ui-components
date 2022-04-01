import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentFormProvider, DataAccessStep, Logger, TestUtil } from '../../lib';

const testConsentFormWithUnselectedValues = {
  checkedScopes: [],
  dataHolder: TestUtil.testData.dataHolder.redBank(),
  sharingDurations: [],
  selectedSharingDurations: undefined,
  postUsageAction: undefined,
  sharingEndDate: undefined,
  useCaseId: undefined,
};

export default {
  title: 'Experimental/Supporting parties/Data access step',
  component: DataAccessStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DataAccessStep>;

const Template: ComponentStory<typeof DataAccessStep> = (args) => <DataAccessStep {...args} />;

export const WithSupportingParties = Template.bind({});
WithSupportingParties.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={testConsentFormWithUnselectedValues}>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithSupportingParties.args = {
  companyName: 'Adatree',
  useCase: TestUtil.testData.useCase.ongoingConsentMinScopes(),
  supportingParties: TestUtil.testData.outsourcedServiceProvider.all(),
  isValid: (isValid) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};
