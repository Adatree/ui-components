import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  ConsentFormProvider,
  ConsentStepperResponsive,
  InfoCdrStep,
  Logger,
  TestUtil,
  ReviewStep,
  InfoHowItWorksStep,
  DataAccessStep,
  DataHolderStep,
} from '../../lib';

export default {
  title: 'Full examples/Create consent',
  component: ConsentStepperResponsive,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentStepperResponsive>;

const Template: ComponentStory<typeof ConsentStepperResponsive> = (args) => <ConsentStepperResponsive {...args} />;

export const CreateConsent = Template.bind({});
CreateConsent.decorators = [
  (Story) => {
    return (
      <ConsentFormProvider>
        <Story />
      </ConsentFormProvider>
    );
  },
];

CreateConsent.args = {
  steps: [
    {
      label: 'CDR',
      content: <InfoCdrStep companyName={'Adatree'} accreditationNumber={'1234567890'} />,
      disableNextButton: false,
    },
    {
      label: 'How it works',
      content: (
        <InfoHowItWorksStep
          dataSharingRevocationEmail="datasharing@adatree.com.au"
          cdrPolicyUrl="https://adatree.com.au/cdrpolicy"
        />
      ),
      disableNextButton: false,
    },
    {
      label: 'Your data',
      content: (
        <DataAccessStep
          companyName={'Adatree'}
          useCase={TestUtil.testData.useCase.homeLoan()}
          isValid={(isValid) => {
            Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
          }}
        />
      ),
      disableNextButton: false,
    },
    {
      label: 'Connect',
      content: (
        <DataHolderStep
          dataHolders={TestUtil.testData.dataHolder.all()}
          useCase={TestUtil.testData.useCase.homeLoan()}
          consentUrl={'/'}
          existingConsents={[]}
          isValid={(isValid) => {
            Logger.info(`This step is ${isValid ? '' : 'not '}valid`);
          }}
        />
      ),
      disableNextButton: false,
    },
    {
      label: 'Summary',
      content: (
        <>
          <ReviewStep useCase={TestUtil.testData.useCase.homeLoan()} />
        </>
      ),
      disableNextButton: false,
      nextButtonLabel: 'Consent',
      onNext: () => {
        alert('Create consent was successfull.');
      },
    },
  ],
};
