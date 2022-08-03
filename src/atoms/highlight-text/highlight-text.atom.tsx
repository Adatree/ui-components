import React from 'react';
import { useTheme } from '@mui/material';

export type HighlightProps = {
  children: string | undefined;
};

export const Highlight: React.FC<HighlightProps> = (props) => {
  const { children } = props;
  const theme = useTheme();

  return <span style={{ color: theme.palette.text_highlight.main, fontWeight: 'bold' }}>{children}</span>;
};
