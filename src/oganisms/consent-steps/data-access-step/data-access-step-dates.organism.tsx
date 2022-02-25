import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { AccessFrequency, UseCaseResponse } from '../../../generated/consent';
import { useConsentForm } from '../../../context/consentForm.context';
import { SectionCard } from '../../../atoms/section-card/section-card.atom';
import { RadioButtonWithText } from '../../../atoms/radio-button-with-text/radio-button-with-text.atom';
import { DatePicker } from '../../../atoms/date-picker/date-picker.atom';
import { DateButton } from '../../../atoms/date-button/date-button.atom';
import { Helper } from '../../../utils/helper/helper';
import { DateDuration } from '../../../consts/duration.const';

export type DataAccessStepProps = {
  companyName: string;
  useCase: UseCaseResponse;
  onDateChange: () => void;
};

export const DataAccessStepDates = (props: DataAccessStepProps) => {
  const { companyName, useCase, onDateChange } = props;
  const [consentForm, setConsentForm] = useConsentForm();
  const [disableDatePicker, setDisableDatePicker] = useState(consentForm.accessFrequency !== AccessFrequency.ONGOING);
  const [accessFrequencyDefault] = useState(consentForm.accessFrequency);
  const [sharingEndDate, setSharingEndDate] = useState(consentForm.sharingEndDate);
  const [dateDurations, setDateDurations] = useState(consentForm.dateDurations);

  const handleAccessFrequencyRadioChange = (value: string) => {
    if (value === AccessFrequency.ONCEOFF) {
      setDisableDatePicker(true);
      consentForm.accessFrequency = AccessFrequency.ONCEOFF;
      setConsentForm({ ...consentForm });
    } else if (value === AccessFrequency.ONGOING) {
      setDisableDatePicker(false);
      consentForm.sharingEndDate = sharingEndDate;
      consentForm.accessFrequency = AccessFrequency.ONGOING;
      setConsentForm({ ...consentForm });
    }
    onDateChange();
  };

  const handleDatePickerChange = (date: Date) => {
    updateDateDurations([...Helper.unselectDateDurations(dateDurations)]);
    handleSharingEndDateChange(date);
  };

  const handleDateButtonClick = (date: Date, dateDurations: DateDuration[]) => {
    updateDateDurations(dateDurations);
    handleSharingEndDateChange(date);
  };

  const updateDateDurations = (dateDurations: DateDuration[]) => {
    consentForm.dateDurations = dateDurations;
    setConsentForm({ ...consentForm });
    setDateDurations([...dateDurations]);
  };

  const handleSharingEndDateChange = (date: Date) => {
    consentForm.sharingEndDate = date;
    setConsentForm({ ...consentForm });
    setSharingEndDate(date);
    onDateChange();
  };

  return (
    <>
      <SectionCard
        title="Expiration date"
        subtitle={`How long do you want ${companyName} to be able to access your data?`}
        tooltip={
          <>
            <Typography sx={{ mb: 1 }}>
              This option determines how long {companyName} will be able to request and use your data
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Once-off</strong>: {companyName} will be able to request and use your data only once. After the
              initial load of your data {companyName} will not be able to request fresh data from your bank.
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Ongoing</strong>: {companyName} will be able to request and use your data up to a period of 12
              months. During this period we may access your data multiple times per day.
            </Typography>
          </>
        }
        content={
          <>
            <RadioButtonWithText
              defaultValue={accessFrequencyDefault}
              radioButtonItems={[
                {
                  label: 'Once-off',
                  value: AccessFrequency.ONCEOFF,
                },
                {
                  label: 'Ongoing',
                  value: AccessFrequency.ONGOING,
                },
              ]}
              onChange={handleAccessFrequencyRadioChange}
            />
            {dateDurations.length > 0 && (
              <>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: { xs: 'center', sm: 'end' } }}>
                  <DateButton
                    dateDurations={dateDurations}
                    disabled={disableDatePicker}
                    onClick={handleDateButtonClick}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="GrayText"
                  sx={{
                    mt: 1,
                    mr: { xs: 0, sm: 12 },
                    display: 'flex',
                    justifyContent: { xs: 'center', sm: 'end' },
                  }}
                >
                  or
                </Typography>
              </>
            )}
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                width: { xs: '100%', sm: 'inherit' },
                justifyContent: { xs: 'center', sm: 'end' },
              }}
            >
              <DatePicker
                date={sharingEndDate}
                label="Expire on"
                disabled={disableDatePicker}
                onChange={handleDatePickerChange}
              />
            </Box>
          </>
        }
      ></SectionCard>
    </>
  );
};
