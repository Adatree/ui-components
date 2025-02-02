import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ConsentCancelButton } from '../../atoms/consent-cancel-button/consent-cancel-button.atom';
import { Accreditation } from '../../atoms/accreditation/accreditation.atom';
import { useDataRecipients } from '../../context/data-recipient.context';
import { DataRecipientType } from '../../types/data-recipient.type';
import { AnalyticsEvents, useAnalytics } from '../../context/analytics.context';

interface Props {
  actionButtonLabel: string;
  cancelButtonLabel: string;
  cancelButtonMessage: string;
  isValid: boolean;
  showError: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export const ConsentSectionActions = (props: Props) => {
  const { actionButtonLabel, cancelButtonLabel, cancelButtonMessage, isValid, showError, onCancel, onSubmit } = props;
  const { accreditationNumber, primaryDataRecipient, adrDataRecipient } = useDataRecipients();
  const { track } = useAnalytics();
  const accreditationName =
    primaryDataRecipient.type === DataRecipientType.CDR_REPRESENTATIVE
      ? primaryDataRecipient.name
      : adrDataRecipient.name;

  const handleSubmit = () => {
    track(AnalyticsEvents.CONSENT_BUTTON_CLICKED);
    onSubmit();
  };

  const handleCancel = () => {
    track(AnalyticsEvents.CONSENT_PAGE_CANCEL_CLICKED);
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
          sx={{ mb: 2, width: { xs: '100%', sm: '17rem' } }}
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
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Accreditation
          accreditationNumber={accreditationNumber}
          companyName={accreditationName}
          underCdrPrincipal={primaryDataRecipient.type === DataRecipientType.CDR_REPRESENTATIVE}
        />
      </Box>
    </>
  );
};
