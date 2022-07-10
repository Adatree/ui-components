import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentFormProvider, CreateConsentStepV3, TestUtil } from '../../lib';

export default {
  title: 'Full examples/Create consent single step/version 3',
  component: CreateConsentStepV3,
  parameters: {
    backgrounds: {
      default: 'Adatree',
      values: [{ name: 'Adatree', value: '#F8F8F8' }],
    },
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CreateConsentStepV3>;

const accreditationNumber = '1234-5678';
const cdrPolicyUrl = 'https://www.adatree.com.au/cdrpolicy';
const companyName = 'TestComapnay';
const handleSummit = () => {
  alert('Consent submitted');
};
const handleCancel = () => {
  alert('Consent canceled');
};

const Template: ComponentStory<typeof CreateConsentStepV3> = (args) => <CreateConsentStepV3 {...args} />;

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
  onCancel: handleCancel,
  onSubmit: handleSummit,
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
  onCancel: handleCancel,
  onSubmit: handleSummit,
};