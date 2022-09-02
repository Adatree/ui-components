import { CopyProvider, defaultTheme, OrganisationProvider, ThemeProvider, TestUtil, Industry, copy } from '../src/lib';

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <OrganisationProvider org={TestUtil.testData.organisation}>
          <CopyProvider initialCopy={copy.generateCopy(TestUtil.testData.organisation, Industry.BANKING)}>
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
