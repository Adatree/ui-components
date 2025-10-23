import * as React from 'react';
import { Typography } from '@mui/material';
import { Card } from '../../atoms/card/card.atom';
import { SwitchDialog } from '../../atoms/switch-with-dialog/switch-with-dialog.atom';

interface Props {
  showError: boolean;
  onCheck: (value: boolean) => void;
  deIdentifyTitle: string;
  deIdentifyCopy: string;
  checked?: boolean;
}

export const ConsentSectionDeIdentify = ({ showError, onCheck, deIdentifyTitle, deIdentifyCopy, checked }: Props) => {
  const handleSwitchCheck = (value: boolean) => {
    onCheck(value);
  };

  return (
    <>
      <Card error={showError}>
        <SwitchDialog
          switchTitle={<>{deIdentifyTitle}</>}
          dialogTitle={'De-identify'}
          onCheck={handleSwitchCheck}
          checked={checked}
        >
          <>{deIdentifyCopy}</>
        </SwitchDialog>
      </Card>

      <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && `Please confirm you would like to de-identify your data.`}
      </Typography>
    </>
  );
};
