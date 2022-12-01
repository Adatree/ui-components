import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Grantee, Status } from '../../generated/consent/api';
import { Card } from '../../atoms/card/card.atom';

export type GranteeSummaryProps = {
  gantee: Grantee;
  status?: Status;
};

export const GranteeSummary: React.FC<GranteeSummaryProps> = (props) => {
  const { gantee, status } = props;

  let text = gantee.name;

  switch (status) {
    case Status.ACTIVE:
      text = `${gantee.name} has your consent to access your data.`;
      break;
    case Status.REQUESTED:
      text = `Your consent for ${gantee.name} to access your data is being processed.`;
      break;
    case Status.EXPIRED:
      text = `Your consent for ${gantee.name} to access your data has expired.`;
      break;
    case Status.REVOKED:
      text = `Your consent for ${gantee.name} to access has been revoked.`;
      break;
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Who has access to my data
      </Typography>
      <Card>{text}</Card>
    </Box>
  );
};
