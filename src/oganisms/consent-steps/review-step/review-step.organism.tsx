import React, { useState } from 'react';
import Bank from 'mdi-material-ui/Bank';
import Calendar from 'mdi-material-ui/Calendar';
import CheckboxMultipleMarked from 'mdi-material-ui/CheckboxMultipleMarked';
import Incognito from 'mdi-material-ui/Incognito';
import DeleteCircle from 'mdi-material-ui/Delete';
import CloudUpload from 'mdi-material-ui/CloudUpload';
import { Typography, List, Box } from '@mui/material';
import { PostUsageAction, SharingDuration, UseCaseResponse } from '../../../generated/consent';
import { useConsentForm } from '../../../context/consentForm.context';
import { Formatter } from '../../../utils/formatter/formater';
import { Helper } from '../../../utils/helper/helper';
import { IconListItem } from '../../../atoms/icon-list-item/icon-list-item.atom';

export type ReviewStepProps = {
  useCase: UseCaseResponse;
};

export const ReviewStep = (props: ReviewStepProps) => {
  let dateDurationText = '';

  const { useCase } = props;
  const [consentForm] = useConsentForm();

  const [postActionText] = useState(
    consentForm.postUsageAction === PostUsageAction.DEIDENTIFICATION ? 'de-identifed' : 'deleted',
  );
  const [postActionIcon] = useState(
    consentForm.postUsageAction === PostUsageAction.DEIDENTIFICATION ? (
      <Incognito color="primary" />
    ) : (
      <DeleteCircle color="primary" />
    ),
  );
  const [sharindEndDate] = useState(
    consentForm.selectedSharingDurations === SharingDuration.ONCEOFF
      ? 'after first use'
      : Formatter.formatDate(consentForm.sharingEndDate),
  );

  if (consentForm.selectedSharingDurations === SharingDuration.CUSTOM) {
    dateDurationText = `ending on the ${Formatter.formatDate(consentForm.sharingEndDate)}`;
  } else if (consentForm.selectedSharingDurations) {
    dateDurationText = Helper.parseSharingDuration([consentForm.selectedSharingDurations])[0].text;
  }

  const brandName = consentForm.dataHolder ? consentForm.dataHolder.brandName : '';

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Summary
      </Typography>

      <List>
        <IconListItem icon={<Bank color="primary" />} content={`Your bank is ${brandName}`} />
        <IconListItem icon={<CloudUpload color="primary" />} content={`Data sharing will be ${dateDurationText}`} />
        <IconListItem icon={<Calendar color="primary" />} content={`Sharing ends ${sharindEndDate}`} />
        <IconListItem
          icon={postActionIcon}
          content={`The data you share will be ${postActionText} when we're finished`}
        />
        <IconListItem
          alignIcon="flex-start"
          icon={<CheckboxMultipleMarked color="primary" />}
          content={
            <>
              <Typography sx={{ mb: 0.5 }}>You are sharing:</Typography>
              <ul className="list">
                {useCase.scopes &&
                  useCase.scopes.map((scope) => (
                    <li key={scope.id}>
                      <Typography variant="body2">{scope.name}</Typography>
                    </li>
                  ))}
              </ul>
            </>
          }
        />
      </List>

      <Typography sx={{ mt: 3 }}>
        When you consent you will be taken to {brandName} to confirm you want to share your data with us.
      </Typography>
    </Box>
  );
};
