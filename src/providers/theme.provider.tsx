import React, { ReactNode } from 'react';
import { CssBaseline } from '@mui/material/index';
import { ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles';
import { CreateTheme } from './themes/theme';
import { GlobalStyles } from './themes/global.style';
import { AppTheme } from './themes/app.theme';

interface Props {
  theme: AppTheme;
  children: ReactNode;
  extendTheme?: Partial<ThemeOptions>;
}

export const ThemeProvider: React.FC<Props> = ({ theme, children, extendTheme }: Props) => {
  return (
    <MuiThemeProvider theme={CreateTheme(theme, extendTheme)}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MuiThemeProvider>
  );
};
