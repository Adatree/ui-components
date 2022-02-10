import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentFormProvider, DataHolderStep, TestUtil } from '../../lib';

export default {
  title: 'Atomic Components/Organisms/Consent steps/Data holders step',
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
  isValid: (isValid: boolean) => {
    alert(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

export const WithTwoDataHolders = Template.bind({});
WithTwoDataHolders.args = {
  dataHolders: TestUtil.getTestDataAllDataHolders(),
  isValid: (isValid: boolean) => {
    alert(`This step is ${isValid ? '' : 'not '}valid`);
  },
};
