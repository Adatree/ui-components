import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export type DatePickerProps = {
  label: string;
  date?: Date;
  inputFormat?: string;
  disabled?: boolean;
  onChange: (data: Date) => void;
};
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { label, date = null, inputFormat = 'dd/MM/yyyy', disabled = false, onChange } = props;
  const [value, setValue] = useState<Date | null>(date);

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  useEffect(() => {
    setValue(date);
  }, [props.date, setValue]);

  const handleChange = (newValue: Date | null) => {
    if (newValue) {
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label={label}
        minDate={new Date()}
        maxDate={maxDate}
        inputFormat={inputFormat}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} sx={{ input: { color: (theme) => theme.palette.text_main.main } }} />
        )}
      />
    </LocalizationProvider>
  );
};
