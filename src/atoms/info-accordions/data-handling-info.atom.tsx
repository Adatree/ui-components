import React, { ReactElement } from 'react';
import { Typography, List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { useCopy } from '../../context/copy.context';
import { DataRecipient, DataRecipientType } from '../../types/data-recipient.type';

export type DataHandlingInfoProps = {
  dataHandlers: DataRecipient[];
};

export const DataHandlingInfo: React.FC<DataHandlingInfoProps> = (props) => {
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
        {renderListItem(copy.component.general_information.list_deleted, 1)}
        {renderListItem(
          copy.component.general_information.list_third_party_more_info(dataHandler.name, dataHandler.cdrPolicyUrl),
          2,
        )}
      </List>
    );
  };

  const renderCdrrList = (dataHandler: DataRecipient): ReactElement => {
    return (
      <List sx={{ mb: '2rem' }}>
        {renderListItem(
          copy.component.general_information.list_third_party_more_info(dataHandler.name, dataHandler.cdrPolicyUrl),
          0,
        )}
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
                <Typography variant="h3">{dataHandler.name}</Typography>
                <Typography sx={{ mt: 1 }}>{dataHandler.description}</Typography>

                {dataHandler.type === DataRecipientType.ACCREDITED_DATA_RECIPIENT && <>{renderAdrList(dataHandler)}</>}

                {dataHandler.type === DataRecipientType.CDR_REPRESENTATIVE && <>{renderCdrrList(dataHandler)}</>}

                {dataHandler.type === DataRecipientType.TRUSTED_ADVISER_SERVICE_PROVIDER && (
                  <>{renderTaspList(dataHandler)}</>
                )}
              </div>
            );
          })}
        </>
      }
    />
  );
};
