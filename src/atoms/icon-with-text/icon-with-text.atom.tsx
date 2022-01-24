import React from 'react';
import { Typography, Avatar, Box } from '@mui/material';
import CheckboxMultipleMarked from 'mdi-material-ui/CheckboxMultipleMarked';
import BankCheck from 'mdi-material-ui/BankCheck';
import BankRemove from 'mdi-material-ui/BankRemove';
import BankTransferOut from 'mdi-material-ui/BankTransferOut';
import Connection from 'mdi-material-ui/Connection';
import CloudLock from 'mdi-material-ui/CloudLock';
import Tablet from 'mdi-material-ui/TabletAndroid';

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
        return <CheckboxMultipleMarked color="secondary" style={{ fontSize: iconFontSize }} />;
      case 'BankCheck':
        altText = 'Bank checked icon';
        return <BankCheck color="secondary" style={{ fontSize: iconFontSize }} />;
      case 'Connection':
        altText = 'Plug connection icon';
        return <Connection color="secondary" style={{ fontSize: iconFontSize }} />;
      case 'CloudLock':
        altText = 'Secure cloud icon';
        return <CloudLock color="secondary" style={{ fontSize: iconFontSize }} />;
      case 'Tablet':
        altText = 'Tablet icon';
        return <Tablet color="secondary" style={{ fontSize: iconFontSize }} />;
      case 'BankRemove':
        altText = 'BankRemove';
        return <BankRemove color="secondary" style={{ fontSize: iconFontSize }} />;
      case 'BankTransferOut':
        altText = 'BankTransferOut';
        return <BankTransferOut color="secondary" style={{ fontSize: iconFontSize }} />;
    }
  };

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <Avatar alt={altText} sx={{ height: 120, width: 120, backgroundColor: 'transparent' }}>
        {getIcon(icon)}
      </Avatar>
      {title && <Typography variant="h2">{title}</Typography>}
      {text && <Typography>{text}</Typography>}
    </Box>
  );
};
