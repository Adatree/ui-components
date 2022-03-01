import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { ConsentResponse, AccessFrequency } from '../../generated/consent/api';
import { Formatter } from '../../utils/formatter/formater';
import { Helper } from '../../utils/helper/helper';

export type DateSummaryProps = {
  title: string;
  consent: ConsentResponse;
};

export const DateSummary: React.FC<DateSummaryProps> = (props) => {
  const { title, consent } = props;

  let sharingEndDate: Date | string = 'After first use';

  if (consent.useCase && consent.useCase.accessFrequency === AccessFrequency.ONGOING) {
    sharingEndDate = Formatter.formatDate(consent.sharingEndDate);
  }

  let firstDataCollection = 'Not yet';
  if (consent.firstDataCollection) {
    firstDataCollection = Formatter.formatDate(consent.firstDataCollection);
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 0.5 }} variantMapping={{ h4: 'h3' }}>
            When you gave consent
          </Typography>
          <Typography sx={{ mb: 2 }}>{Formatter.formatDate(consent.created)}</Typography>

          <Typography variant="h4" sx={{ mb: 0.5 }} variantMapping={{ h4: 'h3' }}>
            When we first collected your data
          </Typography>
          <Typography sx={{ mb: 2 }}>{firstDataCollection}</Typography>

          <Typography variant="h4" sx={{ mb: 0.5 }} variantMapping={{ h4: 'h3' }}>
            When your consent will expire
          </Typography>
          <Typography sx={{ mb: 2 }}>{sharingEndDate}</Typography>

          {consent.useCase && consent.useCase.accessFrequency && (
            <>
              <Typography variant="h4" sx={{ mb: 0.5 }} variantMapping={{ h4: 'h3' }}>
                Data access frequency
              </Typography>
              <Typography>{Helper.accessFrequencyToString(consent.useCase.accessFrequency)}</Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
