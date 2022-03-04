import { Box, Typography } from '@mui/material';
import React from 'react';
import { RadioButtonWithText } from '../../../atoms/radio-button-with-text/radio-button-with-text.atom';
import { useConsentForm } from '../../../context/consentForm.context';
import { UseCaseResponse } from '../../../generated/consent';

export type UseCaseStepProps = {
  useCases: UseCaseResponse[];
  isValid: (isValid: boolean) => void;
};

export const UseCaseStep = (props: UseCaseStepProps) => {
  const { useCases, isValid } = props;
  const [consentForm, setConsentForm] = useConsentForm();

  const radioButtonItems = useCases.map((useCase) => {
    return { label: useCase.name ?? '', value: useCase.id ?? '', description: useCase.description ?? '' };
  });

  const isStepValid = () => {
    isValid(!!consentForm.useCaseId);
  };

  const handleRadioCheck = (value: string) => {
    consentForm.useCaseId = value;
    setConsentForm({ ...consentForm });
    isStepValid();
  };

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Choose a service
      </Typography>
      <Typography sx={{ mb: 2 }}>Which service would you like to use?</Typography>
      <RadioButtonWithText radioButtonItems={radioButtonItems} onChange={handleRadioCheck} />;
    </Box>
  );
};