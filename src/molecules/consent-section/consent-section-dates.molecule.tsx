import * as React from 'react';
import { Typography } from '@mui/material';
import { UseCaseResponse } from '../../generated/consent/api';
import { Card } from '../../atoms/card/card.atom';
import { DateSelector } from '../date-selector/date-selector.molecule';
import { TextBuilder } from '../../utils/text/text-builder';
import { Organisation } from '../../types/organisation.type';

export type ConsentSectionDatesProps = {
  organisation: Organisation;
  useCase: UseCaseResponse;
  showError: boolean;
};

export const ConsentSectionDates: React.FC<ConsentSectionDatesProps> = (props) => {
  const { organisation, useCase, showError } = props;

  return (
    <>
      <Card error={showError}>
        {useCase.sharingDurations && (
          <DateSelector companyName={organisation.name} sharingDurations={useCase.sharingDurations} />
        )}
        <Typography sx={{ mt: 1.5, mb: 0 }}>
          {TextBuilder.accessFrequency(organisation.name, useCase.accessFrequency)}
        </Typography>
      </Card>
      <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && `Please confirm how long you would like ${name} to access your data.`}
      </Typography>
    </>
  );
};
