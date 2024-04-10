import React from 'react';
import type { Preview } from '@storybook/react';
import { StoryHelper, dataRecipientValues } from '../src/stories/helpers/story.helpers';
import {
  AnalyticsProvider,
  CopyProvider,
  darkTheme,
  defaultTheme,
  DataRecipientsProvider,
  ThemeProvider,
  Industry,
  CopyBuilder,
  Helper,
  DataRecipient,
  AppTheme,
} from '../src/lib';

const industryValues = ['Banking', 'Energy'];
const themeValues = ['light', 'dark'];

let remountKey = 0;
let dataRecipients: DataRecipient[] = StoryHelper.getDataRecipients(dataRecipientValues[0]);
let industry: Industry = Industry.Banking;
let theme: AppTheme = defaultTheme;

const preview: Preview = {
  globalTypes: {
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
  },
  decorators: [
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
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

const handleAnalyticsOnTrack = (event, id, description, action, value) => {
  console.log(`Dummy analytics track called with '${event}', '${id}', '${description}', '${action}' and '${value}'`);
};

const getDataRecipients = (key) => {
  dataRecipients = StoryHelper.getDataRecipients(key);
  remountKey = Math.random();
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

export default preview;
