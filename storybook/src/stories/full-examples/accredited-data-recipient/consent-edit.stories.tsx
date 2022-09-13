import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentFormProvider, ConsentEdit, PostUsageAction, TestUtil, SharingDuration } from '../../../lib';

export default {
  title: 'Full examples/Accredited Data Recipient/Edit consent',
  component: ConsentEdit,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentEdit>;

const baseConsentFormValues = {
  accessFrequency: undefined,
  allAddScopesChecked: false,
  allRemoveScopesChecked: false,
  dataHolder: undefined,
  selectedSharingDurations: undefined,
  postUsageAction: PostUsageAction.DELETION,
  sharingEndDate: undefined,
  useCaseId: undefined,
};

const handleSummit = () => {
  alert('Consent submitted');
};
const handleCancel = () => {
  alert('Consent canceled');
};

const Template: ComponentStory<typeof ConsentEdit> = (args) => <ConsentEdit {...args} />;

// ####################################

export const WithAll = Template.bind({});
WithAll.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

WithAll.args = {
  consent: TestUtil.testData.consent.active(),
  useCase: {
    ...TestUtil.testData.useCase.homeLoan(),
    sharingDurations: [SharingDuration.CUSTOM, SharingDuration.SIXMONTHS, SharingDuration.ONEYEAR],
    scopes: [TestUtil.testData.scope.bankAccountsBasicRead(), TestUtil.testData.scope.bankAccountsDetailRead()],
  },
  onCancel: handleCancel,
  onSubmit: handleSummit,
};
