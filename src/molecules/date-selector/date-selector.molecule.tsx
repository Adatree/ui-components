import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { SharingDuration } from '../../generated/consent';
import { DatePicker } from '../../atoms/date-picker/date-picker.atom';
import { DateButton } from '../../atoms/date-button/date-button.atom';
import { Helper } from '../../utils/helper/helper';
import { Formatter } from '../../utils/formatter/formater';
import { useConsentForm } from '../../context/consentForm.context';

export type DateSelectorProps = {
  companyName: string;
  sharingDurations: SharingDuration[];
};

export const DateSelector = (props: DateSelectorProps) => {
  const { companyName, sharingDurations } = props;
  const [sharingEndDate, setSharingEndDate] = useState<Date>();
  const [sharingDuration, setSharingDuration] = useState<SharingDuration>();
  const [consentForm, setConsentForm] = useConsentForm();

  const handleDatePickerChange = (date: Date) => {
    handleSharingEndDateChange(date, SharingDuration.CUSTOM);
  };

  const handleDateButtonClick = (date: Date, sharingDuration: SharingDuration) => {
    handleSharingEndDateChange(date, sharingDuration);
  };

  const handleSharingEndDateChange = (date: Date, selectedSharingDuration: SharingDuration) => {
    consentForm.selectedSharingDurations = selectedSharingDuration;
    setConsentForm({ ...consentForm });
    setSharingEndDate(date);
    setSharingDuration(selectedSharingDuration);
  };

  return (
    <>
      {(sharingDurations.length > 1 || sharingDurations.includes(SharingDuration.CUSTOM)) && (
        <Typography sx={{ mb: 2 }}>
          How long would you like <strong>{companyName}</strong> to be able to access your data?
        </Typography>
      )}

      {sharingDurations.length === 1 &&
        !sharingDurations.includes(SharingDuration.CUSTOM) &&
        !sharingDurations.includes(SharingDuration.ONCEOFF) && (
          <Typography sx={{ mb: 1.5 }}>
            <strong>{companyName}</strong> will be able to access your data for{' '}
            <strong>{Helper.sharingDurationToString(sharingDurations[0])}</strong>.
          </Typography>
        )}

      {sharingDurations.length === 1 && sharingDurations.includes(SharingDuration.ONCEOFF) && (
        <Typography sx={{ mb: 1.5 }}>
          <strong>{companyName}</strong> will be able to access your data <strong>once</strong>.
        </Typography>
      )}

      {((!sharingDurations.includes(SharingDuration.CUSTOM) && sharingDurations.length > 1) ||
        (sharingDurations.includes(SharingDuration.CUSTOM) && sharingDurations.length > 1)) && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: { xs: 'center', sm: 'end' } }}>
          <DateButton
            sharingDurations={sharingDurations}
            onClick={handleDateButtonClick}
            selectedSharingDuration={sharingDuration}
          />
        </Box>
      )}
      {sharingDurations.includes(SharingDuration.CUSTOM) && sharingDurations.length > 1 && (
        <Typography
          variant="body2"
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
      {sharingEndDate && sharingDuration === SharingDuration.CUSTOM && (
        <Typography sx={{ my: 1.5 }}>
          <strong>{companyName}</strong> will be able to access your data untill the{' '}
          <strong>{Formatter.formatDateTime(sharingEndDate)}</strong>.
        </Typography>
      )}
      {sharingDuration && sharingDuration !== SharingDuration.CUSTOM && (
        <Typography sx={{ my: 1.5 }}>
          <strong>{companyName}</strong> will be able to access your data{' '}
          {sharingDuration === SharingDuration.ONCEOFF && (
            <>
              <strong>once</strong>.
            </>
          )}
          {sharingDuration !== SharingDuration.ONCEOFF && (
            <>
              for <strong>{Helper.sharingDurationToString(sharingDuration)}</strong>.
            </>
          )}
        </Typography>
      )}
    </>
  );
};
