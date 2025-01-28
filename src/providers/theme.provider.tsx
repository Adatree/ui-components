import React, { ReactNode } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material';
import { CreateTheme } from './themes/theme';
import { GlobalStyles } from './themes/global.style';
import { AppTheme } from './themes/app.theme';

interface Props {
  theme: AppTheme;
  children: ReactNode;
  extendTheme?: Partial<ThemeOptions>;
}

export const ThemeProvider = ({ theme, children, extendTheme }: Props) => {
  return (
    <MuiThemeProvider theme={CreateTheme(theme, extendTheme)}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MuiThemeProvider>
  );
};
