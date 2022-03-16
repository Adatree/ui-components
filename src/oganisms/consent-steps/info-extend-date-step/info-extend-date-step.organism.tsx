import React from 'react';
import CSS from 'csstype';
import { Typography } from '@mui/material';

export const InfoExtendDateStep = () => {
  const olStyles: CSS.Properties = {
    marginLeft: '24px',
    listStyle: 'decimal',
    listStylePosition: 'outside',
  };

  const ilStyles: CSS.Properties = {
    paddingLeft: '8px',
    marginBottom: '8px',
  };

  return (
    <section>
      <Typography variant="h2" sx={{ mb: 3 }}>
        How it works
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        To extend your data sharing period, we'll ask you to:
      </Typography>

      <ol style={olStyles}>
        <li style={ilStyles}>
          <strong>Consent</strong> to continue sharing your data with us for the new sharing period
        </li>
        <li style={ilStyles}>
          <strong>Connect</strong> to your bank (we don't see this information)
        </li>
        <li style={ilStyles}>
          <strong>Confirm</strong> with your bank that you'll continue sharing data with us
        </li>
      </ol>

      <Typography variant="body1" sx={{ my: 3 }}>
        This should only take a few minutes and we will guide you through each step.
      </Typography>
    </section>
  );
};
