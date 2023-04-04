import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useCopy } from '../../context/copy.context';

export type ConsentSectionHeaderProps = {
  dataHolderName: string;
  subTitle?: string;
};

export const ConsentSectionHeader: React.FC<ConsentSectionHeaderProps> = (props) => {
  const { dataHolderName, subTitle } = props;
  const [copy] = useCopy();

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
          {copy.consent.create.title(dataHolderName)}
        </Typography>
        {subTitle && (
          <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="body2">
            {subTitle}
          </Typography>
        )}
      </Box>
    </>
  );
};
