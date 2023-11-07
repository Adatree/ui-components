import React from 'react';
import {
  AnalyticsProvider,
  CopyProvider,
  darkTheme,
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
  'Trusted Adviser with a TA Service Provider',
];

const industryValues = ['Banking', 'Energy'];

const themeValues = ['light', 'dark'];

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
  industry: {
    name: 'Industry',
    description: 'Select the industry for the story',
    defaultValue: industryValues[0],
    toolbar: {
      icon: 'admin',
      items: industryValues,
      showName: true,
    },
  },
  theme: {
    name: 'Theme',
    description: 'Select the theme mode',
    defaultValue: themeValues[0],
    toolbar: {
      icon: 'paintbrush',
      items: themeValues,
      showName: true,
    },
  },
};

// Hack to remount the component
let remountKey = 0;

let dataRecipients = undefined;
let industry = undefined;
let theme = undefined;

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
    ];
    remountKey = Math.random();
  } else if (key === dataRecipientValues[3]) {
    dataRecipients = [
      TestUtil.testData.dataRecipient.accreditedDataRecipient(),
      TestUtil.testData.dataRecipient.trustedAdvisor(),
      TestUtil.testData.dataRecipient.trustedAdvisorServiceProvider(),
    ];
    remountKey = Math.random();
  }
};

const getIndustry = (key) => {
  if (key === industryValues[0]) {
    industry = Industry.Banking;
    remountKey = Math.random();
  } else if (key === industryValues[1]) {
    industry = Industry.Energy;
    remountKey = Math.random();
  }
};

const getTheme = (key) => {
  if (key === themeValues[0]) {
    theme = defaultTheme;
    remountKey = Math.random();
  } else if (key === themeValues[1]) {
    theme = darkTheme;
    remountKey = Math.random();
  }
};

const handleAnalyticsOnTrack = (id, description, action, value) => {
  console.log(`Dummy analytics track called with '${id}', '${description}', '${action}' and '${value}'`);
};

export const decorators = [
  (Story, context) => {
    getDataRecipients(context.globals.dataRecipient);
    getIndustry(context.globals.industry);
    getTheme(context.globals.theme);

    return (
      <div key={remountKey}>
        <ThemeProvider theme={theme}>
          <DataRecipientsProvider accreditationNum="ADR-1234-1234" initialDataRecipients={dataRecipients}>
            <CopyProvider
              initialCopy={CopyBuilder.generateCopy(
                Helper.getAdrDataRecipients(dataRecipients),
                Helper.getPrimaryDataRecipients(dataRecipients),
                industry,
              )}
            >
              <AnalyticsProvider onTrack={handleAnalyticsOnTrack}>
                <Story />
              </AnalyticsProvider>
            </CopyProvider>
          </DataRecipientsProvider>
        </ThemeProvider>
      </div>
    );
  },
];
