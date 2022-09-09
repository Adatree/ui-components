import * as React from 'react';
import { RadioButtonItem, RadioButtonWithText } from '../../atoms/radio-button-with-text/radio-button-with-text.atom';
import { Card } from '../../atoms/card/card.atom';
import { TrustedAdvisorResponse } from '../../types/trusted-advisor.type';

export type TrustedAdvisorSelectorProps = {
  trustedAdvisors: TrustedAdvisorResponse[];
  onChange: (trustedAdvisorsId: string) => void;
};

export const TrustedAdvisorSelector: React.FC<TrustedAdvisorSelectorProps> = (props) => {
  const { trustedAdvisors, onChange } = props;
  let radioButtonItems: RadioButtonItem[] = [];

  if (trustedAdvisors) {
    radioButtonItems = trustedAdvisors.map((trustedAdvisor) => {
      return {
        label: trustedAdvisor.name ?? '',
        value: trustedAdvisor.id ?? '',
        description: trustedAdvisor.description ?? '',
      };
    });
  }

  const handleRadioCheck = (trustedAdvisorsId: string) => {
    onChange(trustedAdvisorsId);
  };

  return (
    <Card>
      <RadioButtonWithText radioButtonItems={radioButtonItems} onChange={handleRadioCheck} />
    </Card>
  );
};
