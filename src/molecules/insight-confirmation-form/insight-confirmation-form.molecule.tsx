import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { InsightList } from '../../atoms/insight-list/insight-list.atom';
import { Card } from '../../atoms/card/card.atom';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';
import { ScopeResponse } from '@adatree/react-api-sdk';
import { useDataRecipients } from '../../context/data-recipient.context';

interface Props {
  insightScopes: ScopeResponse[];
  dataHolderName: string;
  showError: boolean;
  onChange: (confirmation: boolean) => void;
}

export const InsightConfirmationForm: React.FC<Props> = (props: Props) => {
  const { insightScopes, dataHolderName, onChange, showError = false } = props;
  const { nonAdrDataRecipient } = useDataRecipients();

  const handleConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    event.stopPropagation();
    onChange(checked);
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
          <Highlight>{nonAdrDataRecipient?.name}</Highlight> needs your permission to receive the following insights:
        </Typography>
      </Box>

      <Card error={showError} sx={{ mt: 1 }}>
        <InsightList insightScopes={insightScopes} dataHolderName={dataHolderName} />
        <Box sx={{ mt: 1.5, pr: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <FormControlLabel
            labelPlacement="start"
            control={<Checkbox color="button" onChange={handleConfirmationChange} />}
            label={
              <Typography>
                I confirm that <Highlight>{nonAdrDataRecipient?.name}</Highlight> has permission to receive the above
                insights.
              </Typography>
            }
          />
        </Box>
      </Card>
      <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && 'Please select the confirmation box.'}
      </Typography>
    </>
  );
};
