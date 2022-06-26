import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  ConsentFormProvider,
  ConsentStepperResponsive,
  InfoCdrStep,
  Logger,
  TestUtil,
  InfoHowItWorksStep,
  CompactViewStep,
} from '../../lib';

export default {
  title: 'Experimental/Compact View/Create consent',
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
      label: 'How CDR works',
      content: (
        <>
          <InfoHowItWorksStep />
          <br />
          <InfoCdrStep companyName={'Adatree'} accreditationNumber={'1234567890'} />,
        </>
      ),
      disableNextButton: false,
    },
    {
      label: 'Consent',
      content: (
        <CompactViewStep
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
  ],
};
