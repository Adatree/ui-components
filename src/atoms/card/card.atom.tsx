import React, { ReactNode } from 'react';
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

interface Props extends MuiCardProps {
  children: ReactNode;
  error?: boolean;
}

export const Card = (props: Props) => {
  const { children, error = false, sx } = props;

  return (
    <MuiCard
      sx={{
        p: 2,
        border: '1px Solid',
        borderColor: (theme) => theme.palette.background_card.main,
        boxShadow: '0 1px 2px rgba(0,0,0,.1)',
        '&.error': { borderColor: 'error.main' },
        ...sx,
      }}
      className={error === true ? 'error' : ''}
      elevation={0}
    >
      {children}
    </MuiCard>
  );
};
