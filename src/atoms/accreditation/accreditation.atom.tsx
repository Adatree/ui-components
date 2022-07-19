import React from 'react';
import { Typography, Box } from '@mui/material';

export type AccreditationProps = {
  accreditationNumber: string;
  cdrPolicyUrl: string;
  companyName: string;
  underCdrPrinciple: boolean;
};

export const Accreditation: React.FC<AccreditationProps> = (props) => {
  const { accreditationNumber, cdrPolicyUrl, companyName, underCdrPrinciple = false } = props;

  const cdrText =
    underCdrPrinciple === true
      ? `Under CDR Principal: ${accreditationNumber}`
      : `Accredited Data Recipient: ${accreditationNumber}`;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mr: 3, width: { xs: '125px', sm: '175px' } }}>
          <img
            src="https://design.adatree.com.au/assets/images/consumer-data-right.png"
            style={{ width: '100%' }}
            alt={cdrText}
          />
        </Box>
        <Box>
          <Typography variant="body2" sx={{ display: 'block', mb: { xs: 0.1, sm: 0.5 } }}>
            {companyName}
          </Typography>
          <a target="_blank" style={{ display: 'block', textDecoration: 'underline' }} href={cdrPolicyUrl}>
            <Typography variant="body2">{cdrText}</Typography>
          </a>{' '}
        </Box>
      </Box>
    </>
  );
};
