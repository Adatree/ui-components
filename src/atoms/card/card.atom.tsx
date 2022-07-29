import React, { ReactNode } from 'react';
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

interface CardProps extends MuiCardProps {
  children: ReactNode;
  error?: boolean;
}

export const Card: React.FC<CardProps> = (props) => {
  const { children, error = false, sx } = props;

  return (
    <MuiCard
      sx={{
        p: 2,
        border: '1px Solid',
        borderColor: (theme) => theme.palette.background_card.main,
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
