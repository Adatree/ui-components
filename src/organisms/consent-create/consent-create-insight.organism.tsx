import React from 'react';
import { Industry, UseCaseResponse } from '@adatree/react-api-sdk-dashboard';
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
  const getIndusrtryNoun = (industries: Industry[]): string => {
    if (industries.includes(Industry.Banking)) {
      return 'bank';
    } else if (industries.includes(Industry.Energy)) {
      return 'energy';
    } else {
      return '';
    }
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1.6, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
          <HL>{useCase.name}</HL>
        </Typography>
      </Box>

      <Card sx={{ mb: 3.6 }}>
        <Typography sx={{ mb: 1.6, textAlign: { xs: 'center', sm: 'left' } }}>
          <HL>{nonAdrDataRecipient.name}</HL> needs your consent to be able to {useCase.name}.
        </Typography>

        {useCase.description && (
          <Typography sx={{ mb: 1.6, textAlign: { xs: 'center', sm: 'left' } }}>{useCase.description}</Typography>
        )}

        <Typography variant="body2" sx={{ color: (theme) => lighten(theme.palette.text_main.main, 0.3), mb: 1.6 }}>
          {primaryDataRecipient.name} is an accredited provider for securely accessing{' '}
          {getIndusrtryNoun(useCase.industries)} data. This process is automatic. {primaryDataRecipient.name} checks
          your {getIndusrtryNoun(useCase.industries)} account usage to ensure it meets {nonAdrDataRecipient.name}{' '}
          requirements. {primaryDataRecipient.name} does not send {nonAdrDataRecipient.name} your transaction details.
          Only the outcome of this check, which is called an &quot;insight&quot;.
        </Typography>

        <Typography variant="body2" sx={{ color: (theme) => lighten(theme.palette.text_main.main, 0.3) }}>
          {primaryDataRecipient.name} will only share the generated insight with {nonAdrDataRecipient.name}.
        </Typography>
      </Card>
    </>
  );
};
