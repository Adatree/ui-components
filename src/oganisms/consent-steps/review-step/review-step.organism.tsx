import React, { useState } from 'react';
import Bank from 'mdi-material-ui/Bank';
import Calendar from 'mdi-material-ui/Calendar';
import CheckboxMultipleMarked from 'mdi-material-ui/CheckboxMultipleMarked';
import Incognito from 'mdi-material-ui/Incognito';
import DeleteCircle from 'mdi-material-ui/Delete';
import CloudUpload from 'mdi-material-ui/CloudUpload';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { PostUsageAction, SharingDuration, UseCaseResponse } from '../../../generated/consent';
import { useConsentForm } from '../../../context/consentForm.context';
import { Formatter } from '../../../utils/formatter/formater';
import { Helper } from '../../../utils/helper/helper';

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
    consentForm.postUsageAction === PostUsageAction.DEIDENTIFICATION ? <Incognito /> : <DeleteCircle />,
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
        <ListItem>
          <ListItemIcon>
            <Bank />
          </ListItemIcon>
          <ListItemText primary={`Your bank is ${brandName}`} />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <CloudUpload />
          </ListItemIcon>
          <ListItemText primary={`Data sharing will be ${dateDurationText}`} />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Calendar />
          </ListItemIcon>
          <ListItemText primary={`Sharing ends ${sharindEndDate}`} />
        </ListItem>

        <ListItem>
          <ListItemIcon>{postActionIcon}</ListItemIcon>
          <ListItemText primary={`The data you share will be ${postActionText} when we're finished`} />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <CheckboxMultipleMarked />
          </ListItemIcon>
          <Box>
            <ListItemText primary="You are sharing:" />
            <ul className="list">
              {useCase.scopes &&
                useCase.scopes.map((scope) => (
                  <li key={scope.id}>
                    <Typography variant="body2">{scope.name}</Typography>
                  </li>
                ))}
            </ul>
          </Box>
        </ListItem>
      </List>

      <Typography sx={{ mt: 3 }}>
        When you consent you will be taken to {brandName} to confirm you want to share your bank information with us.
      </Typography>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Consent may be withdrawn at any time for us to receive your data, either through our consent dashboard, from{' '}
        {brandName}&apos;s consent dashboard, or in writing to either party. If you withdraw consent, the services we
        offer may cease to provide you with benefits.
      </Typography>
    </Box>
  );
};
