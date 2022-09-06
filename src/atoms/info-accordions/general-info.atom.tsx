import React, { ReactElement } from 'react';
import { Typography, List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { LinkExternal } from '../links/link-external.atom';
import { useCopy } from '../../context/copy.context';

export type GeneralInformationProps = {
  cdrPolicyUrl: string;
  topListItemOverride?: string;
  dataSharingRevocationEmail: string;
  hideDuplicateListItem?: boolean;
};

export const GeneralInformation: React.FC<GeneralInformationProps> = (props) => {
  const { cdrPolicyUrl, topListItemOverride, dataSharingRevocationEmail, hideDuplicateListItem = false } = props;
  const [copy] = useCopy();

  const renderListItem = (text: ReactElement | string, key: number): ReactElement => {
    return (
      <ListItem
        sx={{
          py: '4px',
          pl: '0.5rem',
          display: 'list-item',
          ml: '2rem',
          listStyle: 'disc',
          width: 'calc(100% - 2rem)',
        }}
        key={key}
      >
        <ListItemText primary={text} />
      </ListItem>
    );
  };

  const getList = (): ReactElement => {
    return (
      <List>
        {renderListItem(
          topListItemOverride ? topListItemOverride : copy.component.general_information.list_security,
          0,
        )}
        {!hideDuplicateListItem && renderListItem(copy.component.general_information.list_marketing, 1)}
        {renderListItem(
          <Typography key="item1">
            {copy.component.general_information.list_records}{' '}
            <LinkExternal href={`mailto:${dataSharingRevocationEmail}`} text={dataSharingRevocationEmail} />.
          </Typography>,
          2,
        )}
        {renderListItem(
          <Typography key="item2">
            {copy.component.general_information.list_sharing}{' '}
            <LinkExternal href={`mailto:${dataSharingRevocationEmail}`} text={dataSharingRevocationEmail} />.
          </Typography>,
          3,
        )}
        {!hideDuplicateListItem && renderListItem(copy.component.general_information.list_deleted, 4)}
        {renderListItem(copy.component.general_information.list_revoked, 5)}
        {!hideDuplicateListItem &&
          renderListItem(
            <Typography key="item3">
              {copy.component.general_information.list_more(copy.common.cdr_policy_label, cdrPolicyUrl)}
            </Typography>,
            6,
          )}
      </List>
    );
  };

  return <Accordion title={copy.component.general_information.title} content={getList()} />;
};
