import React from 'react';
import { ScopeResponse } from '../../generated/consent';
import { Box, lighten, Typography } from '@mui/material';
import { Card } from '../../atoms/card/card.atom';
import { Highlight as HL } from '../../atoms/highlight-text/highlight-text.atom';
import { DataRecipient } from '../../types/data-recipient.type';
import { InsightList } from '../../atoms/insight-list/insight-list.atom';

export type ConsentInsightFormProps = {
  nonAdrDataRecipient: DataRecipient;
  primaryDataRecipient: DataRecipient;
  dataHolderName: string;
  insightScopes: ScopeResponse[];
};

export const ConsentCreateInsight = ({
  nonAdrDataRecipient,
  primaryDataRecipient,
  dataHolderName,
  insightScopes,
}: ConsentInsightFormProps) => {
  return (
    <section>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1.6, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
          <HL>{nonAdrDataRecipient.name}</HL> requires your consent to access the following Insight
        </Typography>
        <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="h3">
          {insightScopes.map((insightScope, index) => {
            return <li key={`scope-name-${index}`}>{insightScope.name}</li>;
          })}
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ mb: 2, color: (theme) => lighten(theme.palette.text_main.main, 0.3) }}>
        {nonAdrDataRecipient.name} is the Insight recipient. {nonAdrDataRecipient.name} has partnered with{' '}
        {primaryDataRecipient.name} to securely access your data and generate the Insight. {primaryDataRecipient.name}{' '}
        will share the Insights with {nonAdrDataRecipient.name}.
      </Typography>

      <Card sx={{ mb: 3.6 }}>
        <InsightList insightScopes={insightScopes} dataHolderName={dataHolderName} />
      </Card>
    </section>
  );
};
