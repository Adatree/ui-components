import React, { SyntheticEvent } from 'react';
import { Autocomplete, Avatar, Box, TextField, Typography } from '@mui/material';
import { DataHolder } from '../../generated/dcr/api';
import Bank from 'mdi-material-ui/Bank';

export type CheckboxAccordionProps = {
  dataHolders: DataHolder[];
  label?: string;
  onChange: (value: DataHolder | null) => void;
};

export const AutocompleteDropdown: React.FC<CheckboxAccordionProps> = (props) => {
  const { dataHolders, label = 'Choose your bank', onChange } = props;

  const handleChange = (event: SyntheticEvent<Element, Event>, value: DataHolder | null) => {
    if (event) {
      onChange(value);
    }
  };

  return (
    <Autocomplete
      disablePortal
      options={dataHolders}
      getOptionLabel={(option) => option.brandName}
      renderOption={(props, option) => (
        <Typography {...props} variant="body1" key={option.dataHolderBrandId} sx={{ display: 'flex' }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" component={'span'} sx={{ mr: 2 }}>
            <Bank />
          </Avatar>
          {option.brandName}
        </Typography>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={handleChange}
    />
  );
};
