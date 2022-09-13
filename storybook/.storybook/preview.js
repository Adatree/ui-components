import { CopyProvider, defaultTheme, DataRecipientProvider, ThemeProvider, TestUtil, Industry, copy } from '../src/lib';

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <DataRecipientProvider dataRecipient={TestUtil.testData.dataRecipient}>
          <CopyProvider initialCopy={copy.generateCopy(TestUtil.testData.dataRecipient, Industry.BANKING)}>
            <Story />
          </CopyProvider>
        </DataRecipientProvider>
      </ThemeProvider>
    );
  },
];

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
