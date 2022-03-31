import * as React from 'react';
import { Box } from '@mui/material';

import { ConsentResponse } from '../../generated/consent/api';
import { DataHolderHeader } from '../data-holder-header/data-holder-header.molecule';
import { UseCaseSummary } from '../use-case-summary/use-case-summary.molecule';
import { DateSummary } from '../date-summary/date-summary.molecule';
import { SupportingParties } from '../supporting-parties/supporting-parties.molecule';

export type ConsentDetailsProps = {
  consent: ConsentResponse;
  dataHolderLogoUrl: string;
  dateTitle: string;
  useCasetTitle: string;
  isExtendable?: boolean;
  extendableUrl?: string;
  supportingParties?: {
    id: number;
    name: string;
    accreditedId: string;
    service: string;
    cdrPolicyUrl: string;
  }[];
  onRevokeClick: () => void;
};

export const ConsentDetails: React.FC<ConsentDetailsProps> = (props) => {
  const {
    consent,
    dataHolderLogoUrl,
    dateTitle,
    useCasetTitle,
    isExtendable = false,
    extendableUrl,
    supportingParties,
    onRevokeClick,
  } = props;

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <DataHolderHeader
          consent={consent}
          onRevokeClick={onRevokeClick}
          dataHolderLogoUrl={dataHolderLogoUrl}
          isExtendable={isExtendable}
          extendableUrl={extendableUrl}
        />
      </Box>

      {consent.useCase && <UseCaseSummary title={useCasetTitle} useCase={consent.useCase} />}

      <DateSummary title={dateTitle} consent={consent} />

      {supportingParties && consent.useCase && (
        <SupportingParties title={'Supporting parties'} useCase={consent.useCase} />
      )}
    </>
  );
};
