import * as React from 'react';
import { Typography } from '@mui/material';
import { UseCaseResponse } from '../../generated/consent/api';
import { Card } from '../../atoms/card/card.atom';
import { DateSelector } from '../date-selector/date-selector.molecule';
import { TextBuilder } from '../../utils/text/text-builder';
import { useDataRecipients } from '../../context/data-recipient.context';

export type ConsentSectionDatesProps = {
  useCase: UseCaseResponse;
  showError: boolean;
  editMessage?: string;
};

export const ConsentSectionDates: React.FC<ConsentSectionDatesProps> = (props) => {
  const { useCase, showError } = props;
  const { primaryDataRecipient } = useDataRecipients();

  return (
    <>
      <Card error={showError}>
        {useCase.sharingDurations && (
          <DateSelector companyName={primaryDataRecipient.name} sharingDurations={useCase.sharingDurations} />
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
