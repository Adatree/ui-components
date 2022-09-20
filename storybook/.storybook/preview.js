import React from 'react';
import {
  CopyProvider,
  defaultTheme,
  DataRecipientsProvider,
  ThemeProvider,
  TestUtil,
  Industry,
  CopyBuilder,
  Helper,
} from '../src/lib';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Introduction', 'Getting started', 'Atomic Design', 'Branding', 'Components', 'Full examples'],
    },
  },
};

const dataRecipientValues = [
  'Accredited Data Recipient',
  'CDR representative',
  'Trusted Adviser',
  'Trusted Adviser Service Provider',
];

export const globalTypes = {
  dataRecipient: {
    name: 'Data Recipient',
    description: 'Select the dataRecipient for the story',
    defaultValue: dataRecipientValues[0],
    toolbar: {
      /**
       * You can check all available icons by this link:
       * https://5a375b97f4b14f0020b0cda3-wbeulgbetj.chromatic.com/?path=/story/basics-icon--labels
       */
      icon: 'useralt',
      items: dataRecipientValues,
      showName: true,
    },
  },
};

// Hack to remount the component
let remountKey = 0;

let dataRecipients = undefined;

const getDataRecipients = (key) => {
  if (key === dataRecipientValues[0]) {
    dataRecipients = [TestUtil.testData.dataRecipient.accreditedDataRecipient()];
    remountKey = Math.random();
  } else if (key === dataRecipientValues[1]) {
    dataRecipients = [
      TestUtil.testData.dataRecipient.accreditedDataRecipient(),
      TestUtil.testData.dataRecipient.cdrRepresentative(),
    ];
    remountKey = Math.random();
  } else if (key === dataRecipientValues[2]) {
    dataRecipients = [
      TestUtil.testData.dataRecipient.accreditedDataRecipient(),
      TestUtil.testData.dataRecipient.trustedAdvisor(),
      TestUtil.testData.dataRecipient.trustedAdvisorServiceProvider(),
    ];
    remountKey = Math.random();
  } else if (key === dataRecipientValues[3]) {
    dataRecipients = [
      TestUtil.testData.dataRecipient.accreditedDataRecipient(),
      TestUtil.testData.dataRecipient.trustedAdvisorServiceProvider(),
    ];
    remountKey = Math.random();
  }
};

export const decorators = [
  (Story, context) => {
    getDataRecipients(context.globals.dataRecipient);

    return (
      <div key={remountKey}>
        <ThemeProvider theme={defaultTheme}>
          <DataRecipientsProvider initialDataRecipients={dataRecipients}>
            <CopyProvider
              initialCopy={CopyBuilder.generateCopy(Helper.getPrimaryDataRecipients(dataRecipients), Industry.BANKING)}
            >
              <Story />
            </CopyProvider>
          </DataRecipientsProvider>
        </ThemeProvider>
      </div>
    );
  },
];
