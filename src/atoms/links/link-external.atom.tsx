import React from 'react';
import { useTheme } from '@mui/material';

interface Props {
  href: string;
  text: string;
}

export const LinkExternal = (props: Props) => {
  const { href, text } = props;
  const theme = useTheme();
  const textColour = theme.palette.text_link !== undefined ? theme.palette.text_link.main : '#1a0dab';

  return (
    <a target="_blank" rel="noreferrer" style={{ color: textColour, textDecoration: 'underline' }} href={href}>
      {text}
    </a>
  );
};
