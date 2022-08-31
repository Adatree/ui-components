import React from 'react';
import { Typography, Box } from '@mui/material';
import { LinkExternal } from '../links/link-external.atom';
import { useCopy } from '../../context/copy.context';

export type AccreditationProps = {
  accreditationNumber: string;
  cdrPolicyUrl: string;
  companyName: string;
  underCdrPrincipal: boolean;
};

export const Accreditation: React.FC<AccreditationProps> = (props) => {
  const { accreditationNumber, cdrPolicyUrl, companyName, underCdrPrincipal = false } = props;
  const [copy] = useCopy();

  const cdrText =
    underCdrPrincipal === true
      ? `${copy.common.cdr_principal_label} ${accreditationNumber}`
      : `${copy.common.accredited_recipient_label} ${accreditationNumber}`;

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
          <Typography variant="body2">
            <LinkExternal href={cdrPolicyUrl} text={cdrText} />
          </Typography>
        </Box>
      </Box>
    </>
  );
};
