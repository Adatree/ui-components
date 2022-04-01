import React from 'react';
import { Box } from '@mui/material';
import { UseCaseResponse } from '../../../generated/consent';
import { useConsentForm } from '../../../context/consentForm.context';
import { UseCaseScopeList } from '../../../molecules/use-case-scope-list/use-case-scope-list.molecule';
import { DataAccessStepDates } from './data-access-step-dates.organism';
import { SupportingParties } from '../../../molecules/supporting-parties/supporting-parties.molecule';

export type DataAccessStepProps = {
  companyName: string;
  useCase: UseCaseResponse;
  supportingParties?: {
    id: number;
    name: string;
    accreditedId: string;
    service: string;
    cdrPolicyUrl: string;
  }[];
  isValid: (isValid: boolean) => void;
};

export const DataAccessStep = (props: DataAccessStepProps) => {
  const { companyName, useCase, supportingParties, isValid } = props;
  const [consentForm, setConsentForm] = useConsentForm();

  const handleUseCaseScopeListChange = (isChecked: boolean, value: string) => {
    if (isChecked) {
      consentForm.checkedScopes = [...consentForm.checkedScopes, value];
      setConsentForm({ ...consentForm });
    } else {
      consentForm.checkedScopes = [...consentForm.checkedScopes.filter((item) => item !== value)];
      setConsentForm({ ...consentForm });
    }

    isStepValid();
  };

  const handleDateChange = () => {
    isStepValid();
  };

  const isStepValid = () => {
    if (useCase.scopes) {
      isValid(consentForm.checkedScopes.length === useCase.scopes.length && !!consentForm.sharingEndDate);
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <UseCaseScopeList
          title="Your data"
          subtitle={
            useCase ? `We need to collect the below information in order to provide you with ${useCase.name}.` : ''
          }
          useCase={useCase}
          checkedValues={consentForm.checkedScopes}
          onChange={handleUseCaseScopeListChange}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <DataAccessStepDates companyName={companyName} useCase={useCase} onDateChange={handleDateChange} />
      </Box>

      {supportingParties && <SupportingParties title={'Supporting parties'} useCase={useCase} />}
    </>
  );
};
