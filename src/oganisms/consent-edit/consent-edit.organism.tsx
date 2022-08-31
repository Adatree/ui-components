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
import { useOrg } from '../../context/organisation.context';

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
  const [consentForm, setConsentForm] = useConsentForm();
  const [copy] = useCopy();
  const [organisation] = useOrg();

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

    if (consentForm.dataHolder && consentForm.selectedSharingDurations) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [consentForm]);

  const handlePartnerDialogClose = () => {
    setIsPartnerDialogOpen(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handlePreSubmit = () => {
    setIsPartnerDialogOpen(false);

    if (isFormValid) {
      if (organisation.underCdrPrincipal) {
        setIsPartnerDialogOpen(true);
      } else {
        handleSubmit();
      }
    } else {
      setShowDateError(!consentForm.selectedSharingDurations);
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
              <Typography>Your consent details are up to date. There are no options for you to edit.</Typography>
            </Alert>
          )}
          {consent.status !== Status.ACTIVE && (
            <Alert severity="error">
              <Typography>{`You are unable to edit your consent because it's status is ${consent.status?.toLowerCase()}.`}</Typography>
            </Alert>
          )}
        </Box>
      )}

      {isEditable && (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
            Update your consent details
          </Typography>
        </Box>
      )}

      <ConsentEditScopes consent={consent} useCase={useCase} />

      <ConsentEditDates consent={consent} showError={showDateError} useCase={useCase} />

      <ConsentSectionInfo useCase={useCase} />

      {!isEditable && (
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="contained" onClick={handleCancel} sx={{ width: { xs: '100%', sm: '20rem' } }}>
            Done
          </Button>
        </Box>
      )}
      {isEditable && (
        <ConsentSectionActions
          actionButtonLabel={copy.consent.saveLabel}
          cancelButtonLabel={copy.consent.cancelLabel}
          cancelButtonMessage={copy.consent.cancelEditMessage}
          isValid={isFormValid}
          showError={showDateError}
          onCancel={handleCancel}
          onSubmit={handlePreSubmit}
        />
      )}

      <PartnerMessageDialog
        dataHolderName={consentForm.dataHolder ? consentForm.dataHolder?.brandName : 'Your data provider'}
        discreetMode={enablePartnerMessageDiscreetMode}
        isOpen={isPartnerDialogOpen}
        onClose={handlePartnerDialogClose}
        onSubmit={handleSubmit}
      />
    </section>
  );
};
