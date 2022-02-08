import React, { SyntheticEvent } from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { DataHolder } from '../../generated/dcr/api';

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
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={handleChange}
    />
  );
};
