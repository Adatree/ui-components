import React from 'react';
import { useTheme } from '@mui/material';

export type HighlightProps = {
  children: string | undefined;
};

export const Highlight: React.FC<HighlightProps> = (props) => {
  const { children } = props;
  const theme = useTheme();
  const textColour = theme.palette.text_highlight !== undefined ? theme.palette.text_highlight.main : '#000';

  return <span style={{ color: textColour, fontWeight: 'bold' }}>{children}</span>;
};
