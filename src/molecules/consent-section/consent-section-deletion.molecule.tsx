import * as React from 'react';
import { Typography } from '@mui/material';
import { PostUsageAction } from '../../generated/consent/api';
import { Card } from '../../atoms/card/card.atom';
import { useDataRecipients } from '../../context/data-recipient.context';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';
import { RadioButtonWithText } from '../../atoms/radio-button-with-text/radio-button-with-text.atom';

type Props = {
  showError: boolean;
  onRadioCheck: (value: string) => void;
};

export const ConsentSectionDeletion: React.FC<Props> = (props) => {
  const { showError, onRadioCheck } = props;
  const { primaryDataRecipient } = useDataRecipients();

  const radioButtonItems = [
    {
      label: 'De-Identification',
      value: PostUsageAction.DeIdentification,
      description: 'Your data will be anonymised.',
    },
    {
      label: 'Deletion',
      value: PostUsageAction.Deletion,
      description: 'Your data will be deleted.',
    },
  ];

  const handleRadioCheck = (value: string) => {
    onRadioCheck(value);
  };

  return (
    <>
      <Card error={showError}>
        <Typography sx={{ mb: 2 }}>
          What should <Highlight>{primaryDataRecipient.name}</Highlight> do with your data once your consent expires or
          is revoked?
        </Typography>

        <RadioButtonWithText radioButtonItems={radioButtonItems} onChange={handleRadioCheck} />
      </Card>
      <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && `Please confirm what to do with your data once your consent expires or is revoked`}
      </Typography>
    </>
  );
};
