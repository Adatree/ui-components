import * as React from 'react';
import { UseCaseResponse } from '@adatree/react-api-sdk';
import { RadioButtonItem, RadioButtonWithText } from '../../atoms/radio-button-with-text/radio-button-with-text.atom';
import { Card } from '../../atoms/card/card.atom';

export type UseCaseSelectorProps = {
  useCases: UseCaseResponse[];
  onChange: (useCaseId: string) => void;
};

export const UseCaseSelector: React.FC<UseCaseSelectorProps> = (props) => {
  const { useCases, onChange } = props;
  let radioButtonItems: RadioButtonItem[] = [];

  if (useCases) {
    radioButtonItems = useCases.map((useCase) => {
      return { label: useCase.name ?? '', value: useCase.id ?? '', description: useCase.description ?? '' };
    });
  }

  const handleRadioCheck = (useCaseId: string) => {
    onChange(useCaseId);
  };

  return (
    <Card>
      <RadioButtonWithText radioButtonItems={radioButtonItems} onChange={handleRadioCheck} />
    </Card>
  );
};
