import React from 'react';
import { Box, Typography } from '@mui/material';
import { Organisation } from '../../types/organisation.type';

export type PartnerMessageProps = {
  dataHolderName: string;
  organisation: Organisation;
};

export const PartnerMessage: React.FC<PartnerMessageProps> = (props) => {
  const { dataHolderName, organisation } = props;

  return (
    <section>
      <div style={{ textAlign: 'center' }}>
        <Box sx={{ mt: 3, mb: 1 }}>
          <img
            src={organisation.logo}
            alt={organisation.name}
            style={{ maxWidth: '260px', width: '100%', margin: '0 auto' }}
          />
        </Box>
        <Typography sx={{ mb: 1 }}>consent service provided by</Typography>
        <Typography variant="h1" sx={{ mb: 2.5 }}>
          Adatree
        </Typography>
      </div>
      <Box>
        <Typography sx={{ mb: 1 }}>
          <strong>{organisation.name}</strong> use <strong>Adatree</strong> to help you consent and access your data.
        </Typography>
        <Typography sx={{ mt: 1.5, mb: 0 }}>
          <strong>{dataHolderName}</strong> will ask you to share your data with <strong>Adatree</strong> for{' '}
          <strong>{organisation.name}</strong>.
        </Typography>
      </Box>
    </section>
  );
};
