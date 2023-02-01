import React from 'react';
import { ConsentResponse, UseCaseResponse } from '../../generated/consent';
import { ConsentSectionDates } from '../../molecules/consent-section/consent-section-dates.molecule';
import { Card } from '../../atoms/card/card.atom';
import { TextBuilder } from '../../utils/text/text-builder';
import { Typography } from '@mui/material';
import { useDataRecipients } from '../../context/data-recipient.context';

export type ConsentEditDatesProps = {
  consent: ConsentResponse;
  showError: boolean;
  useCase: UseCaseResponse;
};

export const ConsentEditDates = (props: ConsentEditDatesProps) => {
  const { consent, showError = false, useCase } = props;
  const { primaryDataRecipient } = useDataRecipients();

  return (
    <section>
      <Card>
        <Typography sx={{ mt: 1.5, mb: 0 }}>
          {TextBuilder.currentAccess(primaryDataRecipient.name, consent.sharingEndDate)}
        </Typography>
      </Card>

      <ConsentSectionDates useCase={useCase} showError={showError} showSharingDurationsOptions={true} />
    </section>
  );
};
