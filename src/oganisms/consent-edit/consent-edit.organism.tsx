import React, { useEffect, useState } from 'react';
import { ConsentResponse, SharingDuration, UseCaseResponse } from '../../generated/consent';
import { useConsentForm } from '../../context/consentForm.context';
import { Helper } from '../../utils/helper/helper';
import { Organisation } from '../../types/organisation.type';
import { Copy } from '../../types/copy.type';
import { ConsentSectionScopes } from '../../molecules/consent-section/consent-section-scopes.molecule';
import { ConsentSectionDates } from '../../molecules/consent-section/consent-section-dates.molecule';
import { ConsentSectionInfo } from '../../molecules/consent-section/consent-section-info.molecule';
import { ConsentSectionActions } from '../../molecules/consent-section/consent-section-actions.molecule';
import { PartnerMessageDialog } from '../../molecules/partner-message-dialog/partner-message-dialog.molecule';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Card } from '../../atoms/card/card.atom';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';
import { TextBuilder } from '../../utils/text/text-builder';

export type ConsentEditProps = {
  consent: ConsentResponse;
  copy: Copy;
  organisation: Organisation;
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentEdit = (props: ConsentEditProps) => {
  const { consent, copy, organisation, useCase, enablePartnerMessageDiscreetMode = false, onCancel, onSubmit } = props;
  const [isEditable, setIsEditable] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();

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
      setIsEditable(false);
    }

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
          <Alert severity="success">
            <Typography>Your consent details are up to date. There are no options for you to edit.</Typography>
          </Alert>
        </Box>
      )}

      {isEditable && (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
            Update your consent details
          </Typography>
        </Box>
      )}

      {useCase.dataHolders && useCase.scopes && (
        <>
          <ConsentSectionScopes organisation={organisation} readOnly={true} scopes={useCase.scopes} showError={false} />

          <Card>
            <Typography sx={{ mt: 1.5, mb: 0 }}>
              {TextBuilder.currentAccess(organisation.name, consent.sharingEndDate)}
            </Typography>
          </Card>

          <ConsentSectionDates organisation={organisation} useCase={useCase} showError={showDateError} />

          <ConsentSectionInfo copy={copy} organisation={organisation} useCase={useCase} />

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
              organisation={organisation}
              isValid={isFormValid}
              showError={showDateError}
              onCancel={handleCancel}
              onSubmit={handlePreSubmit}
            />
          )}
        </>
      )}

      <PartnerMessageDialog
        dataHolderName={consentForm.dataHolder ? consentForm.dataHolder?.brandName : 'Your data provider'}
        discreetMode={enablePartnerMessageDiscreetMode}
        isOpen={isPartnerDialogOpen}
        organisation={organisation}
        onClose={handlePartnerDialogClose}
        onSubmit={handleSubmit}
      />
    </section>
  );
};
