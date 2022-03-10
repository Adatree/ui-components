import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentFormProvider, UseCaseStep, TestUtil, Logger } from '../../lib';

export default {
  title: 'Components/Organisms/Consent steps/Use case step',
  component: UseCaseStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UseCaseStep>;

const Template: ComponentStory<typeof UseCaseStep> = (args) => <UseCaseStep {...args} />;

const testConsentFormWithSelectedValues = {
  checkedScopes: [],
  dataHolder: undefined,
  sharingDurations: [],
  selectedSharingDurations: undefined,
  postUsageAction: undefined,
  sharingEndDate: new Date(),
  useCaseId: TestUtil.testData.useCase.homeLoan().id,
};

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
  useCases: TestUtil.testData.useCase.all(),
  isLoading: false,
  isValid: (isValid: boolean) => {
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
  useCases: TestUtil.testData.useCase.all(),
  isLoading: false,
  isValid: (isValid: boolean) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

// #######################################################################################

export const Loading = Template.bind({});
Loading.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];

Loading.args = {
  useCases: [],
  isLoading: true,
  isValid: (isValid: boolean) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};
