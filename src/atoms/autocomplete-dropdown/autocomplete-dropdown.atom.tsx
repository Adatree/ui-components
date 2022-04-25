import React, { SyntheticEvent } from 'react';
import { Autocomplete, Avatar, TextField, Typography } from '@mui/material';
import { DataHolder } from '../../generated/consent/api';
import Bank from 'mdi-material-ui/Bank';

export type CheckboxAccordionProps = {
  dataHolders: DataHolder[];
  defaultValue?: DataHolder;
  label?: string;
  disableDataHolders?: DataHolder[];
  onChange: (value: DataHolder | null) => void;
};

export const AutocompleteDropdown: React.FC<CheckboxAccordionProps> = (props) => {
  const { dataHolders, label = 'Choose your bank', defaultValue = null, disableDataHolders = [], onChange } = props;

  const handleChange = (event: SyntheticEvent<Element, Event>, value: DataHolder | null) => {
    if (event) {
      onChange(value);
    }
  };

  const isDisabled = (option: DataHolder): boolean => {
    if (disableDataHolders.some((dataHolder) => dataHolder.dataHolderBrandId === option.dataHolderBrandId)) {
      return true;
    }
    return false;
  };

  const getLabel = (option: DataHolder): string => {
    if (isDisabled(option)) {
      return `${option.brandName}  ( Consent active  )`;
    }
    return option.brandName;
  };

  return (
    <Autocomplete
      disablePortal
      options={dataHolders}
      getOptionLabel={(option) => option.brandName}
      getOptionDisabled={(option) => {
        return isDisabled(option);
      }}
      isOptionEqualToValue={(option, value) => option.dataHolderBrandId === value.dataHolderBrandId}
      defaultValue={defaultValue}
      renderOption={(props, option) => (
        <Typography {...props} variant="body1" key={option.dataHolderBrandId} sx={{ display: 'flex' }}>
          <Avatar
            alt="Logo"
            src={option.logoUri}
            component={'span'}
            sx={{ mr: 2, img: { height: 'auto' } }}
            variant="square"
          >
            <Bank />
          </Avatar>
          {getLabel(option)}
        </Typography>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={handleChange}
    />
  );
};
