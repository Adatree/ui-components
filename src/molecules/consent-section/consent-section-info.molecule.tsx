import * as React from 'react';
import { Box } from '@mui/material';
import { UseCaseResponse } from '../../generated/consent/api';
import { Accordion } from '../../atoms/accordion/accordion.molecule';
import { GeneralInformation } from '../../atoms/populated-accordions/general-information.atom';
import { SupportingParties } from '../supporting-parties/supporting-parties.molecule';
import { useCopy } from '../../context/copy.context';
import { useOrg } from '../../context/organisation.context';

export type ConsentSectionInfoProps = {
  useCase: UseCaseResponse;
};

export const ConsentSectionInfo: React.FC<ConsentSectionInfoProps> = (props) => {
  const { useCase } = props;
  const [copy] = useCopy();
  const [organisation] = useOrg();

  return (
    <>
      <Box sx={{ mb: 4, position: 'relative' }}>
        <Accordion title="Purpose of accessing my data" content={useCase.description} />
        <GeneralInformation
          cdrPolicyUrl={organisation.cdrPolicyUrl}
          topListItemOverride={copy.consent.create.data_holder_general_information_list_item}
          dataSharingRevocationEmail={organisation.dataSharingRevocationEmail}
        />
        {useCase.osps && useCase.osps.length > 0 && (
          <SupportingParties title={'Supporting Parties'} useCase={useCase} outsourcedServiceProviders={useCase.osps} />
        )}
      </Box>
    </>
  );
};
