import React, { useState } from 'react';
import { ConsentResponse, Status, UseCaseResponse } from '../../generated/consent';
import { useConsentForm } from '../../context/consentForm.context';
import { ConsentSectionInfo } from '../../molecules/consent-section/consent-section-info.molecule';
import { ConsentSectionActions } from '../../molecules/consent-section/consent-section-actions.molecule';
import { PartnerMessageDialog } from '../../molecules/partner-message-dialog/partner-message-dialog.molecule';
import { Alert, Box, Button, Typography } from '@mui/material';
import { useCopy } from '../../context/copy.context';
import { useDataRecipients } from '../../context/data-recipient.context';
import { DataRecipientType } from '../../types/data-recipient.type';
import { ConsentSectionScopes } from '../../molecules/consent-section/consent-section-scopes.molecule';
import { ConsentEditPostUsage } from './consent-edit-post-usage.organism';
import { ConsentEditDates } from './consent-edit-dates.organism';

export type ConsentEditProps = {
  consent: ConsentResponse;
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentEdit = (props: ConsentEditProps) => {
  const { consent, useCase, enablePartnerMessageDiscreetMode = false, onCancel, onSubmit } = props;
  const [isEditable] = useState(consent.status === Status.Active);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [consentForm] = useConsentForm();
  const [copy] = useCopy();
  const { primaryDataRecipient } = useDataRecipients();
  const { dataRecipients } = useDataRecipients();

  const handlePartnerDialogClose = () => {
    setIsPartnerDialogOpen(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handlePreSubmit = () => {
    setIsPartnerDialogOpen(false);

    if (
      primaryDataRecipient.type === DataRecipientType.CDR_REPRESENTATIVE ||
      primaryDataRecipient.type === DataRecipientType.BUSINESS_CONSUMER_DISCLOSURE_CONSENT
    ) {
      setIsPartnerDialogOpen(true);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <section>
      <Box sx={{ mb: 3 }}>
        {!isEditable && consent.status && (
          <Alert severity="error">
            <Typography>{copy.consent.edit.non_active_consent_message(consent.status.toLowerCase())}</Typography>
          </Alert>
        )}
      </Box>

      {isEditable && (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
            {copy.consent.edit.active_consent_message}
          </Typography>
        </Box>
      )}

      {consent.useCase && consent.useCase.scopes && (
        <section>
          <ConsentSectionScopes
            message={copy.consent.edit.scope_read_only_message}
            readOnly={true}
            scopes={consent.useCase.scopes}
            showError={false}
          />
        </section>
      )}

      {isEditable && <ConsentEditDates consent={consent} showError={false} useCase={useCase} />}

      {isEditable && <ConsentEditPostUsage defaultValue={consent.postUsageAction} />}

      <ConsentSectionInfo useCase={useCase} dataHandlers={dataRecipients} />

      {!isEditable && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleCancel} sx={{ width: { xs: '100%', sm: '20rem' } }}>
            {copy.common.button_label_finished}
          </Button>
        </Box>
      )}

      {isEditable && (
        <ConsentSectionActions
          actionButtonLabel={copy.consent.create.save_label}
          cancelButtonLabel={copy.consent.create.cancel_label}
          cancelButtonMessage={copy.consent.create.cancel_edit_message}
          isValid={true}
          showError={false}
          onCancel={handleCancel}
          onSubmit={handlePreSubmit}
        />
      )}

      <PartnerMessageDialog
        dataHolderName={
          consentForm.dataHolder ? consentForm.dataHolder?.brandName : copy.common.fallback_data_holder_name
        }
        discreetMode={enablePartnerMessageDiscreetMode}
        isOpen={isPartnerDialogOpen}
        onClose={handlePartnerDialogClose}
        onSubmit={handleSubmit}
      />
    </section>
  );
};
