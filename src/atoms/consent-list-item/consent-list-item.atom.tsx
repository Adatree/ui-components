import React from 'react';
import { Typography, Box, Avatar, ListItemButton, ListItem } from '@mui/material';
import { ConsentResponse, Status } from '../../generated/consent';
import { Formatter } from '../../utils/formatter/formater';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import Bank from 'mdi-material-ui/Bank';

export type ListItemProps = {
  consent: ConsentResponse;
};

export const ConsentListItem: React.FC<ListItemProps> = (props) => {
  const { consent } = props;

  let textDate = '';

  switch (consent.status) {
    case Status.ACTIVE:
      textDate = `granted: ${Formatter.formatDate(consent.created)}`;
      break;
    case Status.REQUESTED:
      textDate = `requested: ${Formatter.formatDate(consent.created)}`;
      break;
    case Status.EXPIRED:
      textDate = `expired: ${Formatter.formatDate(consent.sharingEndDate)}`;
      break;
    case Status.REVOKED:
      textDate = `revoked: ${Formatter.formatDate(consent.revoked)}`;
      break;
  }

  return (
    <ListItem secondaryAction={<ChevronRight />} disablePadding>
      <ListItemButton
        component="a"
        href={`/consents/${consent.consentId}`}
        sx={{ '&:link, &:visited': { color: 'inherit' } }}
      >
        <Avatar alt={consent.dataHolderName} src={`/consent.dataHolderBrandId.png`} component={'span'} sx={{ mr: 2 }}>
          <Bank />
        </Avatar>
        <Box>
          <Typography variant="h3">{consent.dataHolderName}</Typography>
          <Typography variant="subtitle1" variantMapping={{ subtitle1: 'h4' }}>
            <span>Consent {textDate}</span>
          </Typography>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};