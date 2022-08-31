import React from 'react';
import { Typography, List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { LinkExternal } from '../links/link-external.atom';
import { useCopy } from '../../context/copy.context';

export type GeneralInformationProps = {
  cdrPolicyUrl: string;
  topListItemOverride?: string;
  dataSharingRevocationEmail: string;
};

export const GeneralInformation: React.FC<GeneralInformationProps> = (props) => {
  const { cdrPolicyUrl, topListItemOverride, dataSharingRevocationEmail } = props;
  const [copy] = useCopy();

  const generalInfoList = [
    topListItemOverride ? topListItemOverride : copy.component.general_information.list_security,
    copy.component.general_information.list_marketing,
    <Typography>
      {copy.component.general_information.list_records}{' '}
      <LinkExternal href={`mailto:${dataSharingRevocationEmail}`} text={dataSharingRevocationEmail} />.
    </Typography>,
    <Typography>
      {copy.component.general_information.list_sharing}{' '}
      <LinkExternal href={`mailto:${dataSharingRevocationEmail}`} text={dataSharingRevocationEmail} />.
    </Typography>,
    copy.component.general_information.list_deleted,
    copy.component.general_information.list_revoked,
    <Typography>
      {copy.component.general_information.list_more}{' '}
      <LinkExternal href={cdrPolicyUrl} text={copy.common.cdr_policy_label} />.
    </Typography>,
  ];
  return (
    <Accordion
      title={copy.component.general_information.title}
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
