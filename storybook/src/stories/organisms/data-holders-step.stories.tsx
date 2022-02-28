import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentFormProvider, DataHolderStep, Logger, TestUtil } from '../../lib';

export default {
  title: 'Components/Organisms/Consent steps/Data holders step',
  component: DataHolderStep,
  decorators: [
    (Story) => {
      return (
        <ConsentFormProvider>
          <Story />
        </ConsentFormProvider>
      );
    },
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DataHolderStep>;

const Template: ComponentStory<typeof DataHolderStep> = (args) => <DataHolderStep {...args} />;

export const WithOneDataHolder = Template.bind({});
WithOneDataHolder.args = {
  dataHolders: [TestUtil.getTestDataRedBankDataHolder()],
  existingConsents: [],
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid: boolean) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

export const WithTwoDataHolders = Template.bind({});
WithTwoDataHolders.args = {
  dataHolders: TestUtil.getTestDataAllDataHolders(),
  existingConsents: [],
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid: boolean) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

export const WithFilteredDataHolders = Template.bind({});
WithFilteredDataHolders.args = {
  dataHolders: TestUtil.getTestDataAllDataHolders(),
  existingConsents: [TestUtil.getTestDataConsentResponse()],
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid: boolean) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

export const WithNoDataHolders = Template.bind({});
WithNoDataHolders.args = {
  dataHolders: [TestUtil.getTestDataYellowBankDataHolder()],
  existingConsents: TestUtil.getTestDataConsentResponses(),
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid: boolean) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};
