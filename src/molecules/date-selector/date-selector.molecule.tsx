import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { SharingDuration } from '../../generated/consent';
import { DatePicker } from '../../atoms/date-picker/date-picker.atom';
import { DateButton } from '../../atoms/date-button/date-button.atom';
import { Helper } from '../../utils/helper/helper';
import { Formatter } from '../../utils/formatter/formatter';
import { useConsentForm } from '../../context/consentForm.context';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';

export type DateSelectorProps = {
  companyName: string;
  sharingDurations: SharingDuration[];
  showSharingDurationsOptions?: boolean;
};

export const DateSelector = (props: DateSelectorProps) => {
  const { companyName, sharingDurations, showSharingDurationsOptions = false } = props;
  const [sharingEndDate, setSharingEndDate] = useState<Date>();
  const [sharingDuration, setSharingDuration] = useState<SharingDuration>();
  const [consentForm, setConsentForm] = useConsentForm();

  let showAllOptions = showSharingDurationsOptions;

  if (sharingDurations.length === 1 && sharingDurations[0] === SharingDuration.OnceOff) {
    showAllOptions = false;
  }

  const handleDatePickerChange = (date: Date) => {
    handleSharingEndDateChange(date, SharingDuration.Custom);
  };

  const handleDateButtonClick = (date: Date, sharingDuration: SharingDuration) => {
    handleSharingEndDateChange(date, sharingDuration);
  };

  const handleSharingEndDateChange = (date: Date, selectedSharingDuration: SharingDuration) => {
    consentForm.selectedSharingDurations = selectedSharingDuration;
    consentForm.sharingEndDate = date;
    setConsentForm({ ...consentForm });
    setSharingEndDate(date);
    setSharingDuration(selectedSharingDuration);
  };

  return (
    <>
      {(showAllOptions || sharingDurations.length > 1 || sharingDurations.includes(SharingDuration.Custom)) && (
        <Typography sx={{ mb: 2 }}>
          How long would you like <Highlight>{companyName}</Highlight> to be able to access your data?
        </Typography>
      )}

      {!showAllOptions &&
        sharingDurations.length === 1 &&
        !sharingDurations.includes(SharingDuration.Custom) &&
        !sharingDurations.includes(SharingDuration.OnceOff) && (
          <Typography sx={{ mb: 1.5 }}>
            <Highlight>{companyName}</Highlight> will be able to access your data for{' '}
            <Highlight>{Helper.sharingDurationToString(sharingDurations[0])}</Highlight>.
          </Typography>
        )}

      {!showAllOptions && sharingDurations.length === 1 && sharingDurations.includes(SharingDuration.OnceOff) && (
        <Typography sx={{ mb: 1.5 }}>
          <Highlight>{companyName}</Highlight> will be able to access your data <Highlight>once</Highlight>.
        </Typography>
      )}

      {(showAllOptions || sharingDurations.length > 1) && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
          <DateButton
            sharingDurations={sharingDurations}
            onClick={handleDateButtonClick}
            selectedSharingDuration={sharingDuration}
          />
        </Box>
      )}
      {sharingDurations.includes(SharingDuration.Custom) && sharingDurations.length > 1 && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            mr: { xs: 0, sm: 12 },
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-end' },
          }}
        >
          or
        </Typography>
      )}
      {sharingDurations.includes(SharingDuration.Custom) && (
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            width: { xs: '100%', sm: 'inherit' },
            justifyContent: { xs: 'center', sm: 'flex-end' },
          }}
        >
          <DatePicker date={sharingEndDate} label="Expire on" onChange={handleDatePickerChange} />
        </Box>
      )}
      {sharingEndDate && sharingDuration === SharingDuration.Custom && (
        <Typography sx={{ my: 1.5 }}>
          <Highlight>{companyName}</Highlight> will be able to access your data until the{' '}
          <Highlight>{Formatter.formatDateTime(sharingEndDate)}</Highlight>.
        </Typography>
      )}
      {sharingDuration && sharingDuration !== SharingDuration.Custom && (
        <Typography sx={{ my: 1.5 }}>
          <Highlight>{companyName}</Highlight> will be able to access your data{' '}
          {sharingDuration === SharingDuration.OnceOff && (
            <>
              <Highlight>once</Highlight>.
            </>
          )}
          {sharingDuration !== SharingDuration.OnceOff && (
            <>
              for <Highlight>{Helper.sharingDurationToString(sharingDuration)}</Highlight>.
            </>
          )}
        </Typography>
      )}
    </>
  );
};
