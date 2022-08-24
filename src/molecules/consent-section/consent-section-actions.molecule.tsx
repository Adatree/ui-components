import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Organisation } from '../../types/organisation.type';
import { ConsentCancelButton } from '../../atoms/consent-cancel-button/consent-cancel-button.atom';
import { Accreditation } from '../../atoms/accreditation/accreditation.atom';
import { Copy } from '../../types/copy.type';

export type ConsentSectionActionsProps = {
  copy: Copy;
  organisation: Organisation;
  isValid: boolean;
  showError: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentSectionActions: React.FC<ConsentSectionActionsProps> = (props) => {
  const { copy, organisation, isValid, showError, onCancel, onSubmit } = props;

  const handleSubmit = () => {
    onSubmit();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row-reverse' },
        }}
      >
        <Button
          sx={{ mb: 2, width: { xs: '100%', sm: '20rem' } }}
          variant="contained"
          color={isValid === true ? 'button' : 'inherit'}
          onClick={handleSubmit}
        >
          Consent
        </Button>
        <ConsentCancelButton dialogText={copy.consent.cancelMessage} onCancel={handleCancel} />
      </Box>
      <Typography sx={{ mb: 3, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && 'Please fix the error(s) above.'}
      </Typography>
      <Box sx={{ p: 2, m: 1, display: 'flex', justifyContent: 'center' }}>
        <Accreditation
          accreditationNumber={organisation.accreditationNumber}
          cdrPolicyUrl={organisation.cdrPolicyUrl}
          companyName={organisation.name}
          underCdrPrincipal={organisation.underCdrPrincipal}
        />
      </Box>
    </>
  );
};
