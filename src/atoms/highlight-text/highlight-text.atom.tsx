import React from 'react';
import { useTheme } from '@mui/material';

interface Props {
  children: string | undefined;
}

export const Highlight = (props: Props) => {
  const { children } = props;
  const theme = useTheme();
  const textColour = theme.palette.text_highlight !== undefined ? theme.palette.text_highlight.main : '#000';

  return <span style={{ color: textColour, fontWeight: 'bold' }}>{children}</span>;
};
