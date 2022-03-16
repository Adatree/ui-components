import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentFormProvider, ExtendConsentDateStep, Logger, TestUtil } from '../../lib';

export default {
  title: 'Components/Organisms/Consent steps/Extend consent date step',
  component: ExtendConsentDateStep,
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
} as ComponentMeta<typeof ExtendConsentDateStep>;

const Template: ComponentStory<typeof ExtendConsentDateStep> = (args) => <ExtendConsentDateStep {...args} />;

export const Default = Template.bind({});
Default.args = {
  companyName: 'Adatree',
  useCase: TestUtil.testData.useCase.homeLoan(),
  isValid: (isValid: boolean) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};
