import React from 'react';
import { Box, Button } from '@mui/material';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';
import { Helper } from '../../utils/helper/helper';
import { DateDuration } from '../../consts/duration.const';
import { SharingDuration } from '../../generated/consent/api';

export type DateButtonProps = {
  sharingDuration: SharingDuration[];
  selectedSharingDuration?: SharingDuration;
  disabled?: boolean;
  onClick: (date: Date, selected: SharingDuration) => void;
};

export const DateButton: React.FC<DateButtonProps> = (props) => {
  const { sharingDuration, selectedSharingDuration, disabled = false, onClick } = props;
  const dateDurations = Helper.parseSharingDuration(sharingDuration);

  const handleClick = (duration: DateDuration) => {
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

    onClick(newDate, duration.type);
  };

  return (
    <Box sx={{ flexWrap: 'wrap', display: 'inline-flex', width: { xs: '100%', sm: 'inherit' } }}>
      {dateDurations.map((duration) => {
        if (duration.unit === 'na') return;

        return (
          <Button
            onClick={() => handleClick(duration)}
            variant={duration.type === selectedSharingDuration ? 'contained' : 'outlined'}
            disabled={disabled}
            key={`${duration.unit}-${duration.value}`}
            color={duration.type === selectedSharingDuration ? 'cta' : 'inherit'}
            sx={{ mr: '4px', mb: 1, width: { xs: 'calc(50% - 4px)', sm: 'inherit' } }}
          >
            {duration.text}
          </Button>
        );
      })}
    </Box>
  );
};
