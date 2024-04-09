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
} from '../src/lib';

let remountKey = 0;
let dataRecipients = StoryHelper.getDataRecipients(dataRecipientValues[0]);
let industry = Industry.Banking;
let theme = defaultTheme;

const handleAnalyticsOnTrack = (event, id, description, action, value) => {
  console.log(`Dummy analytics track called with '${event}', '${id}', '${description}', '${action}' and '${value}'`);
};

const preview: Preview = {
  decorators: [
    (Story) => (
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
    ),
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

export default preview;
