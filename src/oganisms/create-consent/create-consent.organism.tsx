import React, { useEffect, useState } from 'react';
import { ConsentResponse, DataHolder, SharingDuration, UseCaseResponse } from '../../generated/consent';
import { AutocompleteDropdown } from '../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { ScopeListSwitch } from '../../atoms/scope-list/scope-list-switch.atom';
import { GeneralInformation } from '../../atoms/general-information/general-information.atom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
} from '@mui/material';
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
import Close from 'mdi-material-ui/Close';

export type CreateConsentProps = {
  copy: Copy;
  existingConsents: ConsentResponse[];
  organisation: Organisation;
  useCase: UseCaseResponse;
  onCancel: () => void;
  onSubmit: () => void;
};

export const CreateConsent = (props: CreateConsentProps) => {
  const { copy, existingConsents, organisation, useCase, onCancel, onSubmit } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAllCheckboxChecked, setIsAllCheckboxChecked] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showScopeError, setShowScopeError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();

  const disableDataHolders = Helper.filterDataHoldersByConsentsAndUseCase(
    useCase.dataHolders,
    existingConsents,
    useCase,
  );

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

  const handleDataHolderChange = (dataHolder: DataHolder | null) => {
    if (dataHolder === null) {
      consentForm.dataHolder = undefined;
    } else {
      setShowDataHolderError(false);
      consentForm.dataHolder = dataHolder;
    }

    setConsentForm({ ...consentForm });
  };

  const handleScopeChange = (isAllChecked: boolean) => {
    setShowScopeError(false);
    setIsAllCheckboxChecked(isAllChecked);
  };

  const handleCancelDialogClose = () => {
    setIsCancelDialogOpen(false);
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

  return (
    <section>
      {useCase.dataHolders && useCase.scopes && useCase.dataHolders.length > disableDataHolders.length && (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }} variant="h2">
              <strong>{organisation.name}</strong> {copy.consent.title}
            </Typography>
            <Typography>{useCase.description}</Typography>
          </Box>

          <AutocompleteDropdown
            dataHolders={useCase.dataHolders}
            disableDataHolders={disableDataHolders}
            onChange={handleDataHolderChange}
            showError={showDataHolderError}
            label={copy.consent.dataHolderInputLabel}
          />

          <Card error={showScopeError} sx={{ mt: 1 }}>
            <Typography sx={{ mb: 1 }}>
              Please confirm that <strong>{organisation.name}</strong> can have access to the following data:
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
              color={isFormValid === true ? 'cta' : 'inherit'}
              onClick={handlePreSubmit}
            >
              Consent
            </Button>
            <Button
              sx={{ mb: 2, width: { xs: '100%', sm: '20rem' } }}
              variant="outlined"
              color="inherit"
              onClick={() => {
                setIsCancelDialogOpen(true);
              }}
            >
              Cancel
            </Button>
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

      {useCase.dataHolders && useCase.dataHolders.length === disableDataHolders.length && (
        <>
          <Box sx={{ m: 2 }}>
            <Typography sx={{ mb: 2 }} variant={'h2'}>
              Sorry but you are unable to create a new consent.
            </Typography>
            <Typography sx={{ mb: 2 }}>You have already connected all of your available accounts.</Typography>
            <Typography>You currently have the following active consents:</Typography>

            <ul style={{ padding: '1rem' }}>
              {useCase.dataHolders.map((dataHolder) => (
                <li style={{ listStyle: 'disc', marginLeft: '10px' }} key={dataHolder.dataHolderBrandId}>
                  <Typography variant="body2" sx={{ m: 0.1 }}>
                    {useCase.name} consent with {dataHolder.brandName}.
                  </Typography>
                </li>
              ))}
            </ul>
            <Button
              sx={{ my: 2, width: { xs: '100%', sm: '20rem' } }}
              variant="contained"
              color="cta"
              onClick={handleCancel}
            >
              Back
            </Button>
          </Box>
        </>
      )}

      <Dialog
        open={isCancelDialogOpen}
        onClose={handleCancelDialogClose}
        aria-labelledby="info-dialog-title"
        aria-describedby="info-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="info-dialog-description">
            Are you sure you want to cancel this consent?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={handleCancelDialogClose} autoFocus>
            No
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleCancel}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

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
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>

          <PartnerMessage
            dataHolderName={consentForm.dataHolder ? consentForm.dataHolder?.brandName : 'Your data provider'}
            organisation={organisation}
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
