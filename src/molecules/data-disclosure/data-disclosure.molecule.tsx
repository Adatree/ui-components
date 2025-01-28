import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { DataHandlerList } from '../../atoms/data-handler-list/data-handler-list.atom';
import { DataRecipient } from '../../types/data-recipient.type';
import { useCopy } from '../../context/copy.context';
import { Card } from '../../atoms/card/card.atom';

interface Props {
  dataRecipients: DataRecipient[];
}

export const DataDisclosure = (props: Props) => {
  const { dataRecipients } = props;
  const [copy] = useCopy();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {copy.consent.details.data_disclosure_label}
      </Typography>
      <Card>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {copy.consent.details.data_disclosure_message}
        </Typography>
        <DataHandlerList dataHandlers={dataRecipients} />
      </Card>
    </Box>
  );
};
