import React from 'react';
import { Avatar, Box, Chip, IconButton, Link, Typography } from '@mui/material';
import { ConsentResponse, Status } from '../../generated/consent';
import { Formatter } from '../../utils/formatter/formater';
import { Tooltip } from '../../atoms/tooltip/tooltip.atom';
import { Bank, Delete, Pencil } from 'mdi-material-ui';

export type DataHolderHeaderProps = {
  consent: ConsentResponse;
  editUrl?: string;
  onRevokeClick?: () => void;
};

export const DataHolderHeader: React.FC<DataHolderHeaderProps> = (props) => {
  const { consent, editUrl = '', onRevokeClick } = props;

  let textDate = '';
  let granteeName = '';

  if (consent.grantee) {
    granteeName = `for ${consent.grantee.name} `;
  }

  switch (consent.status) {
    case Status.Active:
      textDate = `Consent ${granteeName}granted ${Formatter.formatDateTime(consent.created)}`;
      break;
    case Status.Requested:
      textDate = `Consent ${granteeName}requested ${Formatter.formatDateTime(consent.created)}`;
      break;
    case Status.Expired:
      textDate = `Consent ${granteeName}expired ${Formatter.formatDateTime(consent.sharingEndDate)}`;
      break;
    case Status.Revoked:
      textDate = `Consent ${granteeName}revoked ${Formatter.formatDateTime(consent.revoked)}`;
      break;
  }
  const handleonRevokeClick = () => {
    if (onRevokeClick) {
      onRevokeClick();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box>
        <Avatar
          alt={consent.dataHolderName}
          src={consent.dataHolderLogoUri}
          component={'span'}
          sx={{ mr: 2, img: { height: 'auto' } }}
          variant="square"
        >
          <Bank />
        </Avatar>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          flexBasis: { xs: '100%', sm: 0 },
        }}
      >
        <Typography variant="h2">{consent.dataHolderName}</Typography>
        <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>{textDate}</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: { xs: 1, sm: 'inherit' },
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {consent.status === Status.Active && onRevokeClick && (
          <>
            {editUrl && (
              <Tooltip
                content="Edit consent"
                title={
                  <Link href={editUrl} sx={{ display: 'inline-block' }}>
                    <IconButton sx={{ mr: 1 }}>
                      <Pencil color="button" />
                    </IconButton>
                  </Link>
                }
              />
            )}
            <Tooltip
              content="Revoke Data Access"
              title={
                <IconButton onClick={handleonRevokeClick} sx={{ mr: 1 }}>
                  <Delete color="button" />
                </IconButton>
              }
            />
          </>
        )}
        {consent.status !== Status.Active && (
          <Chip
            label={consent.status}
            size="small"
            sx={{
              color: 'common.white',
              fontWeight: 600,
              fontSize: '1.4rem',
              textTransform: 'lowercase',
              '& span:first-letter': {
                textTransform: 'capitalize',
              },
              ...(consent.status === Status.Expired && {
                backgroundColor: 'warning.main',
              }),
              ...(consent.status === Status.Requested && {
                backgroundColor: 'info.main',
              }),
              ...(consent.status === Status.Revoked && {
                backgroundColor: 'error.main',
              }),
            }}
          />
        )}
      </Box>
    </Box>
  );
};
