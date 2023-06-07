import React from 'react';
import { Typography, Box, Avatar, ListItem, Button } from '@mui/material';
import { ConsentResponse, Status } from '../../generated/consent';
import { Formatter } from '../../utils/formatter/formater';
import { ChevronRight, Bank } from 'mdi-material-ui';
import { useCopy } from '../../context/copy.context';

export type ListItemProps = {
  consent: ConsentResponse;
  consentUrl: string;
  dataHolderLogoUrl: string | undefined;
};

export const ConsentListItem: React.FC<ListItemProps> = (props) => {
  const { consent, dataHolderLogoUrl, consentUrl } = props;
  const [copy] = useCopy();
  const grantee = consent.grantee;

  let textDate = '';
  let subtitle = 'Consent';

  switch (consent.status) {
    case Status.Active:
      textDate = `${copy.common.status_active_label} ${Formatter.formatDate(consent.created)}`;
      break;
    case Status.Requested:
      textDate = `${copy.common.status_requested_label} ${Formatter.formatDate(consent.created)}`;
      break;
    case Status.Expired:
      textDate = `${copy.common.status_expired_label} ${Formatter.formatDate(consent.sharingEndDate)}`;
      break;
    case Status.Revoked:
      textDate = `${copy.common.status_revoked_label} ${Formatter.formatDate(consent.revoked)}`;
      break;
  }

  if (grantee) {
    subtitle = `Consent for ${grantee.name}`;
  }

  return (
    <ListItem disablePadding sx={{ '&:hover': { backgroundColor: (theme) => theme.palette.background_hover.main } }}>
      <Button
        href={consentUrl}
        sx={{
          display: 'flex',
          justifyContent: 'start',
          textTransform: 'inherit',
          width: '100%',
          '&:link, &:visited': { color: 'inherit' },
        }}
      >
        <Avatar
          alt={consent.dataHolderName}
          src={dataHolderLogoUrl}
          component={'span'}
          sx={{ mr: 2, img: { height: 'auto' } }}
          variant="square"
        >
          <Bank />
        </Avatar>
        <Box>
          <Typography variant="h5">{consent.dataHolderName}</Typography>
          <Typography variant="subtitle1">
            <span>
              {subtitle} {textDate}
            </span>
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex' }}>
          <ChevronRight />
        </Box>
      </Button>
    </ListItem>
  );
};
