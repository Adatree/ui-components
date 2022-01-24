import React from 'react';
import { Stack, Typography } from '@mui/material';
import { IconWithText } from '../../../atoms/icon-with-text/icon-with-text.atom';

export const InfoHowItWorksStep = () => {
  return (
    <section>
      <Typography variant="h2" sx={{ mb: 3 }}>
        How it works
      </Typography>
      <Stack justifyContent="center" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 4, sm: 6, md: 8 }}>
        <IconWithText
          icon={'CheckboxMultipleMarked'}
          title={'You Consent'}
          text={'to share your information with us'}
        />
        <IconWithText icon={'BankCheck'} title={'You Confirm'} text={'with your bank that you want to share it'} />
        <IconWithText icon={'Connection'} title={'We Connect'} text={'to your bank securely using Open Banking'} />
        <IconWithText icon={'CloudLock'} title={'We Collect'} text={'your information and keep it safe'} />
      </Stack>
    </section>
  );
};
