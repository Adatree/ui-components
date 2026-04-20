import React from 'react';
import { Typography, Box, Checkbox, FormControlLabel } from '@mui/material';
import { TextBuilder } from '../../utils/text/text-builder';
import { SharingDuration } from '@adatree/react-api-sdk-dashboard';
import { DataRecipient } from '../../types/data-recipient.type';

interface Props {
  dataRecipient: DataRecipient;
  sharingDuration: SharingDuration | undefined;
  endDate: Date | undefined;
  onChange: (checked: boolean) => void;
}

export const Confirmation = (props: Props) => {
  const { dataRecipient, sharingDuration, endDate, onChange } = props;

  const handleConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    event.stopPropagation();
    onChange(checked);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FormControlLabel
        control={<Checkbox color="button" onChange={handleConfirmationChange} />}
        label={<Typography>{TextBuilder.confirmation(dataRecipient, endDate, sharingDuration)}</Typography>}
      />
    </Box>
  );
};
