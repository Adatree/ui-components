import React from 'react';
import { PostUsageAction } from '../../generated/consent';
import { Card } from '../../atoms/card/card.atom';
import { Typography } from '@mui/material';
import { RadioButtonWithText } from '../../atoms/radio-button-with-text/radio-button-with-text.atom';
import { useConsentForm } from '../../context/consentForm.context';

type Props = {
  defaultValue: PostUsageAction | undefined;
};

export const ConsentEditPostUsage = ({ defaultValue }: Props) => {
  const [consentForm, setConsentForm] = useConsentForm();

  const radioButtonItems = [
    { label: 'De-Identification', value: PostUsageAction.DeIdentification, description: 'Your data is anonymised.' },
    { label: 'Deletion', value: PostUsageAction.Deletion, description: 'Your data is deleted' },
  ];

  const handleChange = (id: string) => {
    if (id === PostUsageAction.DeIdentification) {
      consentForm.postUsageAction = PostUsageAction.DeIdentification;
    } else {
      consentForm.postUsageAction = PostUsageAction.Deletion;
    }

    setConsentForm({ ...consentForm });
  };

  return (
    <section>
      <Card sx={{ mb: '2.2rem' }}>
        <Typography sx={{ mt: 1.5, mb: 0 }}>Select what happens to your data once your consent has ended?</Typography>
        <RadioButtonWithText radioButtonItems={radioButtonItems} onChange={handleChange} defaultValue={defaultValue} />
      </Card>
    </section>
  );
};
