import React from 'react';
import { ToggleButton, ToggleButtonGroup, Stack, Typography } from '@mui/material';
import { useDateTimePreference } from '../../context/date-time-preference.context';
import { DateTimePreference } from '../../types/date-time.type';

interface Props {
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export const DateTimePreferenceToggle = ({ size = 'small', showLabel = true }: Props) => {
  const { preference, setPreference } = useDateTimePreference();

  const handleChange = (_: React.MouseEvent<HTMLElement>, next: DateTimePreference | null) => {
    if (next) setPreference(next);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {showLabel && (
        <Typography variant="body2" color="text.secondary">
          Display dates as
        </Typography>
      )}
      <ToggleButtonGroup value={preference} exclusive onChange={handleChange} size={size}>
        <ToggleButton value="local">Local</ToggleButton>
        <ToggleButton value="utc">UTC</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};
