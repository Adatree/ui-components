import React, { useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import {
  RadioButtonItem,
  RadioButtonWithText,
} from '../../../atoms/radio-button-with-text/radio-button-with-text.atom';
import { useConsentForm } from '../../../context/consentForm.context';
import { UseCaseResponse } from '../../../generated/consent';

export type UseCaseStepProps = {
  useCases: UseCaseResponse[];
  isLoading: boolean;
  isValid: (isValid: boolean) => void;
};

export const UseCaseStep = (props: UseCaseStepProps) => {
  const { useCases, isLoading, isValid } = props;
  const [consentForm, setConsentForm] = useConsentForm();
  const [useCaseId] = useState(consentForm.useCaseId);
  let radioButtonItems: RadioButtonItem[] = [];

  if (useCases) {
    radioButtonItems = useCases.map((useCase) => {
      return { label: useCase.name ?? '', value: useCase.id ?? '', description: useCase.description ?? '' };
    });
  }

  const isStepValid = () => {
    isValid(!!consentForm.useCaseId);
  };

  const handleRadioCheck = (value: string) => {
    resetConsentForm();
    consentForm.useCaseId = value;
    setConsentForm({ ...consentForm });
    isStepValid();
  };

  const resetConsentForm = () => {
    consentForm.checkedScopes = [];
    consentForm.dataHolder = undefined;
    consentForm.postUsageAction = undefined;
    consentForm.selectedSharingDurations = undefined;
    consentForm.sharingEndDate = undefined;
    consentForm.useCaseId = undefined;
  };

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Choose a service
      </Typography>
      <Typography sx={{ mb: 2 }}>Which service would you like to use?</Typography>

      {isLoading && (
        <>
          <Skeleton height="80px" />
          <Skeleton height="80px" />
          <Skeleton height="80px" />
        </>
      )}
      {!isLoading && (
        <RadioButtonWithText radioButtonItems={radioButtonItems} onChange={handleRadioCheck} defaultValue={useCaseId} />
      )}
    </Box>
  );
};
