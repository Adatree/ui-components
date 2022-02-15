import React from 'react';
import { Avatar, Box, Chip, IconButton, styled, Tooltip, Typography } from '@mui/material';
import { ConsentResponse, Status } from '../../generated/consent';
import { Formatter } from '../../utils/formatter/formater';
import Bank from 'mdi-material-ui/Bank';
import Delete from 'mdi-material-ui/Delete';
import Calendar from 'mdi-material-ui/Calendar';

const _Chip = styled(Chip)`
  ${({ theme }) => `
    color: ${theme.palette.highlight.light};
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
  isExtendable?: boolean;
  extendableUrl?: string;
  onRevokeClick: () => void;
};

export const DataHolderHeader: React.FC<DataHolderHeaderProps> = (props) => {
  const { consent, isExtendable = false, extendableUrl = '', onRevokeClick } = props;

  const handleonRevokeClick = () => {
    if (onRevokeClick) {
      onRevokeClick();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar alt={consent.dataHolderName} src={`/consent.dataHolderBrandId.png`} component={'span'} sx={{ mr: 2 }}>
        <Bank />
      </Avatar>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h2">{consent.dataHolderName}</Typography>
        <Typography>
          {consent.status === Status.REVOKED
            ? `Revoked at ${Formatter.formatDate(consent.revoked)}`
            : `Consent granted at ${Formatter.formatDate(consent.created)}`}
        </Typography>
      </Box>

      <Box sx={{ ml: 'auto' }}>
        {consent.status === Status.ACTIVE && (
          <>
            {isExtendable && (
              <Tooltip title="Extend Data Sharing Period">
                <IconButton href={extendableUrl} sx={{ mr: 1 }}>
                  <Calendar color="secondary" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Revoke Data Access">
              <IconButton onClick={handleonRevokeClick} sx={{ mr: 1 }}>
                <Delete color="secondary" />
              </IconButton>
            </Tooltip>
          </>
        )}
        <_Chip label={consent.status} size="small" className={consent.status?.toLowerCase()} />
      </Box>
    </Box>
  );
};
