import { ThemeProvider, ConsentFormProvider } from '../src/lib';

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider>
        <Story />
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
};
