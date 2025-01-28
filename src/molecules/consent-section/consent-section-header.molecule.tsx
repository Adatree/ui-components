import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useCopy } from '../../context/copy.context';
import { AnalyticsEvents, useAnalytics } from '../../context/analytics.context';
import { useEffect } from 'react';

interface Props {
  dataHolderName: string;
  subTitle?: string;
}

export const ConsentSectionHeader = (props: Props) => {
  const { dataHolderName, subTitle } = props;
  const [copy] = useCopy();
  const { track } = useAnalytics();

  useEffect(() => {
    track(AnalyticsEvents.CONSENT_PAGE_LOADED);
  }, []);

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="h2">
          {copy.consent.create.title(dataHolderName)}
        </Typography>
        {subTitle && (
          <Typography sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }} variant="body2">
            {subTitle}
          </Typography>
        )}
      </Box>
    </>
  );
};
