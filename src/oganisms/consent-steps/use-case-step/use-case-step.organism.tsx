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
    return { label: useCase.name ?? '', value: useCase.id ?? '' };
  });

  const isStepValid = () => {
    isValid(!!consentForm.useCaseId);
  };

  const handleRadioCheck = (value: string) => {
    consentForm.useCaseId = value;
    setConsentForm({ ...consentForm });
    isStepValid();
  };

  return <RadioButtonWithText radioButtonItems={radioButtonItems} onChange={handleRadioCheck} />;
};
