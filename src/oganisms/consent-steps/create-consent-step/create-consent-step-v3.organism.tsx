import React, { useEffect, useState } from 'react';
import { DataHolder, UseCaseResponse } from '../../../generated/consent';
import { AutocompleteDropdown } from '../../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { ScopeList } from '../../../atoms/scope-list/scope-list.atom';
import { GeneralInformation } from '../../../atoms/general-information/general-information.atom';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import { Accreditation } from '../../../atoms/accreditation/accreditation.atom';
import { useConsentForm } from '../../../context/consentForm.context';

export type CreateConsentStepProps = {
  accreditationNumber: string;
  cdrPolicyUrl: string;
  companyName: string;
  useCase: UseCaseResponse;
  dataSharingRevocationEmail: string;
  onSubmit: () => void;
  onCancel: () => void;
};

export const CreateConsentStepV3 = (props: CreateConsentStepProps) => {
  const { accreditationNumber, useCase, cdrPolicyUrl, companyName, dataSharingRevocationEmail, onSubmit, onCancel } =
    props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [isDataAccessConfirmed, setIsDataAccessConfirmed] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [showConfirmError, setShowConfirmError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();

  const timePeriod = '3 months';
  const accessFrequency = 'multiple times';

  useEffect(() => {
    if (isDataAccessConfirmed && consentForm.dataHolder) {
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

  const handleConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    event.stopPropagation();
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
      setShowConfirmError(isDataAccessConfirmed === true ? false : true);
    }
  };

  return (
    <section>
      {useCase.dataHolders && useCase.scopes && (
        <>
          <Typography variant="h2" sx={{ mb: 0.5 }}>
            Choose your bank
          </Typography>
          <AutocompleteDropdown
            dataHolders={useCase.dataHolders}
            disableDataHolders={undefined}
            onChange={handleDataHolderChange}
            showError={showDataHolderError}
          />

          <Card sx={{ borderRadius: '4px', py: 2, mb: 2.8 }} elevation={0}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ px: 2 }}>
                <strong>{companyName}</strong> has requested access to see the following data
              </Typography>
            </Box>
            <ScopeList scopes={useCase.scopes} companyName={companyName} />
          </Card>

          <Card sx={{ p: 2, mb: 2.8 }} elevation={0}>
            <Typography sx={{ mb: 1.5 }}>
              <strong>{companyName}</strong> would like to access your data for <strong>{timePeriod}</strong>.
            </Typography>
            <Typography sx={{ mb: 0 }}>
              <strong>{companyName}</strong> would like to access your data <strong>{accessFrequency}</strong> during
              this <strong>{timePeriod}</strong>.
            </Typography>
          </Card>

          <Card
            sx={{ p: 2, border: '1px Solid #fff', '&.error': { borderColor: 'error.main' } }}
            className={showConfirmError === true ? 'error' : ''}
            elevation={0}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox color="cta" onChange={handleConfirmationChange} />
              <Typography>
                I confirm that I am allowing <strong>{companyName}</strong> to access my data (listed above) for a
                period of <strong>{timePeriod}</strong>.
              </Typography>
            </Box>
          </Card>
          <Typography sx={{ minHeight: '2.2rem' }} variant="body2" color="error.main">
            {showConfirmError && `Please confirm you are allowing ${companyName} to access your data.`}
          </Typography>

          <Typography sx={{ minHeight: '2.2rem', mt: 1 }} variant="body2" color="error.main">
            {showDataHolderError && 'Please choose your bank above.'}
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
