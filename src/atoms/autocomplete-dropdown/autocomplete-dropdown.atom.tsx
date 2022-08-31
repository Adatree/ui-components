import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Autocomplete, Avatar, TextField, Typography } from '@mui/material';
import { DataHolder } from '../../generated/consent/api';
import Bank from 'mdi-material-ui/Bank';
import { useCopy } from '../../context/copy.context';

export type CheckboxAccordionProps = {
  dataHolders: DataHolder[];
  defaultValue?: DataHolder;
  label?: string;
  disableDataHolders?: DataHolder[];
  showError?: boolean;
  onChange: (value: DataHolder | null) => void;
};

export const AutocompleteDropdown: React.FC<CheckboxAccordionProps> = (props) => {
  const { dataHolders, label = '', defaultValue = null, disableDataHolders = [], showError = false, onChange } = props;
  const [inputValue, setInputValue] = useState<DataHolder | null>(null);
  const [error, setError] = useState(showError);
  const [copy] = useCopy();

  useEffect(() => {
    if (showError) {
      setError(inputValue === null ? true : false);
    }
  }, [showError]);

  const handleChange = (event: SyntheticEvent<Element, Event>, value: DataHolder | null) => {
    if (event) {
      setInputValue(value);
      onChange(value);
    }
  };

  const handleFocus = () => {
    setError(false);
  };

  const handleBlur = () => {
    setError(inputValue === null ? true : false);
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
        className={error === true ? 'error' : ''}
        sx={{
          backgroundColor: (theme) => theme.palette.background_inputs.main,
          borderRadius: '4px',
          '&.error fieldset': { borderColor: (theme) => theme.palette.error.main },
        }}
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
        renderInput={(params) => (
          <TextField {...params} label={label} sx={{ input: { color: (theme) => theme.palette.text_main.main } }} />
        )}
        onChange={handleChange}
        onBlur={() => handleBlur()}
        onFocus={() => handleFocus()}
      />

      <Typography sx={{ minHeight: '2.2rem' }} variant="body2" color="error.main">
        {error && copy.error.required}
      </Typography>
    </>
  );
};
