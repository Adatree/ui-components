import React from 'react';
import { Box, Button } from '@mui/material';
import { Helper } from '../../utils/helper/helper';
import { DateDuration } from '../../consts/duration.const';
import { SharingDuration } from '../../generated/consent/api';

export type DateButtonProps = {
  sharingDurations: SharingDuration[];
  selectedSharingDuration?: SharingDuration;
  disabled?: boolean;
  onClick: (date: Date, selected: SharingDuration) => void;
};

export const DateButton: React.FC<DateButtonProps> = (props) => {
  const { sharingDurations: sharingDuration, selectedSharingDuration, disabled = false, onClick } = props;
  const dateDurations = Helper.parseSharingDurations(sharingDuration);

  const handleClick = (duration: DateDuration) => {
    onClick(Helper.dateDurationToDate(duration), duration.type);
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
            color={duration.type === selectedSharingDuration ? 'button' : 'inherit'}
            sx={{ mr: '4px', mb: 1, width: { xs: 'calc(50% - 4px)', sm: 'inherit' } }}
          >
            {duration.text}
          </Button>
        );
      })}
    </Box>
  );
};
