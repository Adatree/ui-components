import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { UseCaseResponse } from '../../generated/consent/api';
import { Accordion } from '../../atoms/accordion/accordion.molecule';
import { GeneralInformation } from '../../atoms/info-accordions/general-info.atom';
import { SupportingParties } from '../supporting-parties/supporting-parties.molecule';
import { DataHandlingInfo } from '../../atoms/info-accordions/data-handling-info.atom';
import { DataRecipient, DataRecipientType } from '../../types/data-recipient.type';

export type ConsentSectionInfoProps = {
  useCase: UseCaseResponse;
  dataHandlers?: DataRecipient[];
};

export const ConsentSectionInfo: React.FC<ConsentSectionInfoProps> = (props) => {
  const { useCase, dataHandlers } = props;

  const getHideDuplicates = (): boolean => {
    let hideDuplicates = false;

    if (dataHandlers) {
      const nonAdrFound = dataHandlers?.find((dataHandler) => {
        return dataHandler.type === DataRecipientType.NON_ACCREDITED_PERSON;
      });

      if (nonAdrFound) {
        hideDuplicates = false;
      } else if (!nonAdrFound && dataHandlers.length >= 1) {
        hideDuplicates = true;
      }
    }

    return hideDuplicates;
  };

  return (
    <>
      <Box sx={{ mb: 4, position: 'relative' }}>
        <GeneralInformation hideDuplicateListItem={getHideDuplicates()} />
        <Accordion
          title="What is the purpose of accessing my data?"
          content={<Typography variant="body1">{useCase.description}</Typography>}
        />
        {dataHandlers && dataHandlers.length > 0 && <DataHandlingInfo dataHandlers={dataHandlers} />}
        {useCase.osps && useCase.osps.length > 0 && (
          <SupportingParties title={'Supporting Parties'} useCase={useCase} outsourcedServiceProviders={useCase.osps} />
        )}
      </Box>
    </>
  );
};
