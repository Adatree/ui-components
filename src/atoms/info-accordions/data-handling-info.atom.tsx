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
      <List>
        {renderListItem(copy.component.general_information.list_marketing, 0)}
        {renderListItem(copy.component.general_information.list_deleted, 1)}
        {renderListItem(
          copy.component.general_information.list_more(copy.common.cdr_policy_label, dataHandler.cdrPolicyUrl),
          2,
        )}
      </List>
    );
  };

  const renderNonAdrList = (dataHandler: DataRecipient): ReactElement => {
    return (
      <List>
        {renderListItem(
          copy.component.data_handling_info.list_protection_framework(
            dataHandler.name,
            dataHandler.protectionFrameworkUrl,
          ),
          0,
        )}
        {renderListItem(
          copy.component.data_handling_info.list_data_policy(dataHandler.name, dataHandler.dataPolicyUrl),
          1,
        )}
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
              <>
                {dataHandler.type === DataRecipientType.ACCREDITED_DATA_RECIPIENT && (
                  <>
                    <Typography variant="h3">{dataHandler.name}</Typography>
                    {renderAdrList(dataHandler)}
                  </>
                )}

                {dataHandler.type !== DataRecipientType.ACCREDITED_DATA_RECIPIENT && (
                  <>
                    <Typography variant="h3" sx={{ mt: 2 }} key={index}>
                      {dataHandler.name}
                    </Typography>
                    {renderNonAdrList(dataHandler)}
                  </>
                )}
              </>
            );
          })}
        </>
      }
    />
  );
};
