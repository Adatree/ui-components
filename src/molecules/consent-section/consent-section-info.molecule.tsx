import * as React from 'react';
import { Box } from '@mui/material';
import { UseCaseResponse } from '../../generated/consent/api';
import { Organisation } from '../../types/organisation.type';
import { Accordion } from '../../atoms/accordion/accordion.molecule';
import { GeneralInformation } from '../../atoms/general-information/general-information.atom';
import { SupportingParties } from '../supporting-parties/supporting-parties.molecule';
import { useCopy } from '../../context/copy.context';

export type ConsentSectionInfoProps = {
  organisation: Organisation;
  useCase: UseCaseResponse;
};

export const ConsentSectionInfo: React.FC<ConsentSectionInfoProps> = (props) => {
  const { organisation, useCase } = props;
  const [copy] = useCopy();

  return (
    <>
      <Box sx={{ mb: 4, position: 'relative' }}>
        <Accordion title="Purpose of accessing my data" content={useCase.description} />
        <GeneralInformation
          cdrPolicyUrl={organisation.cdrPolicyUrl}
          topListItemOverride={copy.consent.dataHolderGeneralInformationListItem}
          dataSharingRevocationEmail={organisation.dataSharingRevocationEmail}
        />
        {useCase.osps && useCase.osps.length > 0 && (
          <SupportingParties title={'Supporting Parties'} useCase={useCase} outsourcedServiceProviders={useCase.osps} />
        )}
      </Box>
    </>
  );
};
