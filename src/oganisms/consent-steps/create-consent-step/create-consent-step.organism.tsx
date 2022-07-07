import React, { useEffect, useState } from 'react';
import { DataHolder, UseCaseResponse } from '../../../generated/consent';
import { AutocompleteDropdown } from '../../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { ScopeAccordion } from '../../../atoms/scope-accordion/scope-accordion.atom';
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

export const CreateConsentStep = (props: CreateConsentStepProps) => {
  const { accreditationNumber, useCase, cdrPolicyUrl, companyName, dataSharingRevocationEmail, onSubmit, onCancel } =
    props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAllCheckboxChecked, setIsAllCheckboxChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      consentForm.dataHolder = dataHolder;
    }

    setConsentForm({ ...consentForm });
  };

  const handleScopeChange = (isAllChecked: boolean) => {
    setIsAllCheckboxChecked(isAllChecked);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <section>
      {useCase.dataHolders && useCase.scopes && (
        <>
          <Typography variant="body1" component="h2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Choose your bank
          </Typography>
          <AutocompleteDropdown
            dataHolders={useCase.dataHolders}
            disableDataHolders={undefined}
            onChange={handleDataHolderChange}
          />

          <Typography variant="body1" component="h2" sx={{ mb: 1, mt: 3, fontWeight: 'bold' }}>
            Confirm that you allow {companyName} to access the following information:
          </Typography>
          <Card sx={{ borderRadius: '4px', py: 0 }}>
            <ScopeAccordion scopes={useCase.scopes} companyName={companyName} onChange={handleScopeChange} />
          </Card>

          <Card sx={{ p: 2, mt: 3, mb: 1 }}>
            <Typography sx={{ mb: 1 }}>{companyName} can access your data for 3 months.</Typography>
            <Typography>{companyName} may access your data multiple times per day.</Typography>
          </Card>

          <Typography variant="body1" component="h2" sx={{ mb: 1, mt: 3, fontWeight: 'bold' }}>
            Key things to know before you consent
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <GeneralInformation cdrPolicyUrl={cdrPolicyUrl} dataSharingRevocationEmail={dataSharingRevocationEmail} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 4,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button
              sx={{ mb: 2, width: { xs: '100%', sm: '20rem' } }}
              variant="contained"
              color="cta"
              disabled={!isFormValid}
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

          <Box sx={{ p: 2, my: 1 }}>
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
