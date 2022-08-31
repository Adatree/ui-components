import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';
import { Organisation } from '../../types/organisation.type';
import { useCopy } from '../../context/copy.context';

export type ConsentSectionHeaderProps = {
  dataHolderName: string;
  organisation: Organisation;
};

export const ConsentSectionHeader: React.FC<ConsentSectionHeaderProps> = (props) => {
  const { dataHolderName, organisation } = props;
  const [copy] = useCopy();

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
