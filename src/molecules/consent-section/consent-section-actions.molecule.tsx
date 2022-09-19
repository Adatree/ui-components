import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ConsentCancelButton } from '../../atoms/consent-cancel-button/consent-cancel-button.atom';
import { Accreditation } from '../../atoms/accreditation/accreditation.atom';
import { useDataRecipients } from '../../context/data-recipient.context';

export type ConsentSectionActionsProps = {
  actionButtonLabel: string;
  cancelButtonLabel: string;
  cancelButtonMessage: string;
  isValid: boolean;
  showError: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentSectionActions: React.FC<ConsentSectionActionsProps> = (props) => {
  const { actionButtonLabel, cancelButtonLabel, cancelButtonMessage, isValid, showError, onCancel, onSubmit } = props;
  const { primaryDataRecipient } = useDataRecipients();

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
          {actionButtonLabel}
        </Button>
        <ConsentCancelButton label={cancelButtonLabel} dialogText={cancelButtonMessage} onCancel={handleCancel} />
      </Box>
      <Typography sx={{ mb: 3, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && !isValid && 'Please fix the error(s) above.'}
      </Typography>
      <Box sx={{ p: 2, m: 1, display: 'flex', justifyContent: 'center' }}>
        <Accreditation
          accreditationNumber={primaryDataRecipient.accreditationNumber}
          cdrPolicyUrl={primaryDataRecipient.cdrPolicyUrl}
          companyName={primaryDataRecipient.name}
          underCdrPrincipal={primaryDataRecipient.underCdrPrincipal}
        />
      </Box>
    </>
  );
};
