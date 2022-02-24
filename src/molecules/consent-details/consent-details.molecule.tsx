import * as React from 'react';
import { Box } from '@mui/material';

import { ConsentResponse } from '../../generated/consent/api';
import { DataHolderHeader } from '../data-holder-header/data-holder-header.molecule';
import { UseCaseSummary } from '../use-case-summary/use-case-summary.molecule';
import { DateSummary } from '../date-summary/date-summary.molecule';

export type ConsentDetailsProps = {
  consent: ConsentResponse;
  dateTitle: string;
  useCasetTitle: string;
  onRevokeClick: () => void;
};

export const ConsentDetails: React.FC<ConsentDetailsProps> = (props) => {
  const { consent, dateTitle, useCasetTitle, onRevokeClick } = props;

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <DataHolderHeader consent={consent} onRevokeClick={onRevokeClick} />
      </Box>

      {consent.useCase && <UseCaseSummary title={useCasetTitle} useCase={consent.useCase} />}

      <DateSummary title={dateTitle} consent={consent} />
    </>
  );
};
