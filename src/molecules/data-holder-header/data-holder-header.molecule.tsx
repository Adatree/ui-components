import React from 'react';
import { Avatar, Box, Chip, IconButton, Link, Typography } from '@mui/material';
import { ConsentResponse, Status } from '../../generated/consent';
import { Formatter } from '../../utils/formatter/formater';
import Bank from 'mdi-material-ui/Bank';
import Delete from 'mdi-material-ui/Delete';
import Calendar from 'mdi-material-ui/Calendar';
import { Tooltip } from '../../atoms/tooltip/tooltip.atom';

export type DataHolderHeaderProps = {
  consent: ConsentResponse;
  dataHolderLogoUrl: string;
  isExtendable?: boolean;
  extendableUrl?: string;
  onRevokeClick: () => void;
};

export const DataHolderHeader: React.FC<DataHolderHeaderProps> = (props) => {
  const { consent, dataHolderLogoUrl, isExtendable = false, extendableUrl = '', onRevokeClick } = props;

  let textDate = '';

  switch (consent.status) {
    case Status.ACTIVE:
      textDate = `Consent granted ${Formatter.formatDateTime(consent.created)}`;
      break;
    case Status.REQUESTED:
      textDate = `Consent requested ${Formatter.formatDateTime(consent.created)}`;
      break;
    case Status.EXPIRED:
      textDate = `Consent expired ${Formatter.formatDateTime(consent.sharingEndDate)}`;
      break;
    case Status.REVOKED:
      textDate = `Consent revoked ${Formatter.formatDateTime(consent.revoked)}`;
      break;
  }
  const handleonRevokeClick = () => {
    if (onRevokeClick) {
      onRevokeClick();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
      <Box sx={{ order: 1 }}>
        <Avatar
          alt={consent.dataHolderName}
          src={dataHolderLogoUrl}
          component={'span'}
          sx={{ mr: 2, img: { height: 'auto' } }}
          variant="square"
        >
          <Bank />
        </Avatar>
      </Box>

      <Box
        sx={{
          order: { xs: 3, sm: 2 },
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          flexBasis: { xs: '100%', sm: 0 },
          pt: { xs: 1, sm: 0 },
        }}
      >
        <Typography variant="h2">{consent.dataHolderName}</Typography>
        <Typography>{textDate}</Typography>
      </Box>

      <Box
        sx={{
          order: { xs: 2, sm: 3 },
          display: 'flex',
          flex: { xs: 1, sm: 'inherit' },
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {consent.status === Status.ACTIVE && (
          <>
            {isExtendable && (
              <Tooltip
                content="Extend Data Sharing Period"
                title={
                  <Link href={extendableUrl} sx={{ display: 'inline-block' }}>
                    <IconButton sx={{ mr: 1 }}>
                      <Calendar color="cta" />
                    </IconButton>
                  </Link>
                }
              />
            )}
            <Tooltip
              content="Revoke Data Access"
              title={
                <IconButton onClick={handleonRevokeClick} sx={{ mr: 1 }}>
                  <Delete color="cta" />
                </IconButton>
              }
            />
          </>
        )}
        <Chip
          label={consent.status}
          size="small"
          sx={{
            color: 'typography.light',
            fontWeight: 600,
            textTransform: 'lowercase',
            '& span:first-letter': {
              textTransform: 'capitalize',
            },
            ...(consent.status === Status.ACTIVE && {
              backgroundColor: 'success.main',
            }),
            ...(consent.status === Status.EXPIRED && {
              backgroundColor: 'warning.main',
            }),
            ...(consent.status === Status.REQUESTED && {
              backgroundColor: 'info.main',
            }),
            ...(consent.status === Status.REVOKED && {
              backgroundColor: 'error.main',
            }),
          }}
        />
      </Box>
    </Box>
  );
};
