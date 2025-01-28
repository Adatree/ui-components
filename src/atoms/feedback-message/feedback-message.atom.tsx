import { Box, CircularProgress, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
  message: string;
  showSpinner?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

export const FeedbackMessage = (props: Props) => {
  const { message, icon, children, showSpinner = false } = props;
  return (
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      {showSpinner && <CircularProgress sx={{ m: 1, color: 'primary.main' }} aria-label="Loading" />}
      {!showSpinner && icon}
      <Typography variant="body1" sx={{ m: 3 }}>
        {message}
      </Typography>
      {children}
    </Box>
  );
};
