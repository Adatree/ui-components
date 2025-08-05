import React, { ReactElement } from 'react';
import { List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { useCopy } from '../../context/copy.context';
import { useDataRecipients } from '../../context/data-recipient.context';
import { DataRecipientType } from '../../types/data-recipient.type';

interface Props {
  hideDuplicateListItem?: boolean;
}

export const GeneralInformation = (props: Props) => {
  const { hideDuplicateListItem = false } = props;
  const [copy] = useCopy();
  const { adrDataRecipient, primaryDataRecipient, nonAdrDataRecipient } = useDataRecipients();

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
      <List sx={{ wordBreak: 'break-word' }}>
        {primaryDataRecipient.type !== DataRecipientType.ACCREDITED_DATA_RECIPIENT &&
          renderListItem(copy.component.general_information.list_adr_context)}
        {primaryDataRecipient.type === DataRecipientType.TRUSTED_ADVISER && (
          <>
            {renderListItem(copy.component.general_information.list_ta_acknowledgement)}
            {renderListItem(copy.component.general_information.list_cdr_protection)}
          </>
        )}
        {primaryDataRecipient.type === DataRecipientType.TRUSTED_ADVISER_SERVICE_PROVIDER &&
          renderListItem(copy.component.general_information.list_cdr_protection)}
        {primaryDataRecipient.type !== DataRecipientType.ACCREDITED_DATA_RECIPIENT &&
          renderListItem(copy.component.data_handling_info.list_data_policy(primaryDataRecipient.name))}
        {!hideDuplicateListItem &&
          renderListItem(copy.component.general_information.list_security(adrDataRecipient.name))}
        {!hideDuplicateListItem &&
          renderListItem(copy.component.general_information.list_marketing(adrDataRecipient.name))}
        {!nonAdrDataRecipient && renderListItem(copy.component.general_information.list_records)}
        {nonAdrDataRecipient && renderListItem(copy.component.general_information.list_records_with_insights)}
        {renderListItem(copy.component.general_information.list_sharing)}
        {!hideDuplicateListItem &&
          !nonAdrDataRecipient &&
          renderListItem(copy.component.general_information.list_deleted)}
        {!hideDuplicateListItem &&
          nonAdrDataRecipient &&
          renderListItem(copy.component.general_information.list_deleted_with_insights)}
        {renderListItem(copy.component.general_information.list_revoked)}
        {!hideDuplicateListItem && renderListItem(copy.component.general_information.list_primary_more_info)}
        {renderListItem(copy.component.general_information.list_complaint)}
        {renderListItem(copy.component.general_information.list_manage_consent)}
      </List>
    );
  };

  return <Accordion title={copy.component.general_information.title} content={getList()} />;
};
