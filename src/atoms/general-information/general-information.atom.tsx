import React from 'react';
import { Typography, List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { LinkExternal } from '../links/link-external.atom';

export type GeneralInformationProps = {
  cdrPolicyUrl: string;
  topListItemOverride?: string;
  dataSharingRevocationEmail: string;
};

export const GeneralInformation: React.FC<GeneralInformationProps> = (props) => {
  const {
    cdrPolicyUrl,
    topListItemOverride = 'We will never ask for your bank login password. Your bank will send you a one time password.',
    dataSharingRevocationEmail,
  } = props;

  const generalInfoList = [
    topListItemOverride,
    'We will never sell your data or use it for marketing.',
    <Typography>
      You can stop sharing data at any time by clicking the revoke button in the consent record. You can also write to
      us at <LinkExternal href={`mailto:${dataSharingRevocationEmail}`} text={dataSharingRevocationEmail} />.
    </Typography>,
    'When your consent expires or is revoked, all of the data you shared with us is automatically deleted within seconds.',
    'When you revoke consent, the services we offer may cease to provide you with benefits.',
    <Typography>
      Find out more information on how we handle your data in our easy to read{' '}
      <LinkExternal href={cdrPolicyUrl} text="CDR Policy" />.
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
                sx={{
                  paddingLeft: '0.5rem',
                  display: 'list-item',
                  marginLeft: '2rem',
                  listStyle: 'disc',
                  width: 'calc(100% - 2rem)',
                }}
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
