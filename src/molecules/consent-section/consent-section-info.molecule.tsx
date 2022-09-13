import * as React from 'react';
import { Box } from '@mui/material';
import { UseCaseResponse } from '../../generated/consent/api';
import { Accordion } from '../../atoms/accordion/accordion.molecule';
import { GeneralInformation } from '../../atoms/info-accordions/general-info.atom';
import { SupportingParties } from '../supporting-parties/supporting-parties.molecule';
import { useCopy } from '../../context/copy.context';
import { TrustedAdvisorResponse } from '../../types/trusted-advisor.type';
import { DataHandlingInfo } from '../../atoms/info-accordions/data-handling-info.atom';

export type ConsentSectionInfoProps = {
  useCase: UseCaseResponse;
  trustedAdvisors?: TrustedAdvisorResponse[];
};

export const ConsentSectionInfo: React.FC<ConsentSectionInfoProps> = (props) => {
  const { useCase, trustedAdvisors } = props;
  const [copy] = useCopy();

  return (
    <>
      <Box sx={{ mb: 4, position: 'relative' }}>
        <Accordion title="Purpose of accessing my data" content={useCase.description} />
        <GeneralInformation
          topListItemOverride={copy.consent.create.data_holder_general_information_list_item}
          hideDuplicateListItem={trustedAdvisors !== undefined}
        />
        {useCase.osps && useCase.osps.length > 0 && (
          <SupportingParties title={'Supporting Parties'} useCase={useCase} outsourcedServiceProviders={useCase.osps} />
        )}
        {trustedAdvisors && <DataHandlingInfo trustedAdvisors={trustedAdvisors} />}
      </Box>
    </>
  );
};
