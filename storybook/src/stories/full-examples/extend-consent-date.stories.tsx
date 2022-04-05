import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  ConsentFormProvider,
  ConsentStepperResponsive,
  ExtendConsentDateStep,
  InfoExtendDateStep,
  InfoCdrStep,
  Logger,
  PostUsageAction,
  SharingDuration,
  TestUtil,
  ReviewStep,
  UseCaseSummary,
} from '../../lib';

export default {
  title: 'Full examples/Extend consent date',
  component: ConsentStepperResponsive,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentStepperResponsive>;

const Template: ComponentStory<typeof ConsentStepperResponsive> = (args) => <ConsentStepperResponsive {...args} />;

const testConsentFormValues = {
  checkedScopes: [],
  dataHolder: TestUtil.testData.dataHolder.redBank(),
  selectedSharingDurations: SharingDuration.THREEMONTHS,
  postUsageAction: PostUsageAction.DEIDENTIFICATION,
  sharingEndDate: new Date(),
  useCaseId: TestUtil.testData.useCase.ongoingConsentMinScopes().id,
};

export const ExtendDate = Template.bind({});
ExtendDate.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider initialValues={testConsentFormValues}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

ExtendDate.args = {
  steps: [
    {
      label: 'How it works',
      content: (
        <>
          <InfoExtendDateStep />
          <InfoCdrStep companyName={'Adatree'} accreditationNumber={'1234567890'} />
        </>
      ),
      disableNextButton: false,
    },
    {
      label: 'Update',
      content: (
        <>
          <UseCaseSummary title={'Update sharing expiration date'} useCase={TestUtil.testData.useCase.homeLoan()} />
          <ExtendConsentDateStep
            companyName={'Adatree'}
            useCase={TestUtil.testData.useCase.homeLoan()}
            isValid={(isValid) => {
              Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
            }}
          />
        </>
      ),
      disableNextButton: false,
    },
    {
      label: 'Review',
      content: (
        <>
          <ReviewStep
            useCase={TestUtil.testData.useCase.homeLoan()}
            cdrPolicyUrl={'https://example.com'}
            dataSharingRevocationEmail={'data.sharing.revocation@email.com'}
          />
        </>
      ),
      disableNextButton: false,
    },
  ],
};
