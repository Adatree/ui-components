import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  PostUsageAction,
  ReviewStep,
  SharingDuration,
  TestUtil,
} from '../../lib';

export default {
  title: 'Experimental/Supporting parties/Review step',
  component: ReviewStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ReviewStep>;

const Template: ComponentStory<typeof ReviewStep> = (args) => <ReviewStep {...args} />;

const baseConsentFormValues = {
  accessFrequency: AccessFrequency.ONCEOFF,
  checkedScopes: [],
  dataHolder: TestUtil.testData.dataHolder.redBank(),
  selectedSharingDurations: SharingDuration.ONCEOFF,
  postUsageAction: PostUsageAction.DELETION,
  sharingEndDate: new Date(),
  useCaseId: TestUtil.testData.useCase.homeLoan().id,
};

// #######################################################################################

export const WithSupportingParties = Template.bind({});
WithSupportingParties.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider
        initialValues={{ ...baseConsentFormValues, selectedSharingDurations: SharingDuration.ONCEOFF }}
      >
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithSupportingParties.args = {
  useCase: TestUtil.testData.useCase.onceOffConsentMinScopes(),
  cdrPolicyUrl: 'https://example.com',
  dataSharingRevocationEmail: 'data.sharing.revocation@email.com',
};
