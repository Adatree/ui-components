import React from 'react';
import { UseCaseResponse } from '@adatree/react-api-sdk';
import { Box, lighten, Typography } from '@mui/material';
import { Highlight as HL } from '../../atoms/highlight-text/highlight-text.atom';
import { DataRecipient } from '../../types/data-recipient.type';
import { Card } from '../../atoms/card/card.atom';

interface Props {
  useCase: UseCaseResponse;
  nonAdrDataRecipient: DataRecipient;
  primaryDataRecipient: DataRecipient;
  dataHolderName?: string;
}

export const ConsentCreateInsight = ({ nonAdrDataRecipient, primaryDataRecipient, useCase }: Props) => {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1.6, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
          <HL>{useCase.name}</HL>
        </Typography>
      </Box>

      <Card sx={{ mb: 3.6 }}>
        <Typography sx={{ mb: 1.6, textAlign: { xs: 'center', sm: 'left' } }}>
          <HL>{nonAdrDataRecipient.name}</HL> requires your consent to {useCase.name}.
        </Typography>

        {useCase.description && (
          <Typography sx={{ mb: 1.6, textAlign: { xs: 'center', sm: 'left' } }}>{useCase.description}</Typography>
        )}

        <Typography variant="body2" sx={{ color: (theme) => lighten(theme.palette.text_main.main, 0.3) }}>
          {nonAdrDataRecipient.name} is the Insight recipient. {nonAdrDataRecipient.name} has partnered with{' '}
          {primaryDataRecipient.name} to securely access your {useCase.industries?.toString().toLocaleLowerCase()} data
          and generate the Insight &ldquo;{useCase.name}&rdquo;. {primaryDataRecipient.name} will only share the
          generated Insight with {nonAdrDataRecipient.name}.
        </Typography>
      </Card>
    </>
  );
};
