import * as React from 'react';
import { Alert, AlertColor, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

export interface Props {
  alertSeverity: AlertColor;
  alertMessage: string;
  inputErrorMessage: string;
  inputLabel: string;
  inputType?: string;
  isLoading: boolean;
  primaryLabel: string;
  primaryOnClick: (value: string) => void;
  secondaryLabel?: string;
  secondaryMessage?: string;
  secondaryOnClick?: () => void;
  fullWidth?: boolean;
}

export const AlertInputFrom = (props: Props) => {
  const {
    alertSeverity,
    alertMessage,
    inputErrorMessage,
    inputLabel,
    inputType = 'text',
    isLoading,
    primaryLabel,
    primaryOnClick,
    secondaryLabel,
    secondaryMessage,
    secondaryOnClick,
    fullWidth = true,
  } = props;
  const [inputValue, setInputValue] = useState('');
  const [isInputError, setIsInputError] = useState(!!inputErrorMessage);
  const [errorMessage, setErrorMessage] = useState(inputErrorMessage);

  return (
    <Box sx={{ maxWidth: '50rem', m: '0 auto' }}>
      <Stack alignItems="center">
        <Alert sx={{ m: 2, width: '100%' }} severity={alertSeverity}>
          {alertMessage}
        </Alert>
        <TextField
          sx={{ m: 2, width: fullWidth ? '100%' : 'auto' }}
          label={inputLabel}
          type={inputType}
          variant="outlined"
          value={inputValue}
          helperText={errorMessage}
          error={isInputError}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => {
            setIsInputError(false);
            setErrorMessage('');
          }}
        />
        <LoadingButton
          sx={{ m: 2, maxWidth: '20rem' }}
          loading={isLoading}
          variant="contained"
          onClick={() => primaryOnClick(inputValue)}
        >
          {primaryLabel}
        </LoadingButton>

        {secondaryOnClick && secondaryLabel && (
          <>
            <Button sx={{ m: 2, mt: 6 }} variant="outlined" color="inherit" onClick={secondaryOnClick}>
              {secondaryLabel}
            </Button>
            <Typography variant="body2">{secondaryMessage}</Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};
