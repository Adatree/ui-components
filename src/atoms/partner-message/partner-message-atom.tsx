import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDataRecipients } from '../../context/data-recipient.context';
import { useCopy } from '../../context/copy.context';

interface Props {
  dataHolderName: string;
  discreetMode?: boolean;
}

export const PartnerMessage = (props: Props) => {
  const { dataHolderName, discreetMode = false } = props;
  const { primaryDataRecipient, dataRecipients } = useDataRecipients();
  const [copy] = useCopy();

  return (
    <section>
      <div style={{ textAlign: 'center' }}>
        <Box sx={{ mt: 3, mb: 1 }}>
          <img
            src={primaryDataRecipient.logo}
            alt={primaryDataRecipient.name}
            style={{ maxWidth: '260px', width: '100%', margin: '0 auto' }}
          />
        </Box>
        {!discreetMode && <Typography sx={{ mb: 1 }}>{copy.component.partner_message.discreet_label}</Typography>}
        <Typography variant="h1" sx={{ mb: 2.5, fontSize: discreetMode === true ? '1.8rem' : '3rem' }}>
          {copy.common.adatree_name}
        </Typography>
      </div>
      <Box>
        <Typography sx={{ mb: 1 }}>{copy.component.partner_message.what_label(dataRecipients)}</Typography>
        <Typography sx={{ mt: 1.5, mb: 0 }}>{copy.component.partner_message.why_label(dataHolderName)}</Typography>
      </Box>
    </section>
  );
};
