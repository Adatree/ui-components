import React, { useEffect, useState } from 'react';
import { DataHolder, SharingDuration, UseCaseResponse } from '../../../generated/consent';
import { AutocompleteDropdown } from '../../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { ScopeList } from '../../../atoms/scope-list/scope-list.atom';
import { GeneralInformation } from '../../../atoms/general-information/general-information.atom';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material';
import { Accreditation } from '../../../atoms/accreditation/accreditation.atom';
import { useConsentForm } from '../../../context/consentForm.context';
import { DateSelector } from '../../../molecules/date-selector/date-selector.molecule';
import { Confirmation } from '../../../atoms/confirmation/confirmation.atom';
import { Helper } from '../../../utils/helper/helper';
import { TextBuilder } from '../../../utils/text/text-builder';
import { Card } from '../../../atoms/card/card.atom';

export type CreateConsentStepProps = {
  accreditationNumber: string;
  cdrPolicyUrl: string;
  companyName: string;
  dataSharingRevocationEmail: string;
  underCdrPrincipal: boolean;
  useCase: UseCaseResponse;
  onSubmit: () => void;
  onCancel: () => void;
};

export const CreateConsentStepV3 = (props: CreateConsentStepProps) => {
  const {
    accreditationNumber,
    cdrPolicyUrl,
    companyName,
    dataSharingRevocationEmail,
    underCdrPrincipal,
    useCase,
    onSubmit,
    onCancel,
  } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [isDataAccessConfirmed, setIsDataAccessConfirmed] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showConfirmError, setShowConfirmError] = useState(false);
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

    if (isDataAccessConfirmed && consentForm.dataHolder && consentForm.selectedSharingDurations) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isDataAccessConfirmed, consentForm]);

  const handleDataHolderChange = (dataHolder: DataHolder | null) => {
    if (dataHolder === null) {
      consentForm.dataHolder = undefined;
    } else {
      setShowDataHolderError(false);
      consentForm.dataHolder = dataHolder;
    }

    setConsentForm({ ...consentForm });
  };

  const handleConfirmationChange = (checked: boolean) => {
    setShowConfirmError(false);
    setIsDataAccessConfirmed(checked);
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
      setShowConfirmError(isDataAccessConfirmed === true ? false : true);
    }
  };

  return (
    <section>
      {useCase.dataHolders && useCase.scopes && (
        <>
          <AutocompleteDropdown
            dataHolders={useCase.dataHolders}
            disableDataHolders={undefined}
            onChange={handleDataHolderChange}
            showError={showDataHolderError}
            label="Choose your bank"
          />

          <Card sx={{ mb: 2.2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography>
                <strong>{companyName}</strong> has requested access to see the following data
              </Typography>
            </Box>
            <ScopeList scopes={useCase.scopes} companyName={companyName} />
          </Card>

          <Card error={showDateError}>
            {useCase.sharingDurations && (
              <DateSelector companyName={companyName} sharingDurations={useCase.sharingDurations} />
            )}
            <Typography sx={{ mt: 1.5, mb: 0 }}>
              {TextBuilder.accessFrequency(companyName, useCase.accessFrequency)}
            </Typography>
          </Card>
          <Typography sx={{ minHeight: '2.2rem' }} variant="body2" color="error.main">
            {showDateError && `Please confirm how long you would like ${companyName} to access your data.`}
          </Typography>

          <Card error={showConfirmError}>
            <Confirmation
              companyName={companyName}
              sharingDuration={consentForm.selectedSharingDurations}
              endDate={consentForm.sharingEndDate}
              onChange={handleConfirmationChange}
            />
          </Card>

          <Typography sx={{ minHeight: '2.2rem' }} variant="body2" color="error.main">
            {showConfirmError && `Please confirm you are allowing ${companyName} to access your data.`}
          </Typography>

          <Typography sx={{ minHeight: '2.2rem', mt: 1.5 }} variant="body2" color="error.main">
            {(showConfirmError || showDataHolderError || showDateError) && 'Please fix the error above.'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 4,
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

          <Box sx={{ position: 'relative' }}>
            <GeneralInformation cdrPolicyUrl={cdrPolicyUrl} dataSharingRevocationEmail={dataSharingRevocationEmail} />
          </Box>

          <Box sx={{ p: 2, m: 1 }}>
            <Accreditation
              accreditationNumber={accreditationNumber}
              cdrPolicyUrl={cdrPolicyUrl}
              companyName={companyName}
              underCdrPrincipal={underCdrPrincipal}
            />
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
