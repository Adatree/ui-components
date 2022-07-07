import React, { SyntheticEvent, useState } from 'react';
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
  const { dataHolders, label = '', defaultValue = null, disableDataHolders = [], onChange } = props;
  const [inputValue, setInputValue] = useState<DataHolder | null>(null);
  const [isInputError, setIsInputError] = useState(false);

  const handleChange = (event: SyntheticEvent<Element, Event>, value: DataHolder | null) => {
    if (event) {
      setInputValue(value);
      onChange(value);
    }
  };

  const handleFocus = () => {
    setIsInputError(false);
  };

  const handleBlur = () => {
    setIsInputError(inputValue === null ? true : false);
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
    <>
      <Autocomplete
        disablePortal
        className={isInputError === true ? 'error' : ''}
        sx={{ backgroundColor: '#fff', '&.error fieldset': { borderColor: 'error.main' } }}
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
        onBlur={() => handleBlur()}
        onFocus={() => handleFocus()}
      />
      {isInputError && (
        <Typography variant="body2" color="error.main">
          This field is required.
        </Typography>
      )}
    </>
  );
};
