import React, { useState } from 'react';
import Bank from 'mdi-material-ui/Bank';
import Calendar from 'mdi-material-ui/Calendar';
import CheckboxMultipleMarked from 'mdi-material-ui/CheckboxMultipleMarked';
import Incognito from 'mdi-material-ui/Incognito';
import DeleteCircle from 'mdi-material-ui/Delete';
import CloudUpload from 'mdi-material-ui/CloudUpload';
import { Typography, List, Box } from '@mui/material';
import { AccessFrequency, PostUsageAction, SharingDuration, UseCaseResponse } from '../../../generated/consent';
import { useConsentForm } from '../../../context/consentForm.context';
import { Formatter } from '../../../utils/formatter/formater';
import { IconListItem } from '../../../atoms/icon-list-item/icon-list-item.atom';
import {
  OutsourcedServiceProvider,
  SupportingParties,
} from '../../../molecules/supporting-parties/supporting-parties.molecule';
import { GeneralInformation } from '../../../atoms/general-information/general-information.atom';

export type ReviewStepProps = {
  useCase: UseCaseResponse;
  cdrPolicyUrl: string;
  dataSharingRevocationEmail: string;
  outsourcedServiceProvider?: OutsourcedServiceProvider[];
};

export const ReviewStep = (props: ReviewStepProps) => {
  const { useCase, cdrPolicyUrl, dataSharingRevocationEmail, outsourcedServiceProvider } = props;
  const [consentForm] = useConsentForm();
  const [dataAccessText] = useState(
    useCase.accessFrequency === AccessFrequency.ONGOING ? 'may occur multiple times per day' : 'will be once off',
  );
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
      : Formatter.formatDateTime(consentForm.sharingEndDate),
  );

  const brandName = consentForm.dataHolder ? consentForm.dataHolder.brandName : '';

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Summary
      </Typography>

      <List>
        <IconListItem icon={<Bank color="primary" />} content={`Your bank is ${brandName}`} />
        <IconListItem icon={<CloudUpload color="primary" />} content={`Data access ${dataAccessText}`} />
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
                  useCase.scopes.map((scope, index) => (
                    <li key={index}>
                      <Typography variant="body2">{scope.name}</Typography>
                    </li>
                  ))}
              </ul>
            </>
          }
        />
      </List>

      <Typography sx={{ mt: 2, mb: 4 }}>
        When you consent you will be taken to {brandName} to confirm you want to share your data with us.
      </Typography>

      <Typography variant="h3" sx={{ mb: 2 }}>
        Key things to know before you consent
      </Typography>

      <GeneralInformation cdrPolicyUrl={cdrPolicyUrl} dataSharingRevocationEmail={dataSharingRevocationEmail} />

      {outsourcedServiceProvider && (
        <>
          <SupportingParties
            title={'Supporting parties'}
            useCase={useCase}
            outsourcedServiceProvider={outsourcedServiceProvider}
          />
        </>
      )}
    </Box>
  );
};
