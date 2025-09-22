import * as React from 'react';
import { Typography } from '@mui/material';
import { Card } from '../../atoms/card/card.atom';
import { SwitchDialog } from '../../atoms/switch-with-dialog/switch-with-dialog.atom';
import { useDataRecipients } from '../../context/data-recipient.context';

interface Props {
  showError: boolean;
  onCheck: (value: boolean) => void;
  deIdentifyCopy?: string;
}

export const ConsentSectionDeIdentify = ({ showError, onCheck, deIdentifyCopy }: Props) => {
  const { primaryDataRecipient } = useDataRecipients();

  let title = `${primaryDataRecipient.name} requires your consent to combine your anonymised data with that of others in your area in order to calculate average numbers.`;
  let explanationMessage =
    "We'll combine your energy use data with that of others in your neighbourhood to calculate average numbers. These averages help you see how your energy use compares to other households in your area. We'll remove any personal information that could identify you - including your name, contact information, and physical address. The data used to create these averages will not be attributable to you, and you will not be able to elect that it be deleted.";

  if (deIdentifyCopy) {
    title = 'Consent to Use of De-Identified Data';
    explanationMessage = deIdentifyCopy;
  }
  const handleSwitchCheck = (value: boolean) => {
    onCheck(value);
  };

  return (
    <>
      <Card error={showError}>
        <SwitchDialog switchTitle={<>{title}</>} dialogTitle={'De-identify'} onCheck={handleSwitchCheck}>
          <>{explanationMessage}</>
        </SwitchDialog>
      </Card>

      <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && `Please confirm you would like to de-identify your data.`}
      </Typography>
    </>
  );
};
