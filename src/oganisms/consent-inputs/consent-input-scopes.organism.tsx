import React, { useEffect, useState } from 'react';
import { SharingDuration, UseCaseResponse } from '../../generated/consent';
import { ScopeListSwitch } from '../../atoms/scope-list/scope-list-switch.atom';
import { GeneralInformation } from '../../atoms/general-information/general-information.atom';
import { Box, Button, Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import { Accreditation } from '../../atoms/accreditation/accreditation.atom';
import { useConsentForm } from '../../context/consentForm.context';
import { Card } from '../../atoms/card/card.atom';
import { DateSelector } from '../../molecules/date-selector/date-selector.molecule';
import { TextBuilder } from '../../utils/text/text-builder';
import { Helper } from '../../utils/helper/helper';
import { SupportingParties } from '../../molecules/supporting-parties/supporting-parties.molecule';
import { Organisation } from '../../types/organisation.type';
import { Copy } from '../../types/copy.type';
import { PartnerMessage } from '../../atoms/partner-message/partner-message-atom';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';
import { ConsentCancelButton } from '../../atoms/consent-cancel-button/consent-cancel-button.atom';
import { Accordion } from '../../atoms/accordion/accordion.molecule';
import Close from 'mdi-material-ui/Close';

export type ConsentInputScopesProps = {
  copy: Copy;
  organisation: Organisation;
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentInputScopes = (props: ConsentInputScopesProps) => {
  const { copy, organisation, useCase, enablePartnerMessageDiscreetMode = false, onCancel, onSubmit } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAllCheckboxChecked, setIsAllCheckboxChecked] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showScopeError, setShowScopeError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();

  useEffect(() => {
    if (
      useCase.sharingDurations &&
      useCase.sharingDurations.length === 1 &&
      !useCase.sharingDurations.includes(SharingDuration.CUSTOM)
    ) {
      consentForm.selectedSharingDurations = useCase.sharingDurations[0];
      consentForm.sharingEndDate = Helper.sharingDurationToDate(useCase.sharingDurations[0]);
      setConsentForm({ ...consentForm });
    }
  }, []);

  useEffect(() => {
    if (consentForm.selectedSharingDurations) {
      setShowDateError(false);
    }

    if (isAllCheckboxChecked && consentForm.dataHolder && consentForm.selectedSharingDurations) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isAllCheckboxChecked, consentForm]);

  const handleScopeChange = (isAllChecked: boolean) => {
    setShowScopeError(false);
    setIsAllCheckboxChecked(isAllChecked);
  };

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
      setShowDataHolderError(!consentForm.dataHolder);
      setShowDateError(!consentForm.selectedSharingDurations);
      setShowScopeError(isAllCheckboxChecked === true ? false : true);
    }
  };

  const handleSubmit = () => {
    onSubmit();
  };

  const handleNavBack = () => {
    consentForm.dataHolder = undefined;
    consentForm.selectedSharingDurations = undefined;
    consentForm.sharingEndDate = undefined;
    setConsentForm({ ...consentForm });
  };

  return (
    <section>
      {useCase.dataHolders && useCase.scopes && (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
              <Highlight>{organisation.name}</Highlight> {copy.consent.title[0]}{' '}
              <Highlight>{consentForm.dataHolder?.brandName}</Highlight> {copy.consent.title[1]}
            </Typography>
          </Box>

          <Card error={showScopeError} sx={{ mt: 1 }}>
            <Typography sx={{ mb: 1 }}>
              Please confirm that <Highlight>{organisation.name}</Highlight> can have access to the following data:
            </Typography>
            <ScopeListSwitch scopes={useCase.scopes} companyName={organisation.name} onChange={handleScopeChange} />
          </Card>
          <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
            {showScopeError && 'Please select all the options.'}
          </Typography>

          <Card error={showDateError}>
            {useCase.sharingDurations && (
              <DateSelector companyName={organisation.name} sharingDurations={useCase.sharingDurations} />
            )}
            <Typography sx={{ mt: 1.5, mb: 0 }}>
              {TextBuilder.accessFrequency(organisation.name, useCase.accessFrequency)}
            </Typography>
          </Card>
          <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
            {showDateError && `Please confirm how long you would like ${name} to access your data.`}
          </Typography>

          <Box sx={{ mb: 4, position: 'relative' }}>
            <Accordion title="Purpose of accessing my data" content={useCase.description} />
            <GeneralInformation
              cdrPolicyUrl={organisation.cdrPolicyUrl}
              topListItemOverride={copy.consent.dataHolderGeneralInformationListItem}
              dataSharingRevocationEmail={organisation.dataSharingRevocationEmail}
            />
            {useCase.osps && useCase.osps.length > 0 && (
              <SupportingParties
                title={'Supporting Parties'}
                useCase={useCase}
                outsourcedServiceProviders={useCase.osps}
              />
            )}
          </Box>

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
              color={isFormValid === true ? 'button' : 'inherit'}
              onClick={handlePreSubmit}
            >
              Consent
            </Button>
            <ConsentCancelButton dialogText={copy.consent.cancelMessage} onCancel={handleCancel} />
          </Box>
          <Typography sx={{ mb: 3, minHeight: '2.2rem' }} variant="body2" color="error.main">
            {(showDataHolderError || showDateError || showScopeError) && 'Please fix the error(s) above.'}
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
      )}

      <Dialog
        open={isPartnerDialogOpen}
        aria-labelledby="partner-dialog-title"
        aria-describedby="partner-dialog-description"
      >
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handlePartnerDialogClose}
            sx={{
              position: 'absolute',
              right: { xs: 4, sm: 8 },
              top: { xs: 4, sm: 8 },
              color: (theme) => theme.palette.button.light,
            }}
          >
            <Close />
          </IconButton>

          <PartnerMessage
            dataHolderName={consentForm.dataHolder ? consentForm.dataHolder?.brandName : 'Your data provider'}
            organisation={organisation}
            discreetMode={enablePartnerMessageDiscreetMode}
          />

          <Box sx={{ pt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              OK
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </section>
  );
};
