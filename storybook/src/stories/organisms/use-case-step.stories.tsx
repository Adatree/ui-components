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

export const Default = Template.bind({});
Default.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];

Default.args = {
  useCases: TestUtil.testData.useCase.all(),
  isValid: (isValid: boolean) => {
    Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
  },
};
