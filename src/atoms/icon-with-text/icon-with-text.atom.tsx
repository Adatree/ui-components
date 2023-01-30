import React from 'react';
import { Typography, Avatar, Box } from '@mui/material';
import {
  CheckboxMultipleMarked,
  BankCheck,
  BankRemove,
  BankTransferOut,
  Connection,
  CloudLock,
  Tablet,
} from 'mdi-material-ui';

export type IconWithTextProps = {
  icon:
    | 'CheckboxMultipleMarked'
    | 'BankCheck'
    | 'Connection'
    | 'CloudLock'
    | 'Tablet'
    | 'BankRemove'
    | 'BankTransferOut';
  title?: string;
  text?: string;
};

export const IconWithText: React.FC<IconWithTextProps> = (props) => {
  const { icon, title, text } = props;
  const iconFontSize = '80px';
  let altText = 'Avatar icon';

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'CheckboxMultipleMarked':
        altText = 'Multiple checkboxes marked icon';
        return <CheckboxMultipleMarked color="primary" style={{ fontSize: iconFontSize }} />;
      case 'BankCheck':
        altText = 'Bank checked icon';
        return <BankCheck color="primary" style={{ fontSize: iconFontSize }} />;
      case 'Connection':
        altText = 'Plug connection icon';
        return <Connection color="primary" style={{ fontSize: iconFontSize }} />;
      case 'CloudLock':
        altText = 'Secure cloud icon';
        return <CloudLock color="primary" style={{ fontSize: iconFontSize }} />;
      case 'Tablet':
        altText = 'Tablet icon';
        return <Tablet color="primary" style={{ fontSize: iconFontSize }} />;
      case 'BankRemove':
        altText = 'BankRemove';
        return <BankRemove color="primary" style={{ fontSize: iconFontSize }} />;
      case 'BankTransferOut':
        altText = 'BankTransferOut';
        return <BankTransferOut color="primary" style={{ fontSize: iconFontSize }} />;
    }
  };

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <Avatar alt={altText} sx={{ height: 120, width: 120, backgroundColor: 'transparent' }} variant="square">
        {getIcon(icon)}
      </Avatar>
      {title && <Typography variant="h2">{title}</Typography>}
      {text && <Typography>{text}</Typography>}
    </Box>
  );
};
