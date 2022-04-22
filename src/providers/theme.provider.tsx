import React, { ReactNode } from 'react';
import { CssBaseline } from '@mui/material/index';
import { ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles';
import { CreateTheme } from './themes/theme';
import { GlobalStyles } from './themes/global.style';

interface Props {
  children: ReactNode;
  extendTheme?: Partial<ThemeOptions>;
}

export const ThemeProvider: React.FC<Props> = ({ children, extendTheme }: Props) => {
  return (
    <MuiThemeProvider theme={CreateTheme(extendTheme)}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MuiThemeProvider>
  );
};
