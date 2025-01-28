import * as React from 'react';
import { Typography } from '@mui/material';
import { UseCaseResponse } from '@adatree/react-api-sdk';
import { Card } from '../../atoms/card/card.atom';
import { DateSelector } from '../date-selector/date-selector.molecule';
import { TextBuilder } from '../../utils/text/text-builder';
import { useDataRecipients } from '../../context/data-recipient.context';

interface Props {
  useCase: UseCaseResponse;
  showError: boolean;
  editMessage?: string;
  showSharingDurationsOptions?: boolean;
}

export const ConsentSectionDates = (props: Props) => {
  const { useCase, showError, showSharingDurationsOptions = false } = props;
  const { primaryDataRecipient } = useDataRecipients();

  return (
    <>
      <Card error={showError}>
        {useCase.sharingDurations && (
          <DateSelector
            companyName={primaryDataRecipient.name}
            sharingDurations={useCase.sharingDurations}
            showSharingDurationsOptions={showSharingDurationsOptions}
          />
        )}
        <Typography sx={{ mt: 1.5, mb: 0 }}>
          {TextBuilder.accessFrequency(primaryDataRecipient.name, useCase.accessFrequency)}
        </Typography>
      </Card>
      <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && `Please confirm how long you would like ${primaryDataRecipient.name} to access your data.`}
      </Typography>
    </>
  );
};
