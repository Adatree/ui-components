import React, { ReactElement } from 'react';

import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { InsightResponse } from '../../types/insight-response.type';
import { InsightList } from '../../atoms/insight-list/insight-list.atom';
import { Card } from '../../atoms/card/card.atom';

interface Props {
  insights: InsightResponse[];
  message: string | ReactElement;
  dataHolderName: string;
  showError: boolean;
  onChange: (confirmation: boolean) => void;
}

export const InsightConfirmationForm: React.FC<Props> = (props: Props) => {
  const { message, insights, dataHolderName, onChange, showError = false } = props;

  const handleConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    event.stopPropagation();
    onChange(checked);
  };

  return (
    <>
      <Card error={showError} sx={{ mt: 1 }}>
        <Typography sx={{ mb: 1 }}>{message}</Typography>
        <InsightList insights={insights} dataHolderName={dataHolderName} />
        <Box sx={{ pr: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <FormControlLabel
            labelPlacement="start"
            control={<Checkbox color="button" onChange={handleConfirmationChange} />}
            label={<Typography>I confirm that my data can be used to generate these Insights.</Typography>}
          />
        </Box>
      </Card>
      <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && 'Please select the confirmation box.'}
      </Typography>
    </>
  );
};
