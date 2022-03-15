import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Div = styled('div')({
  display: 'grid',
  gridTemplateColumns: '13rem auto',
  gridTemplateAreas: `"logo ." "logo ."`,
  '& > :first-child': 'grid-area: logo;',
});

export type InfoCDRProps = {
  companyName: string;
  accreditationNumber: string;
};

export const InfoCdrStep = (props: InfoCDRProps) => {
  const { companyName, accreditationNumber } = props;

  return (
    <section>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Share data with the Consumer Data Right
      </Typography>

      <Typography sx={{ mb: 2 }}>
        You can connect us with your bank via the{' '}
        <a style={{ textDecoration: 'underline' }} href="https://www.cdr.gov.au/">
          Consumer Data Right
        </a>
        . It's quick, safe, accurate and Government regulated.
      </Typography>

      <Div sx={{ mb: 2, gridGap: { xs: '0 10px', md: '0 20px', lg: '0 50px' } }}>
        <img
          src="https://design.adatree.com.au/assets/images/consumer-data-right.png"
          style={{ width: '100%' }}
          alt="Consumer Data Right Adatree Pty Ltd Accredited Data Recipient ADRBNK000071"
        />
        <Box>
          <Typography variant="body2">{companyName}</Typography>
          <Typography variant="body2">Accredited Data Recipient: {accreditationNumber}</Typography>
        </Box>
      </Div>
      <Typography className="margin-bt-md">
        We are an Accredited Consumer Data Right Recipient, meaning we are bound by rules set by the Australian
        Government on how we can handle your data.
      </Typography>
      <Typography className="margin-bt-md">
        Learn more about this on{' '}
        <a style={{ textDecoration: 'underline' }} href="https://www.cdr.gov.au/">
          cdr.gov.au
        </a>
      </Typography>
    </section>
  );
};
