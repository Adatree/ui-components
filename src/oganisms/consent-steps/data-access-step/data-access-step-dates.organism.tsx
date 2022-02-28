import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { SharingDuration, UseCaseResponse } from '../../../generated/consent';
import { useConsentForm } from '../../../context/consentForm.context';
import { SectionCard } from '../../../atoms/section-card/section-card.atom';
import { DatePicker } from '../../../atoms/date-picker/date-picker.atom';
import { DateButton } from '../../../atoms/date-button/date-button.atom';

export type DataAccessStepProps = {
  companyName: string;
  useCase: UseCaseResponse;
  onDateChange: () => void;
};

export const DataAccessStepDates = (props: DataAccessStepProps) => {
  const { companyName, onDateChange } = props;
  const [consentForm, setConsentForm] = useConsentForm();
  const [sharingEndDate, setSharingEndDate] = useState(consentForm.sharingEndDate);
  const [sharingDurations] = useState(consentForm.sharingDurations);
  const [selectedSharingDurations, setSelectedSharingDurations] = useState(consentForm.selectedSharingDurations);

  const handleDatePickerChange = (date: Date) => {
    handleSharingEndDateChange(date, SharingDuration.CUSTOM);
  };

  const handleDateButtonClick = (date: Date, sharingDuration: SharingDuration) => {
    handleSharingEndDateChange(date, sharingDuration);
  };

  const handleSharingEndDateChange = (date: Date, selectedSharingDuration: SharingDuration) => {
    consentForm.selectedSharingDurations = selectedSharingDuration;
    consentForm.sharingEndDate = date;
    setSelectedSharingDurations(selectedSharingDuration);
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
            {((!sharingDurations.includes(SharingDuration.CUSTOM) && sharingDurations.length > 0) ||
              (sharingDurations.includes(SharingDuration.CUSTOM) && sharingDurations.length > 1)) && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: { xs: 'center', sm: 'end' } }}>
                <DateButton
                  sharingDuration={sharingDurations}
                  selectedSharingDuration={selectedSharingDurations}
                  onClick={handleDateButtonClick}
                />
              </Box>
            )}
            {sharingDurations.includes(SharingDuration.CUSTOM) && sharingDurations.length > 1 && (
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
            )}
            {sharingDurations.includes(SharingDuration.CUSTOM) && (
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  width: { xs: '100%', sm: 'inherit' },
                  justifyContent: { xs: 'center', sm: 'end' },
                }}
              >
                <DatePicker date={sharingEndDate} label="Expire on" onChange={handleDatePickerChange} />
              </Box>
            )}
          </>
        }
      ></SectionCard>
    </>
  );
};
