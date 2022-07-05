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

const accreditationNumber = '1234-5678';
const cdrPolicyUrl = 'https://www.adatree.com.au/cdrpolicy';
const companyName = 'TestComapnay';

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
  accreditationNumber: accreditationNumber,
  companyName: companyName,
  cdrPolicyUrl: cdrPolicyUrl,
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
  accreditationNumber: accreditationNumber,
  companyName: companyName,
  cdrPolicyUrl: cdrPolicyUrl,
  useCase: TestUtil.testData.useCase.openEnergy(),
};
