import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { UseCaseResponse } from '../../generated/consent';

export type PartnerMessageDialogProps = {
  useCase: UseCaseResponse;
  onClick: () => void;
};

export const MaxAccountConnectedMessage: React.FC<PartnerMessageDialogProps> = (props) => {
  const { useCase, onClick } = props;

  return (
    <Box sx={{ m: 2 }}>
      <Typography sx={{ mb: 2 }} variant={'h2'}>
        Sorry but you are unable to create a new consent.
      </Typography>
      <Typography sx={{ mb: 2 }}>You have already connected all of your available accounts.</Typography>
      <Typography>You currently have the following active consents:</Typography>

      {useCase.dataHolders && (
        <ul style={{ padding: '1rem' }}>
          {useCase.dataHolders.map((dataHolder) => (
            <li style={{ listStyle: 'disc', marginLeft: '10px' }} key={dataHolder.dataHolderBrandId}>
              <Typography variant="body2" sx={{ m: 0.1 }}>
                {useCase.name} consent with {dataHolder.brandName}.
              </Typography>
            </li>
          ))}
        </ul>
      )}
      <Button sx={{ my: 2, width: { xs: '100%', sm: '20rem' } }} variant="contained" color="button" onClick={onClick}>
        Back
      </Button>
    </Box>
  );
};
