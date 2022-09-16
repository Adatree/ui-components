import React, { ReactElement } from 'react';
import { Typography, List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { useCopy } from '../../context/copy.context';
import { useDataRecipient } from '../../context/data-recipient.context';
import { DataRecipient } from '../../types/data-recipient.type';

export type DataHandlingInfoProps = {
  dataHandlers: DataRecipient[];
};

export const DataHandlingInfo: React.FC<DataHandlingInfoProps> = (props) => {
  const { dataHandlers } = props;
  const [copy] = useCopy();
  const [dataRecipient] = useDataRecipient();

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

  const renderDataHandlingList = (): ReactElement => {
    return (
      <List>
        {renderListItem(copy.component.general_information.list_marketing, 0)}
        {renderListItem(copy.component.general_information.list_deleted, 1)}
        {renderListItem(
          copy.component.general_information.list_more(copy.common.cdr_policy_label, dataRecipient.cdrPolicyUrl),
          2,
        )}
      </List>
    );
  };

  const renderTrustedAdvisorList = (dataHandler: DataRecipient): ReactElement => {
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
          <Typography variant="h3">{dataRecipient.name}</Typography>
          {renderDataHandlingList()}

          {dataHandlers.map((dataHandler, index) => {
            return (
              <>
                <Typography variant="h3" sx={{ mt: 2 }} key={index}>
                  {dataHandler.name}
                </Typography>
                {renderTrustedAdvisorList(dataHandler)}
              </>
            );
          })}
        </>
      }
    />
  );
};
