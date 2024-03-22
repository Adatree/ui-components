import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Card } from '../../atoms/card/card.atom';

export const BusinessConsumerStatement = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Card>
        <Typography>
          The consent is given for the purpose of providing a service to you in your capacity as a business (and not as
          an individual).
        </Typography>
      </Card>
    </Box>
  );
};
