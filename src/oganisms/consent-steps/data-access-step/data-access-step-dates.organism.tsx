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
  const { companyName, useCase, onDateChange } = props;
  const [consentForm, setConsentForm] = useConsentForm();
  const [sharingEndDate, setSharingEndDate] = useState(consentForm.sharingEndDate);
  const [sharingDurations] = useState(useCase.sharingDurations ?? []);
  const [selectedSharingDurations, setSelectedSharingDurations] = useState(consentForm.selectedSharingDurations);
  const [subtitle, setSubtitle] = useState(`How long do you want ${companyName} to be able to access your data?`);

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

  const getDateRender = () => {
    let render = undefined;

    if (!sharingDurations.includes(SharingDuration.CUSTOM) && sharingDurations.length === 1) {
      return render;
    } else if (
      (!sharingDurations.includes(SharingDuration.CUSTOM) && sharingDurations.length > 0) ||
      (sharingDurations.includes(SharingDuration.CUSTOM) && sharingDurations.length > 1)
    ) {
      render = (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: { xs: 'center', sm: 'end' } }}>
          <DateButton
            sharingDuration={sharingDurations}
            selectedSharingDuration={selectedSharingDurations}
            onClick={handleDateButtonClick}
          />
        </Box>
      );
    } else if (sharingDurations.includes(SharingDuration.CUSTOM) && sharingDurations.length > 1) {
      render = (
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
      );
    } else if (sharingDurations.includes(SharingDuration.CUSTOM)) {
      render = (
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
      );
    }

    return render;
  };

  return (
    <>
      <SectionCard title="Sharing expiration date" subtitle={subtitle} content={getDateRender()}></SectionCard>
    </>
  );
};
