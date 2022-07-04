import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentFormProvider, CreateConsentStep, TestUtil } from '../../lib';

export default {
  title: 'Full examples/Create consent single step',
  component: CreateConsentStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CreateConsentStep>;

const Template: ComponentStory<typeof CreateConsentStep> = (args) => <CreateConsentStep {...args} />;

export const WithShortScopes = Template.bind({});
WithShortScopes.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithShortScopes.args = {
  useCase: TestUtil.testData.useCase.homeLoan(),
};

export const WithLongScopes = Template.bind({});
WithLongScopes.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithLongScopes.args = {
  useCase: TestUtil.testData.useCase.openEnergy(),
};
