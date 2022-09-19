import * as React from 'react';
import { Box } from '@mui/material';

import { ConsentResponse } from '../../generated/consent/api';
import { DataHolderHeader } from '../data-holder-header/data-holder-header.molecule';
import { UseCaseSummary } from '../use-case-summary/use-case-summary.molecule';
import { DateSummary } from '../date-summary/date-summary.molecule';
import { DataRecipient } from '../../types/data-recipient.type';
import { DataDisclosure } from '../data-disclosure/data-disclosure.molecule';

export type ConsentDetailsProps = {
  consent: ConsentResponse;
  dateTitle: string;
  useCasetTitle: string;
  dataRecipients?: DataRecipient[];
  editUrl?: string;
  onRevokeClick: () => void;
};

export const ConsentDetails: React.FC<ConsentDetailsProps> = (props) => {
  const { consent, dateTitle, useCasetTitle, editUrl, dataRecipients, onRevokeClick } = props;

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <DataHolderHeader consent={consent} onRevokeClick={onRevokeClick} editUrl={editUrl} />
      </Box>

      {consent.useCase && <UseCaseSummary title={useCasetTitle} useCase={consent.useCase} />}

      <DateSummary title={dateTitle} consent={consent} />

      {dataRecipients && <DataDisclosure dataRecipients={dataRecipients} />}
    </>
  );
};
