import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Grantee, Status } from '@adatree/react-api-sdk-dashboard';
import { Card } from '../../atoms/card/card.atom';

interface Props {
  gantee: Grantee;
  status?: Status;
}

export const GranteeSummary = (props: Props) => {
  const { gantee, status } = props;

  let text = gantee.name;

  switch (status) {
    case Status.Active:
      text = `${gantee.name} has your consent to access your data.`;
      break;
    case Status.Requested:
      text = `Your consent for ${gantee.name} to access your data is being processed.`;
      break;
    case Status.Expired:
      text = `Your consent for ${gantee.name} to access your data has expired.`;
      break;
    case Status.Revoked:
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
