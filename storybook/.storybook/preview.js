import { CopyProvider, defaultTheme, ThemeProvider, TestUtil } from '../src/lib';

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <OrganisationProvider org={TestUtil.testData.organisation}>
          <CopyProvider initialCopy={TestUtil.testData.copy}>
            <Story />
          </CopyProvider>
        </OrganisationProvider>
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
