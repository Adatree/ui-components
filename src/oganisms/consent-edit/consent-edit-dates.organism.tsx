import React from 'react';
import { ConsentResponse, UseCaseResponse } from '../../generated/consent';
import { Organisation } from '../../types/organisation.type';
import { ConsentSectionDates } from '../../molecules/consent-section/consent-section-dates.molecule';
import { Card } from '../../atoms/card/card.atom';
import { TextBuilder } from '../../utils/text/text-builder';
import { Typography } from '@mui/material';

export type ConsentEditDatesProps = {
  consent: ConsentResponse;
  organisation: Organisation;
  showError: boolean;
  useCase: UseCaseResponse;
};

export const ConsentEditDates = (props: ConsentEditDatesProps) => {
  const { consent, organisation, showError = false, useCase } = props;

  return (
    <section>
      <Card>
        <Typography sx={{ mt: 1.5, mb: 0 }}>
          {TextBuilder.currentAccess(organisation.name, consent.sharingEndDate)}
        </Typography>
      </Card>

      <ConsentSectionDates organisation={organisation} useCase={useCase} showError={showError} />
    </section>
  );
};
