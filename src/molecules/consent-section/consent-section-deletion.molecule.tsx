import * as React from 'react';
import { Typography } from '@mui/material';
import { Card } from '../../atoms/card/card.atom';
import { SwitchDialog } from '../../atoms/switch-with-dialog/switch-with-dialog.atom';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';
import { useDataRecipients } from '../../context/data-recipient.context';

type Props = {
  showError: boolean;
  onCheck: (value: boolean) => void;
};

export const ConsentSectionDeIdentify: React.FC<Props> = (props) => {
  const { showError, onCheck } = props;
  const { primaryDataRecipient } = useDataRecipients();

  const handleSwitchCheck = (value: boolean) => {
    onCheck(value);
  };

  return (
    <>
      <Card error={showError}>
        <SwitchDialog
          switchTitle={
            <>
              <Highlight>{primaryDataRecipient.name}</Highlight> would like to de-identify your data to provide the
              requested service
            </>
          }
          dialogTitle={'De-identify'}
          onCheck={handleSwitchCheck}
        >
          <>An explanation of what de-identify actually means.</>
        </SwitchDialog>
      </Card>

      <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && `Please confirm you would like to de-identify your data.`}
      </Typography>
    </>
  );
};
