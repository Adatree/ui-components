import React from 'react';
import { Box, Typography } from '@mui/material';
import { Organisation } from '../../types/organisation.type';
import { Highlight } from '../highlight-text/highlight-text.atom';

export type PartnerMessageProps = {
  dataHolderName: string;
  organisation: Organisation;
  discreetMode?: boolean;
};

export const PartnerMessage: React.FC<PartnerMessageProps> = (props) => {
  const { dataHolderName, organisation, discreetMode = false } = props;

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
        {!discreetMode && <Typography sx={{ mb: 1 }}>consent service provided by</Typography>}
        <Typography variant="h1" sx={{ mb: 2.5, fontSize: discreetMode === true ? '1.8rem' : '3rem' }}>
          Adatree
        </Typography>
      </div>
      <Box>
        <Typography sx={{ mb: 1 }}>
          <Highlight>{organisation.name}</Highlight> use <Highlight>Adatree</Highlight> to help you consent and access
          your data.
        </Typography>
        <Typography sx={{ mt: 1.5, mb: 0 }}>
          <Highlight>{dataHolderName}</Highlight> will ask you to share your data with <Highlight>Adatree</Highlight>{' '}
          for <Highlight>{organisation.name}</Highlight>.
        </Typography>
      </Box>
    </section>
  );
};
