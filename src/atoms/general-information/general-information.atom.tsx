import React from 'react';
import { Typography, List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';

export type GeneralInformationProps = {
  cdrPolicyUrl: string;
  dataSharingRevocationEmail: string;
};

export const GeneralInformation: React.FC<GeneralInformationProps> = (props) => {
  const { cdrPolicyUrl, dataSharingRevocationEmail } = props;

  const generalInfoList = [
    'We will never ask for your bank login password. Your bank will send you a one time password.',
    'We will never sell your data or use it for marketing.',
    <Typography>
      You can stop sharing data at any time by clicking the revoke button in the consent record. You can also write to
      us at{' '}
      <a target="_blank" href={`mailto:${dataSharingRevocationEmail}`}>
        {dataSharingRevocationEmail}
      </a>
      .
    </Typography>,
    'When your consent expires or is revoked, all of the data you shared with us is automatically deleted within seconds.',
    'When you revoke consent, the services we offer may cease to provide you with benefits.',
    <Typography>
      Find out more information on how we handle your data in our easy to read{' '}
      <a target="_blank" href={`${cdrPolicyUrl}`}>
        CDR Policy
      </a>
      .
    </Typography>,
  ];
  return (
    <Accordion
      title="General information"
      content={
        <List>
          {generalInfoList.map((item, index) => {
            return (
              <ListItem
                sx={{ paddingLeft: '8px', display: 'list-item', marginLeft: '32px', listStyle: 'disc' }}
                key={index}
              >
                <ListItemText primary={item} />
              </ListItem>
            );
          })}
        </List>
      }
    />
  );
};
