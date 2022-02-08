import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

type RadioButtonItem = {
  label: string;
  value: string;
  disable?: boolean;
};

export type radioButtonWithTextProps = {
  radioButtonItems: RadioButtonItem[];
  label?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
};
export const RadioButtonWithText: React.FC<radioButtonWithTextProps> = (props) => {
  const { label, radioButtonItems, defaultValue = '', onChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      {label && <FormLabel id="radio-buttons-group-label">{label}</FormLabel>}
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue={defaultValue}
        name="radio-buttons-group"
        onChange={handleChange}
      >
        {radioButtonItems.map((item) => {
          const disabled = item.disable ? true : false;
          return (
            <FormControlLabel
              sx={{ m: 0, pl: 1, justifyContent: 'space-between', '&:hover': { backgroundColor: 'highlight.light' } }}
              key={item.value}
              value={item.value}
              control={<Radio disabled={disabled} color="secondary" />}
              label={item.label}
              labelPlacement="start"
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
