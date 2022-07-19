import React, { useEffect, useState } from 'react';
import { ConsentResponse, DataHolder, SharingDuration, UseCaseResponse } from '../../../generated/consent';
import { AutocompleteDropdown } from '../../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { ScopeListSwitch } from '../../../atoms/scope-list/scope-list-switch.atom';
import { GeneralInformation } from '../../../atoms/general-information/general-information.atom';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material';
import { Accreditation } from '../../../atoms/accreditation/accreditation.atom';
import { useConsentForm } from '../../../context/consentForm.context';
import { Card } from '../../../atoms/card/card.atom';
import { DateSelector } from '../../../molecules/date-selector/date-selector.molecule';
import { TextBuilder } from '../../../utils/text/text-builder';
import { Helper } from '../../../utils/helper/helper';

export type CreateConsentStepProps = {
  accreditationNumber: string;
  cdrPolicyUrl: string;
  companyName: string;
  dataSharingRevocationEmail: string;
  existingConsents: ConsentResponse[];
  underCdrPrinciple: boolean;
  useCase: UseCaseResponse;
  onCancel: () => void;
  onSubmit: () => void;
};

export const CreateConsentStepV2 = (props: CreateConsentStepProps) => {
  const {
    accreditationNumber,
    cdrPolicyUrl,
    companyName,
    dataSharingRevocationEmail,
    existingConsents,
    underCdrPrinciple,
    useCase,
    onCancel,
    onSubmit,
  } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAllCheckboxChecked, setIsAllCheckboxChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

    if (isAllCheckboxChecked && consentForm.dataHolder) {
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

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit();
    } else {
      setShowDataHolderError(!consentForm.dataHolder);
      setShowDateError(!consentForm.selectedSharingDurations);
      setShowScopeError(isAllCheckboxChecked === true ? false : true);
    }
  };

  return (
    <section>
      {useCase.dataHolders && useCase.scopes && useCase.dataHolders.length > disableDataHolders.length && (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }} variant="h2">
              <strong>{companyName}</strong> requests access to your banking account data
            </Typography>
            <Typography>{useCase.description}</Typography>
          </Box>

          <AutocompleteDropdown
            dataHolders={useCase.dataHolders}
            disableDataHolders={disableDataHolders}
            onChange={handleDataHolderChange}
            showError={showDataHolderError}
            label={'Choose your bank'}
          />

          <Card error={showScopeError} sx={{ mt: 1 }}>
            <Typography sx={{ mb: 1 }}>
              Please confirm that <strong>{companyName}</strong> can have access to the following data:
            </Typography>
            <ScopeListSwitch scopes={useCase.scopes} companyName={companyName} onChange={handleScopeChange} />
          </Card>
          <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
            {showScopeError && 'Please select all the options.'}
          </Typography>

          <Card error={showDateError}>
            {useCase.sharingDurations && (
              <DateSelector companyName={companyName} sharingDurations={useCase.sharingDurations} />
            )}
            <Typography sx={{ mt: 1.5, mb: 0 }}>
              {TextBuilder.accessFrequency(companyName, useCase.accessFrequency)}
            </Typography>
          </Card>
          <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
            {showDateError && `Please confirm how long you would like ${companyName} to access your data.`}
          </Typography>

          <Box sx={{ mb: 4, position: 'relative' }}>
            <GeneralInformation cdrPolicyUrl={cdrPolicyUrl} dataSharingRevocationEmail={dataSharingRevocationEmail} />
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
              onClick={handleSubmit}
            >
              Consent
            </Button>
            <Button
              sx={{ mb: 2, width: { xs: '100%', sm: '20rem' } }}
              variant="outlined"
              color="inherit"
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              Cancel
            </Button>
          </Box>
          <Typography sx={{ mb: 3, minHeight: '2.2rem' }} variant="body2" color="error.main">
            {(showDataHolderError || showDateError || showScopeError) && 'Please fix the error(s) above.'}
          </Typography>

          <Box sx={{ p: 2, m: 1 }}>
            <Accreditation
              accreditationNumber={accreditationNumber}
              cdrPolicyUrl={cdrPolicyUrl}
              companyName={companyName}
              underCdrPrinciple={underCdrPrinciple}
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
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this consent?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={handleDialogClose} autoFocus>
            No
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleCancel}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};
