import React from 'react';
import { Box, Button } from '@mui/material';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';

type DateOption = {
  unit: 'd' | 'w' | 'm' | 'y';
  value: number;
  isChecked?: boolean;
};

export type DateButtonProps = {
  dateOptions: DateOption[];
  onClick: (date: Date) => void;
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
  const { dateOptions, onClick } = props;

  const handleClick = (dateOption: DateOption) => {
    const curDate = new Date();
    let newDate = new Date();

    if (dateOption.unit === 'd') {
      newDate = addDays(curDate, dateOption.value);
    } else if (dateOption.unit === 'w') {
      newDate = addWeeks(curDate, dateOption.value);
    } else if (dateOption.unit === 'm') {
      newDate = addMonths(curDate, dateOption.value);
    } else if (dateOption.unit === 'y') {
      newDate = addYears(curDate, dateOption.value);
    }

    onClick(newDate);
  };

  return (
    <Box sx={{ flexWrap: 'wrap', display: 'inline-flex' }}>
      {dateOptions.map((dateOption) => {
        return (
          <Button
            onClick={() => handleClick(dateOption)}
            variant="outlined"
            key={`${dateOption.unit}-${dateOption.value}`}
            sx={{ mr: 1, mb: 1 }}
          >
            {getDateString(dateOption)}
          </Button>
        );
      })}
    </Box>
  );
};
