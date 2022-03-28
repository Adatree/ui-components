import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { PostUsageAction, UseCaseResponse } from '../../../generated/consent';
import { useConsentForm } from '../../../context/consentForm.context';
import { UseCaseScopeList } from '../../../molecules/use-case-scope-list/use-case-scope-list.molecule';
import { SectionCard } from '../../../atoms/section-card/section-card.atom';
import { RadioButtonWithText } from '../../../atoms/radio-button-with-text/radio-button-with-text.atom';
import { DataAccessStepDates } from './data-access-step-dates.organism';

export type DataAccessStepProps = {
  companyName: string;
  useCase: UseCaseResponse;
  isValid: (isValid: boolean) => void;
};

export const DataAccessStep = (props: DataAccessStepProps) => {
  const { companyName, useCase, isValid } = props;
  const [consentForm, setConsentForm] = useConsentForm();
  const [postUsageActionDefault] = useState(consentForm.postUsageAction);

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

  const handlePostUsageActionRadioChange = (value: string) => {
    if (value === PostUsageAction.DEIDENTIFICATION) {
      consentForm.postUsageAction = PostUsageAction.DEIDENTIFICATION;
      setConsentForm({ ...consentForm });
    } else if (value === PostUsageAction.DELETION) {
      consentForm.postUsageAction = PostUsageAction.DELETION;
      setConsentForm({ ...consentForm });
    }

    isStepValid();
  };

  const handleDateChange = () => {
    isStepValid();
  };

  const isStepValid = () => {
    if (useCase.scopes) {
      isValid(
        consentForm.checkedScopes.length === useCase.scopes.length &&
          !!consentForm.sharingEndDate &&
          !!consentForm.postUsageAction,
      );
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <UseCaseScopeList
          title="The data we need"
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

      <Box sx={{ mb: 4 }}>
        <SectionCard
          title="Data retention"
          subtitle={`What should ${companyName} do with your redundant data at consent expiry or withdrawal?`}
          tooltip={
            <>
              <Typography sx={{ mb: 1, color: 'inherit' }}>
                This option determines what {companyName} will do with your data at consent expiry or withdrawal.
              </Typography>
              <Typography sx={{ mb: 1, color: 'inherit' }}>
                <strong>Delete</strong>: We will Delete your data at consent expiry or withdrawal.
              </Typography>
              <Typography sx={{ mb: 1, color: 'inherit' }}>
                <strong>De-identify</strong>: We will De-identify your data at consent expiry or withdrawal.
              </Typography>
            </>
          }
          content={
            <>
              <RadioButtonWithText
                defaultValue={postUsageActionDefault}
                radioButtonItems={[
                  {
                    label: 'Delete',
                    value: PostUsageAction.DELETION,
                  },
                  {
                    label: 'De-identify',
                    value: PostUsageAction.DEIDENTIFICATION,
                  },
                ]}
                onChange={handlePostUsageActionRadioChange}
              />
            </>
          }
        ></SectionCard>
      </Box>
    </>
  );
};
