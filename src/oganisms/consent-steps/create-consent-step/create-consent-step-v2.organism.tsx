import React, { useEffect, useState } from 'react';
import { DataHolder, UseCaseResponse } from '../../../generated/consent';
import { AutocompleteDropdown } from '../../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { ScopeListSwitch } from '../../../atoms/scope-list/scope-list-switch.atom';
import { GeneralInformation } from '../../../atoms/general-information/general-information.atom';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material';
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

export const CreateConsentStepV2 = (props: CreateConsentStepProps) => {
  const { accreditationNumber, useCase, cdrPolicyUrl, companyName, dataSharingRevocationEmail, onSubmit, onCancel } =
    props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAllCheckboxChecked, setIsAllCheckboxChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [showScopeError, setShowScopeError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();

  useEffect(() => {
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
      setShowScopeError(isAllCheckboxChecked === true ? false : true);
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

          <Typography variant="h2">Confirm access</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Please confirm that {companyName} can have access to the following information:
          </Typography>
          <Card
            sx={{ borderRadius: '4px', py: 0, border: '1px Solid #fff', '&.error': { borderColor: 'error.main' } }}
            className={showScopeError === true ? 'error' : ''}
            elevation={0}
          >
            <ScopeListSwitch scopes={useCase.scopes} companyName={companyName} onChange={handleScopeChange} />
          </Card>
          <Typography sx={{ minHeight: '2.2rem' }} variant="body2" color="error.main">
            {showScopeError && 'Please select all the options.'}
          </Typography>

          <Typography variant="h2">Important dates</Typography>
          <Card sx={{ p: 2, mb: 2.8 }} elevation={0}>
            <Typography sx={{ mb: 0 }}>{companyName} can access your data for 3 months.</Typography>
          </Card>

          <Typography sx={{ minHeight: '2.2rem' }} variant="body2" color="error.main">
            {showDataHolderError && 'Please choose your bank above.'}
          </Typography>
          <Typography sx={{ minHeight: '2.2rem' }} variant="body2" color="error.main">
            {showScopeError && 'Please confirm access to your information above.'}
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

          <Typography variant="h3" sx={{ mb: 0.5 }}>
            Important information
          </Typography>
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
