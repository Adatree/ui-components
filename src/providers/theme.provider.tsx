import React, { ReactNode } from 'react';
import { CssBaseline } from '@mui/material/index';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { theme as applicationTheme } from './themes/theme';
import { GlobalStyles } from './themes/global.style';

interface Props {
  children: ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <MuiThemeProvider theme={applicationTheme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MuiThemeProvider>
  );
};
