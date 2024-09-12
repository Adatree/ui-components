import * as React from 'react';
import { Box } from '@mui/material';

import { ConsentResponse } from '@adatree/react-api-sdk';
import { DataHolderHeader } from '../data-holder-header/data-holder-header.molecule';
import { UseCaseSummary } from '../use-case-summary/use-case-summary.molecule';
import { DateSummary } from '../date-summary/date-summary.molecule';
import { DataRecipient } from '../../types/data-recipient.type';
import { DataDisclosure } from '../data-disclosure/data-disclosure.molecule';
import { GranteeSummary } from '../grantee-summary/grantee-summary.molecule';
import { BusinessConsumerStatement } from '../business-consumer-statement/business-consumer-statement.molecule';
import { Helper } from '../../utils/helper/helper';

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

      {Helper.isBcdc(dataRecipients) && Helper.isOrganisation(consent.useCase) && <BusinessConsumerStatement />}

      {consent.grantee && <GranteeSummary gantee={consent.grantee} status={consent.status} />}

      {consent.useCase && <UseCaseSummary title={useCasetTitle} useCase={consent.useCase} />}

      <DateSummary title={dateTitle} consent={consent} />

      {dataRecipients && <DataDisclosure dataRecipients={dataRecipients} />}
    </>
  );
};
