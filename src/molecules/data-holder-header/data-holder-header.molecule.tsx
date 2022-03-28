import React from 'react';
import { Avatar, Box, Chip, IconButton, Link, styled, Tooltip, Typography } from '@mui/material';
import { ConsentResponse, Status } from '../../generated/consent';
import { Formatter } from '../../utils/formatter/formater';
import Bank from 'mdi-material-ui/Bank';
import Delete from 'mdi-material-ui/Delete';
import Calendar from 'mdi-material-ui/Calendar';

const _Chip = styled(Chip)`
  ${({ theme }) => `
    color: ${theme.palette.typography.light};
    font-weight: 600;
    text-transform: lowercase;


    & span:first-letter {
      text-transform: capitalize;
    }

    &.active {
      background-color: ${theme.palette.success.main};
    }

    &.revoked {
      background-color: ${theme.palette.error.main};
    }

    &.requested {
      background-color: ${theme.palette.info.main};
    }

    &.expired {
      background-color: ${theme.palette.warning.main};
    }
  `}
`;

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
      textDate = `Consent granted ${Formatter.formatDate(consent.created)}`;
      break;
    case Status.REQUESTED:
      textDate = `Consent requested ${Formatter.formatDate(consent.created)}`;
      break;
    case Status.EXPIRED:
      textDate = `Consent expired ${Formatter.formatDate(consent.sharingEndDate)}`;
      break;
    case Status.REVOKED:
      textDate = `Consent revoked ${Formatter.formatDate(consent.revoked)}`;
      break;
  }
  const handleonRevokeClick = () => {
    if (onRevokeClick) {
      onRevokeClick();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        alt={consent.dataHolderName}
        src={dataHolderLogoUrl}
        component={'span'}
        sx={{ mr: 2, img: { height: 'auto' } }}
        variant="square"
      >
        <Bank />
      </Avatar>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h2">{consent.dataHolderName}</Typography>
        <Typography>{textDate}</Typography>
      </Box>

      <Box sx={{ ml: 'auto' }}>
        {consent.status === Status.ACTIVE && (
          <>
            {isExtendable && (
              <Tooltip title="Extend Data Sharing Period">
                <Link href={extendableUrl}>
                  <IconButton sx={{ mr: 1 }}>
                    <Calendar color="primary" />
                  </IconButton>
                </Link>
              </Tooltip>
            )}
            <Tooltip title="Revoke Data Access">
              <IconButton onClick={handleonRevokeClick} sx={{ mr: 1 }}>
                <Delete color="primary" />
              </IconButton>
            </Tooltip>
          </>
        )}
        <_Chip label={consent.status} size="small" className={consent.status?.toLowerCase()} />
      </Box>
    </Box>
  );
};
