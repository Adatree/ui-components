import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { UseCaseResponse } from '@adatree/react-api-sdk-dashboard';
import { Accordion } from '../../atoms/accordion/accordion.molecule';
import { GeneralInformation } from '../../atoms/info-accordions/general-info.atom';
import { SupportingParties } from '../supporting-parties/supporting-parties.molecule';
import { DataHandlingInfo } from '../../atoms/info-accordions/data-handling-info.atom';
import { DataRecipient, DataRecipientType } from '../../types/data-recipient.type';
import { Helper } from '../../utils/helper/helper';
import { LibertyGeneralInformation } from '../../atoms/info-accordions/liberty-general-info.atom';
import { useDataRecipients } from '../../context/data-recipient.context';

interface Props {
  useCase: UseCaseResponse;
  dataHandlers?: DataRecipient[];
}

export const ConsentSectionInfo = (props: Props) => {
  const { primaryDataRecipient } = useDataRecipients();
  const { useCase, dataHandlers } = props;

  const getHideDuplicates = (): boolean => {
    let hideDuplicates = false;
    const isNonAdr = isNonADR();

    if (isNonAdr) {
      hideDuplicates = false;
    } else if (!isNonAdr && dataHandlers && dataHandlers.length >= 1) {
      hideDuplicates = true;
    }

    return hideDuplicates;
  };

  const isNonADR = (): boolean => {
    const nonAdrFound = dataHandlers?.find((dataHandler) => {
      return dataHandler.type === DataRecipientType.NON_ACCREDITED_PERSON;
    });

    return nonAdrFound !== undefined;
  };

  return (
    <>
      <Box sx={{ mb: 4, position: 'relative' }}>
        {primaryDataRecipient && primaryDataRecipient.name === 'Liberty' ? (
          <LibertyGeneralInformation />
        ) : (
          <GeneralInformation hideDuplicateListItem={getHideDuplicates()} />
        )}

        {!isNonADR() && (
          <Accordion
            title="What is the purpose of accessing my data?"
            content={<Typography variant="body1">{useCase.description}</Typography>}
          />
        )}
        {dataHandlers && dataHandlers.length > 0 && <DataHandlingInfo dataHandlers={dataHandlers} />}
        {useCase.osps && useCase.osps.length > 0 && (
          <SupportingParties title={'Supporting Parties'} useCase={useCase} outsourcedServiceProviders={useCase.osps} />
        )}
      </Box>
    </>
  );
};
