import React from 'react';
import { Box, Button } from '@mui/material';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';
import { Helper } from '../../utils/helper/helper';

export type DateDuration = {
  unit: 'd' | 'w' | 'm' | 'y';
  value: number;
  isSelected?: boolean;
};

export type DateButtonProps = {
  dateDurations: DateDuration[];
  disabled?: boolean;
  onClick: (date: Date, dateDurations: DateDuration[]) => void;
};

const getDateString = (dateDuration: DateDuration): string => {
  const pural = dateDuration.value > 1 ? 's' : '';
  let dateString = '';

  if (dateDuration.unit === 'd') {
    dateString = 'day';
  } else if (dateDuration.unit === 'w') {
    dateString = 'week';
  } else if (dateDuration.unit === 'm') {
    dateString = 'month';
  } else if (dateDuration.unit === 'y') {
    dateString = 'year';
  }

  return `${dateDuration.value} ${dateString}${pural}`;
};

export const DateButton: React.FC<DateButtonProps> = (props) => {
  const { dateDurations, disabled = false, onClick } = props;

  const handleClick = (duration: DateDuration, index: number) => {
    // Clear and hightlight the new date button
    const newDuration = Helper.unselectDateDurations(dateDurations);
    newDuration[index].isSelected = true;

    // Return the new date
    const curDate = new Date();
    let newDate = new Date();

    if (duration.unit === 'd') {
      newDate = addDays(curDate, duration.value);
    } else if (duration.unit === 'w') {
      newDate = addWeeks(curDate, duration.value);
    } else if (duration.unit === 'm') {
      newDate = addMonths(curDate, duration.value);
    } else if (duration.unit === 'y') {
      newDate = addYears(curDate, duration.value);
    }

    onClick(newDate, newDuration);
  };

  return (
    <Box sx={{ flexWrap: 'wrap', display: 'inline-flex', width: { xs: '100%', sm: 'inherit' } }}>
      {dateDurations.map((duration, index) => {
        return (
          <Button
            onClick={() => handleClick(duration, index)}
            variant={duration.isSelected ? 'contained' : 'outlined'}
            disabled={disabled}
            key={`${duration.unit}-${duration.value}`}
            color={duration.isSelected ? 'secondary' : 'inherit'}
            sx={{ mr: '4px', mb: 1, width: { xs: 'calc(50% - 4px)', sm: 'inherit' } }}
          >
            {getDateString(duration)}
          </Button>
        );
      })}
    </Box>
  );
};
