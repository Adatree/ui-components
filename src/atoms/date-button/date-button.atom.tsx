import React from 'react';
import { Box, Button } from '@mui/material';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';
import { Helper } from '../../utils/helper/helper';

export type DateOption = {
  unit: 'd' | 'w' | 'm' | 'y';
  value: number;
  isSelected?: boolean;
};

export type DateButtonProps = {
  dateOptions: DateOption[];
  disabled?: boolean;
  onClick: (date: Date, dateOptions: DateOption[]) => void;
};

const getDateString = (dateOption: DateOption): string => {
  const pural = dateOption.value > 1 ? 's' : '';
  let dateString = '';

  if (dateOption.unit === 'd') {
    dateString = 'day';
  } else if (dateOption.unit === 'w') {
    dateString = 'week';
  } else if (dateOption.unit === 'm') {
    dateString = 'month';
  } else if (dateOption.unit === 'y') {
    dateString = 'year';
  }

  return `${dateOption.value} ${dateString}${pural}`;
};

export const DateButton: React.FC<DateButtonProps> = (props) => {
  const { dateOptions, disabled = false, onClick } = props;

  const handleClick = (option: DateOption, index: number) => {
    // Clear and hightlight the new date button
    const newOptions = Helper.clearDateOptions(dateOptions);
    newOptions[index].isSelected = true;

    // Return the new date
    const curDate = new Date();
    let newDate = new Date();

    if (option.unit === 'd') {
      newDate = addDays(curDate, option.value);
    } else if (option.unit === 'w') {
      newDate = addWeeks(curDate, option.value);
    } else if (option.unit === 'm') {
      newDate = addMonths(curDate, option.value);
    } else if (option.unit === 'y') {
      newDate = addYears(curDate, option.value);
    }

    onClick(newDate, newOptions);
  };

  return (
    <Box sx={{ flexWrap: 'wrap', display: 'inline-flex' }}>
      {dateOptions.map((option, index) => {
        return (
          <Button
            onClick={() => handleClick(option, index)}
            variant={option.isSelected ? 'contained' : 'outlined'}
            disabled={disabled}
            key={`${option.unit}-${option.value}`}
            color={option.isSelected ? 'secondary' : 'inherit'}
            sx={{ mr: 1, mb: 1 }}
          >
            {getDateString(option)}
          </Button>
        );
      })}
    </Box>
  );
};
