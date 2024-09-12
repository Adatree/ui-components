import React from 'react';
import { ConsentResponse, SharingDuration, UseCaseResponse } from '@adatree/react-api-sdk';
import { ConsentSectionDates } from '../../molecules/consent-section/consent-section-dates.molecule';
import { Card } from '../../atoms/card/card.atom';
import { TextBuilder } from '../../utils/text/text-builder';
import { Typography } from '@mui/material';
import { useDataRecipients } from '../../context/data-recipient.context';
import { Helper } from '../../utils/helper/helper';
import { Highlight as HL } from '../../atoms/highlight-text/highlight-text.atom';
import { Formatter } from '../../utils/formatter/formatter';

export type ConsentEditDatesProps = {
  consent: ConsentResponse;
  showError: boolean;
  useCase: UseCaseResponse;
  showSharingDurationsOptions?: boolean;
};

export const ConsentEditDates = (props: ConsentEditDatesProps) => {
  const { consent, showError = false, useCase, showSharingDurationsOptions = false } = props;
  const { primaryDataRecipient } = useDataRecipients();
  const singleDateExtention =
    useCase.sharingDurations &&
    useCase.sharingDurations.length === 1 &&
    useCase.sharingDurations[0] !== SharingDuration.Custom &&
    useCase.sharingDurations[0] !== SharingDuration.OnceOff;

  return (
    <section>
      <Card>
        <Typography variant="h2" sx={{ mt: 1.5, mb: 0 }}>
          Extend data access period
        </Typography>

        <Typography sx={{ mt: 1.5, mb: 0 }}>
          {TextBuilder.currentAccess(primaryDataRecipient.name, consent.sharingEndDate)}
        </Typography>

        {singleDateExtention && useCase && useCase.sharingDurations && (
          <Typography sx={{ mt: 1.5, mb: 0 }}>
            {`${primaryDataRecipient.name} would like to extend their access period to your data until the `}
            <HL>{`${Formatter.formatDateTime(Helper.sharingDurationToDate(useCase.sharingDurations[0]))}.`}</HL>
          </Typography>
        )}
        {!singleDateExtention && (
          <Typography sx={{ mt: 1.5, mb: 0 }}>
            {`${primaryDataRecipient.name} would like to extend their access period to your data.`}
          </Typography>
        )}
      </Card>

      <ConsentSectionDates
        useCase={useCase}
        showError={showError}
        showSharingDurationsOptions={showSharingDurationsOptions}
      />
    </section>
  );
};
