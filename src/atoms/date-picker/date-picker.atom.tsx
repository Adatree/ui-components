import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export type DatePickerProps = {
  label: string;
  date?: Date;
  inputFormat?: string;
  onChanage: (data: Date) => void;
};
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { label, date = new Date(), inputFormat = 'dd/MM/yyyy', onChanage } = props;

  const handleChange = (newValue: Date | null) => {
    if (newValue) {
      onChanage(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label={label}
        inputFormat={inputFormat}
        value={date}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
