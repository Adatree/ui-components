import React from 'react';
import { UseCaseResponse } from '../../../generated/consent';
import { AutocompleteDropdown } from '../../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { ScopeAccordion } from '../../../atoms/scope-accordion/scope-accordion.atom';
import { GeneralInformation } from '../../../atoms/general-information/general-information.atom';
import { Box, Button, Paper, Typography } from '@mui/material';

export type CreateConsentStepProps = {
  useCase: UseCaseResponse;
  cdrPolicyUrl: string;
  dataSharingRevocationEmail: string;
};

export const CreateConsentStep = (props: CreateConsentStepProps) => {
  const { useCase, cdrPolicyUrl, dataSharingRevocationEmail } = props;
  return (
    <section>
      {useCase.dataHolders && useCase.scopes && (
        <>
          <Typography variant="h2" sx={{ mb: 1 }}>
            Connect your bank
          </Typography>
          <AutocompleteDropdown dataHolders={useCase.dataHolders} disableDataHolders={undefined} onChange={() => {}} />

          <Typography variant="h2" sx={{ mt: 3, mb: 1 }}>
            Your data
          </Typography>
          <Paper>
            <ScopeAccordion scopes={useCase.scopes} />
          </Paper>

          <Typography variant="h2" sx={{ mt: 3, mb: 1 }}>
            Data access
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ mb: 1 }}>Data sharing ends in 3 months on the 04/10/2022 at 08:03 pm</Typography>
            <Typography>Data access may occur multiple times per day</Typography>
          </Paper>

          <Typography variant="h2" sx={{ mt: 3, mb: 1 }}>
            Key things to know before you consent
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <GeneralInformation cdrPolicyUrl={cdrPolicyUrl} dataSharingRevocationEmail={dataSharingRevocationEmail} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6, mb: 1 }}>
            <Button variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button variant="contained" color="cta">
              Consent
            </Button>
          </Box>
        </>
      )}
    </section>
  );
};
