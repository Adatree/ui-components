import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { AccessFrequency, PostUsageAction, UseCaseResponse } from '../../../generated/consent';
import { useConsentForm } from '../../../context/consentForm.context';
import { UseCaseScopeList } from '../../../molecules/use-case-scope-list/use-case-scope-list.molecule';
import { SectionCard } from '../../../atoms/section-card/section-card.atom';
import { RadioButtonWithText } from '../../../atoms/radio-button-with-text/radio-button-with-text.atom';
import { DatePicker } from '../../../atoms/date-picker/date-picker.atom';
import { DateButton, DateOption } from '../../../atoms/date-button/date-button.atom';
import { Helper } from '../../../utils/helper/helper';

export type DataAccessStepProps = {
  companyName: string;
  useCase: UseCaseResponse;
  isValid: (isValid: boolean) => void;
};

export const DataAccessStep = (props: DataAccessStepProps) => {
  const { companyName, useCase, isValid } = props;
  const [consentForm, setConsentForm] = useConsentForm();
  const [disableDatePicker, setDisableDatePicker] = useState(consentForm.accessFrequency !== AccessFrequency.ONGOING);
  const [accessFrequencyDefault] = useState(consentForm.accessFrequency);
  const [postUsageActionDefault] = useState(consentForm.postUsageAction);
  const [sharingEndDate, setSharingEndDate] = useState(consentForm.sharingEndDate);
  const [dateOptions, setDateOptions] = useState(consentForm.dateOptions);

  const handleUseCaseScopeListChange = (isChecked: boolean, value: string) => {
    if (isChecked) {
      consentForm.checkedScopes = [...consentForm.checkedScopes, value];
      setConsentForm({ ...consentForm });
    } else {
      consentForm.checkedScopes = [...consentForm.checkedScopes.filter((item) => item !== value)];
      setConsentForm({ ...consentForm });
    }

    isStepValid();
  };

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

    isStepValid();
  };

  const handlePostUsageActionRadioChange = (value: string) => {
    if (value === PostUsageAction.DEIDENTIFICATION) {
      consentForm.postUsageAction = PostUsageAction.DEIDENTIFICATION;
      setConsentForm({ ...consentForm });
    } else if (value === PostUsageAction.DELETION) {
      consentForm.postUsageAction = PostUsageAction.DELETION;
      setConsentForm({ ...consentForm });
    }

    isStepValid();
  };

  const handleDatePickerChange = (date: Date) => {
    updateDateOptions([...Helper.clearDateOptions(dateOptions)]);
    handleSharingEndDateChange(date);
  };

  const handleDateButtonClick = (date: Date, dateOptions: DateOption[]) => {
    updateDateOptions(dateOptions);
    handleSharingEndDateChange(date);
  };

  const updateDateOptions = (dateOptions: DateOption[]) => {
    consentForm.dateOptions = dateOptions;
    setConsentForm({ ...consentForm });
    setDateOptions([...dateOptions]);
  };

  const handleSharingEndDateChange = (date: Date) => {
    consentForm.sharingEndDate = date;
    setConsentForm({ ...consentForm });
    setSharingEndDate(date);
  };

  const isStepValid = () => {
    if (useCase.scopes) {
      isValid(
        consentForm.checkedScopes.length === useCase.scopes.length &&
          !!consentForm.accessFrequency &&
          !!consentForm.postUsageAction,
      );
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <UseCaseScopeList
          title="The data we need"
          subtitle={
            useCase ? `We need to collect the below information in order to provide you with ${useCase.name}.` : ''
          }
          useCase={useCase}
          checkedValues={consentForm.checkedScopes}
          onChange={handleUseCaseScopeListChange}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
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
              {dateOptions.length > 0 && (
                <>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: { xs: 'center', sm: 'end' } }}>
                    <DateButton
                      dateOptions={dateOptions}
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
      </Box>

      <Box sx={{ mb: 4 }}>
        <SectionCard
          title="Data retention"
          subtitle={`What should ${companyName} do with your redundant data at consent expiry or withdrawal?`}
          tooltip={
            <>
              <Typography sx={{ mb: 1 }}>
                This option determines what {companyName} will do with your data at consent expiry or withdrawal.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Delete</strong>: We will Delete your data at consent expiry or withdrawal.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>De-identify</strong>: We will De-identify your data at consent expiry or withdrawal.
              </Typography>
            </>
          }
          content={
            <>
              <RadioButtonWithText
                defaultValue={postUsageActionDefault}
                radioButtonItems={[
                  {
                    label: 'Delete',
                    value: PostUsageAction.DELETION,
                  },
                  {
                    label: 'De-identify',
                    value: PostUsageAction.DEIDENTIFICATION,
                  },
                ]}
                onChange={handlePostUsageActionRadioChange}
              />
            </>
          }
        ></SectionCard>
      </Box>
    </>
  );
};
