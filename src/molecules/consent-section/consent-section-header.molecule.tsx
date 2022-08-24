import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';
import { Organisation } from '../../types/organisation.type';
import { Copy } from '../../types/copy.type';

export type ConsentSectionHeaderProps = {
  copy: Copy;
  dataHolderName: string;
  organisation: Organisation;
};

export const ConsentSectionHeader: React.FC<ConsentSectionHeaderProps> = (props) => {
  const { copy, dataHolderName, organisation } = props;

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
          <Highlight>{organisation.name}</Highlight> {copy.consent.title[0]} <Highlight>{dataHolderName}</Highlight>{' '}
          {copy.consent.title[1]}
        </Typography>
      </Box>
    </>
  );
};
