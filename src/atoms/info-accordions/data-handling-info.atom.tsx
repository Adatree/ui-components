import React, { ReactElement } from 'react';
import { Typography, List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { useCopy } from '../../context/copy.context';
import { DataRecipient, DataRecipientType } from '../../types/data-recipient.type';

interface Props {
  dataHandlers: DataRecipient[];
}

export const DataHandlingInfo = (props: Props) => {
  const { dataHandlers } = props;
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

  const renderAdrList = (dataHandler: DataRecipient): ReactElement => {
    return (
      <List sx={{ mb: '2rem' }}>
        {renderListItem(copy.component.general_information.list_marketing(dataHandler.name), 0)}
        {renderListItem(copy.component.general_information.list_security(dataHandler.name), 1)}
        {renderListItem(copy.component.general_information.list_deleted, 2)}
        {renderListItem(
          copy.component.general_information.list_third_party_more_info(dataHandler.name, dataHandler.cdrPolicyUrl),
          3,
        )}
      </List>
    );
  };

  const renderCdrrList = (dataHandler: DataRecipient): ReactElement => {
    return (
      <List sx={{ mb: '2rem' }}>
        {renderListItem(copy.component.general_information.list_cdr_acknowledgement(dataHandler.name), 0)}
        {renderListItem(
          copy.component.general_information.list_third_party_more_info(dataHandler.name, dataHandler.cdrPolicyUrl),
          1,
        )}
      </List>
    );
  };

  const renderNonAdrList = (dataHandler: DataRecipient): ReactElement => {
    return (
      <List sx={{ mb: '2rem' }}>
        {renderListItem(copy.component.data_handling_info.list_non_adr_disclaimer(dataHandler.name), 0)}
        {renderListItem(
          copy.component.data_handling_info.list_data_policy(dataHandler.name, dataHandler.cdrPolicyUrl),
          1,
        )}
      </List>
    );
  };

  const renderTaList = (dataHandler: DataRecipient): ReactElement => {
    return (
      <List sx={{ mb: '2rem' }}>
        {renderListItem(copy.component.data_handling_info.list_data_policy(dataHandler.name), 0)}
      </List>
    );
  };

  const renderTaspList = (dataHandler: DataRecipient): ReactElement => {
    return (
      <List sx={{ mb: '2rem' }}>
        {renderListItem(copy.component.general_information.list_tasp_context(dataHandler), 0)}
      </List>
    );
  };

  return (
    <Accordion
      title={copy.component.data_handling_info.title}
      content={
        <>
          {dataHandlers.map((dataHandler, index) => {
            return (
              <div key={index}>
                <Typography variant="h4">{dataHandler.name}</Typography>
                <Typography sx={{ mt: 1 }}>{dataHandler.description}</Typography>

                {dataHandler.type === DataRecipientType.ACCREDITED_DATA_RECIPIENT && <>{renderAdrList(dataHandler)}</>}

                {dataHandler.type === DataRecipientType.CDR_REPRESENTATIVE && <>{renderCdrrList(dataHandler)}</>}

                {dataHandler.type === DataRecipientType.TRUSTED_ADVISER && <>{renderTaList(dataHandler)}</>}

                {dataHandler.type === DataRecipientType.TRUSTED_ADVISER_SERVICE_PROVIDER && (
                  <>{renderTaspList(dataHandler)}</>
                )}

                {dataHandler.type === DataRecipientType.NON_ACCREDITED_PERSON && <>{renderNonAdrList(dataHandler)}</>}
              </div>
            );
          })}
        </>
      }
    />
  );
};
