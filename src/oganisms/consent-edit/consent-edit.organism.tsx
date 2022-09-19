import React, { useEffect, useState } from 'react';
import { ConsentResponse, SharingDuration, Status, UseCaseResponse } from '../../generated/consent';
import { useConsentForm } from '../../context/consentForm.context';
import { Helper } from '../../utils/helper/helper';
import { ConsentSectionInfo } from '../../molecules/consent-section/consent-section-info.molecule';
import { ConsentSectionActions } from '../../molecules/consent-section/consent-section-actions.molecule';
import { PartnerMessageDialog } from '../../molecules/partner-message-dialog/partner-message-dialog.molecule';
import { Alert, Box, Button, Typography } from '@mui/material';
import { ConsentEditScopes } from './consent-edit-scopes.organism';
import { ConsentEditDates } from './consent-edit-dates.organism';
import { useCopy } from '../../context/copy.context';
import { useDataRecipients } from '../../context/data-recipient.context';
import { ConsentSectionDataHandler } from '../../molecules/consent-section/consent-section-data-handler.molecule';

export type ConsentEditProps = {
  consent: ConsentResponse;
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentEdit = (props: ConsentEditProps) => {
  const { consent, useCase, enablePartnerMessageDiscreetMode = false, onCancel, onSubmit } = props;
  const [isEditable, setIsEditable] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showAddScopeError, setShowAddScopeError] = useState(false);
  const [showRemoveScopeError, setShowRemoveScopeError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();
  const [copy] = useCopy();
  const { primaryDataRecipient } = useDataRecipients();
  const { dataRecipients } = useDataRecipients();

  useEffect(() => {
    if (consent.dataHolderName && consent.dataHolderBrandId && consent.dataHolderLogoUri) {
      consentForm.dataHolder = {
        brandName: consent.dataHolderName,
        dataHolderBrandId: consent.dataHolderBrandId,
        logoUri: consent.dataHolderLogoUri,
      };
    }

    if (
      useCase.sharingDurations &&
      useCase.sharingDurations.length === 1 &&
      !useCase.sharingDurations.includes(SharingDuration.CUSTOM)
    ) {
      consentForm.selectedSharingDurations = useCase.sharingDurations[0];
      consentForm.sharingEndDate = Helper.sharingDurationToDate(useCase.sharingDurations[0]);
    }

    setIsEditable(Helper.isConsentEditable(consent, useCase));
    setConsentForm({ ...consentForm });
  }, []);

  useEffect(() => {
    if (consentForm.selectedSharingDurations) {
      setShowDateError(false);
    }

    if (
      consentForm.dataHolder &&
      consentForm.selectedSharingDurations &&
      consentForm.allAddScopesChecked &&
      consentForm.allRemoveScopesChecked
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [consentForm]);

  const handlePartnerDialogClose = () => {
    setIsPartnerDialogOpen(false);
  };

  const handleAddScopeChange = (isAllScopesClicked: boolean) => {
    consentForm.allAddScopesChecked = isAllScopesClicked;
    setConsentForm({ ...consentForm });
    setShowAddScopeError(false);
  };

  const handleRemoveScopeChange = (isAllScopesClicked: boolean) => {
    consentForm.allRemoveScopesChecked = isAllScopesClicked;
    setConsentForm({ ...consentForm });
    setShowRemoveScopeError(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handlePreSubmit = () => {
    setIsPartnerDialogOpen(false);

    if (isFormValid) {
      if (primaryDataRecipient.underCdrPrincipal) {
        setIsPartnerDialogOpen(true);
      } else {
        handleSubmit();
      }
    } else {
      setShowDateError(!consentForm.selectedSharingDurations);
      setShowAddScopeError(consentForm.allAddScopesChecked === true ? false : true);
      setShowRemoveScopeError(consentForm.allRemoveScopesChecked === true ? false : true);
    }
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <section>
      {!isEditable && (
        <Box sx={{ mb: 3 }}>
          {consent.status === Status.ACTIVE && (
            <Alert severity="success">
              <Typography>{copy.consent.edit.up_to_date_message}</Typography>
            </Alert>
          )}
          {consent.status && consent.status !== Status.ACTIVE && (
            <Alert severity="error">
              <Typography>{copy.consent.edit.non_active_consent_message(consent.status.toLowerCase())}</Typography>
            </Alert>
          )}
        </Box>
      )}

      {isEditable && (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
            {copy.consent.edit.active_consent_message}
          </Typography>
        </Box>
      )}

      <ConsentEditScopes
        consent={consent}
        useCase={useCase}
        showAddScopeError={showAddScopeError}
        showRemoveScopeError={showRemoveScopeError}
        onAddScopeChange={handleAddScopeChange}
        onRemoveScopeChange={handleRemoveScopeChange}
      />

      {dataRecipients && dataRecipients.length > 1 && (
        <ConsentSectionDataHandler message={copy.consent.create.data_handler_label} dataHandlers={dataRecipients} />
      )}

      <ConsentEditDates consent={consent} showError={showDateError} useCase={useCase} />

      <ConsentSectionInfo useCase={useCase} dataHandlers={dataRecipients} />

      {!isEditable && (
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
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
          isValid={isFormValid}
          showError={showAddScopeError || showDateError || showRemoveScopeError}
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
