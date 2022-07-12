import React from 'react';
import { Typography, Box, Checkbox, FormControlLabel } from '@mui/material';
import { SharingDuration } from '../../generated/consent';
import { TextBuilder } from '../../utils/text/text-builder';

export type ConfirmationnProps = {
  companyName: string;
  sharingDuration: SharingDuration | undefined;
  endDate: Date | undefined;
  onChange: (checked: boolean) => void;
};

export const Confirmation: React.FC<ConfirmationnProps> = (props) => {
  const { companyName, sharingDuration, endDate, onChange } = props;

  const handleConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    event.stopPropagation();
    onChange(checked);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FormControlLabel
        control={<Checkbox color="cta" onChange={handleConfirmationChange} />}
        label={<Typography>{TextBuilder.confirmation(companyName, endDate, sharingDuration)}</Typography>}
      />
    </Box>
  );
};
