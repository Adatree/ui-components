import React from 'react';
import { Avatar, Box, Chip, IconButton, Link, Typography } from '@mui/material';
import { ConsentResponse, Status } from '../../generated/consent';
import { Formatter } from '../../utils/formatter/formater';
import { Tooltip } from '../../atoms/tooltip/tooltip.atom';
import Bank from 'mdi-material-ui/Bank';
import Delete from 'mdi-material-ui/Delete';
import Pencil from 'mdi-material-ui/Pencil';

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
    granteeName = `to ${consent.grantee.name} `;
  }

  switch (consent.status) {
    case Status.ACTIVE:
      textDate = `Consent ${granteeName}granted ${Formatter.formatDateTime(consent.created)}`;
      break;
    case Status.REQUESTED:
      textDate = `Consent ${granteeName}requested ${Formatter.formatDateTime(consent.created)}`;
      break;
    case Status.EXPIRED:
      textDate = `Consent ${granteeName}expired ${Formatter.formatDateTime(consent.sharingEndDate)}`;
      break;
    case Status.REVOKED:
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
        {consent.status === Status.ACTIVE && onRevokeClick && (
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
        {consent.status !== Status.ACTIVE && (
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
        )}
      </Box>
    </Box>
  );
};
