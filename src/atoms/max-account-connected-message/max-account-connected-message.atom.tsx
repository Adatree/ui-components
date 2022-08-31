import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { UseCaseResponse } from '../../generated/consent';
import { useCopy } from '../../context/copy.context';

export type PartnerMessageDialogProps = {
  useCase: UseCaseResponse;
  onClick: () => void;
};

export const MaxAccountConnectedMessage: React.FC<PartnerMessageDialogProps> = (props) => {
  const { useCase, onClick } = props;
  const [copy] = useCopy();

  return (
    <Box sx={{ m: 2 }}>
      <Typography sx={{ mb: 2 }} variant={'h2'}>
        {copy.component.max_account_connected_message.title}
      </Typography>
      <Typography sx={{ mb: 2 }}>{copy.component.max_account_connected_message.sub_title}</Typography>
      <Typography>{copy.component.max_account_connected_message.list_label}</Typography>

      {useCase.dataHolders && (
        <ul style={{ padding: '1rem' }}>
          {useCase.dataHolders.map((dataHolder) => (
            <li style={{ listStyle: 'disc', marginLeft: '10px' }} key={dataHolder.dataHolderBrandId}>
              {useCase.name && (
                <Typography variant="body2" sx={{ m: 0.1 }}>
                  {copy.component.max_account_connected_message.list_item(useCase.name, dataHolder.brandName)}
                </Typography>
              )}
            </li>
          ))}
        </ul>
      )}
      <Button sx={{ my: 2, width: { xs: '100%', sm: '20rem' } }} variant="contained" color="button" onClick={onClick}>
        {copy.common.button_label_back}
      </Button>
    </Box>
  );
};
