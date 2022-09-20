import React, { ReactElement } from 'react';
import { Typography, List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { LinkExternal } from '../links/link-external.atom';
import { useCopy } from '../../context/copy.context';
import { useDataRecipients } from '../../context/data-recipient.context';
import { DataRecipientType } from '../../types/data-recipient.type';

export type GeneralInformationProps = {
  hideDuplicateListItem?: boolean;
};

export const GeneralInformation: React.FC<GeneralInformationProps> = (props) => {
  const { hideDuplicateListItem = false } = props;
  const [copy] = useCopy();
  const { adrDataRecipient, primaryDataRecipient } = useDataRecipients();

  const renderListItem = (text: ReactElement | string): ReactElement => {
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
      >
        <ListItemText primary={text} />
      </ListItem>
    );
  };

  const getList = (): ReactElement => {
    return (
      <List>
        {primaryDataRecipient.type !== DataRecipientType.ACCREDITED_DATA_RECIPIENT &&
          renderListItem(
            copy.component.general_information.list_adr_context(primaryDataRecipient.name, adrDataRecipient.name),
          )}
        {renderListItem(copy.component.general_information.list_security(adrDataRecipient.name))}
        {!hideDuplicateListItem &&
          renderListItem(copy.component.general_information.list_marketing(adrDataRecipient.name))}
        {renderListItem(
          <Typography>
            {copy.component.general_information.list_records}{' '}
            <LinkExternal
              href={`mailto:${adrDataRecipient.dataSharingRevocationEmail}`}
              text={adrDataRecipient.dataSharingRevocationEmail}
            />
            .
          </Typography>,
        )}
        {renderListItem(
          <Typography>
            {copy.component.general_information.list_sharing}{' '}
            <LinkExternal
              href={`mailto:${adrDataRecipient.dataSharingRevocationEmail}`}
              text={adrDataRecipient.dataSharingRevocationEmail}
            />
            .
          </Typography>,
        )}
        {!hideDuplicateListItem && renderListItem(copy.component.general_information.list_deleted)}
        {renderListItem(copy.component.general_information.list_revoked)}
        {!hideDuplicateListItem &&
          renderListItem(
            <Typography>
              {copy.component.general_information.list_primary_more_info(
                copy.common.cdr_policy_label,
                adrDataRecipient.cdrPolicyUrl,
              )}
            </Typography>,
          )}
        {renderListItem(
          <Typography>{copy.component.general_information.list_complaint(adrDataRecipient.complaintEmail)}</Typography>,
        )}
      </List>
    );
  };

  return <Accordion title={copy.component.general_information.title} content={getList()} />;
};
