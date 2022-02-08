import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export type DatePickerProps = {
  label: string;
  date?: Date;
  inputFormat?: string;
  onChange: (data: Date) => void;
};
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { label, date = new Date(), inputFormat = 'dd/MM/yyyy', onChange } = props;
  const [value, setValue] = React.useState<Date | null>(date);

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
        inputFormat={inputFormat}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
