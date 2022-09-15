import React from 'react';
import { CopyProvider, defaultTheme, DataRecipientProvider, ThemeProvider, TestUtil, Industry, copy } from '../src/lib';

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

const dataRecipients = ['Accredited Data Recipient', 'CDR representative', 'Trusted Adviser'];

export const globalTypes = {
  dataRecipient: {
    name: 'Data Recipient',
    description: 'Select the dataRecipient for the story',
    defaultValue: dataRecipients[0],
    toolbar: {
      /**
       * You can check all available icons by this link:
       * https://5a375b97f4b14f0020b0cda3-wbeulgbetj.chromatic.com/?path=/story/basics-icon--labels
       */
      icon: 'users',
      items: dataRecipients,
      showName: true,
    },
  },
};

// Hack to remount the component
let remountKey = 0;

let dataRecipient = undefined;

const getDataRecipient = (key) => {
  if (key === dataRecipients[0]) {
    dataRecipient = TestUtil.testData.dataRecipient.accredited();
    remountKey = Math.random();
  } else if (key === dataRecipients[1]) {
    dataRecipient = TestUtil.testData.dataRecipient.cdrRepresentative();
    remountKey = Math.random();
  } else if (key === dataRecipients[2]) {
    dataRecipient = TestUtil.testData.dataRecipient.trustedAdvisor();
    remountKey = Math.random();
  }
};

export const decorators = [
  (Story, context) => {
    getDataRecipient(context.globals.dataRecipient);

    return (
      <div key={remountKey}>
        <ThemeProvider theme={defaultTheme}>
          <DataRecipientProvider dataRecipient={dataRecipient}>
            <CopyProvider initialCopy={copy.generateCopy(dataRecipient, Industry.BANKING)}>
              <Story />
            </CopyProvider>
          </DataRecipientProvider>
        </ThemeProvider>
      </div>
    );
  },
];
