import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';

export type LinkExternalProps = {
  href: string;
  text: string;
};

export const LinkExternal: React.FC<LinkExternalProps> = (props) => {
  const { href, text } = props;
  const theme = useTheme();

  return (
    <a target="_blank" style={{ color: theme.palette.text_link.main, textDecoration: 'underline' }} href={href}>
      <Typography>{text}</Typography>
    </a>
  );
};
