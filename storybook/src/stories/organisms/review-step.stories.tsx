import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AccessFrequency, ConsentFormProvider, PostUsageAction, ReviewStep, TestUtil } from '../../lib';

export default {
  title: 'Components/Organisms/Consent steps/Review step',
  component: ReviewStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ReviewStep>;

const Template: ComponentStory<typeof ReviewStep> = (args) => <ReviewStep {...args} />;

const ConsentFormValues = {
  accessFrequency: AccessFrequency.ONCEOFF,
  checkedScopes: [],
  dataHolder: TestUtil.getTestDataRedBankDataHolder(),
  sharingDurations: [],
  selectedSharingDurations: undefined,
  postUsageAction: PostUsageAction.DEIDENTIFICATION,
  sharingEndDate: new Date(),
};

export const WithConsentFormValues = Template.bind({});
WithConsentFormValues.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={ConsentFormValues}>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithConsentFormValues.args = {
  useCase: TestUtil.getTestDataHomeUseCase(),
};

const DifferntConsentFormValues = {
  accessFrequency: AccessFrequency.ONGOING,
  checkedScopes: [],
  dataHolder: TestUtil.getTestDataYellowBankDataHolder(),
  dateDurations: [],
  sharingDurations: [],
  selectedSharingDurations: undefined,
  postUsageAction: PostUsageAction.DELETION,
  sharingEndDate: new Date(),
};

export const WithDifferentConsentFormValues = Template.bind({});
WithDifferentConsentFormValues.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={DifferntConsentFormValues}>
        <Story />
      </ConsentFormProvider>
    );
  },
];
WithDifferentConsentFormValues.args = {
  useCase: TestUtil.getTestDataBudgetingToolUseCase(),
};
