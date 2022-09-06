import React, { ReactElement } from 'react';
import { Typography, List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { useCopy } from '../../context/copy.context';
import { useOrg } from '../../context/organisation.context';

export type TaRecord = {
  name: string;
  dataPolicyUrl: string;
  protectionFrameworkText: string;
  protectionFrameworkUrl: string;
};

export type DataHandlingInfoProps = {
  taRecords: TaRecord[];
};

export const DataHandlingInfo: React.FC<DataHandlingInfoProps> = (props) => {
  const { taRecords } = props;
  const [copy] = useCopy();
  const [org] = useOrg();

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

  const getAdatreeList = (): ReactElement => {
    return (
      <List>
        {renderListItem(copy.component.general_information.list_marketing, 0)}
        {renderListItem(copy.component.general_information.list_deleted, 1)}
        {renderListItem(
          copy.component.general_information.list_more(copy.common.cdr_policy_label, org.cdrPolicyUrl),
          2,
        )}
      </List>
    );
  };

  const getTaList = (ta: TaRecord): ReactElement => {
    return (
      <List>
        {renderListItem(
          copy.component.data_handling_info.list_protection_framework(
            ta.protectionFrameworkText,
            ta.protectionFrameworkUrl,
          ),
          0,
        )}
        {renderListItem(copy.component.data_handling_info.list_data_policy(ta.name, ta.dataPolicyUrl), 1)}
      </List>
    );
  };

  return (
    <Accordion
      title={copy.component.data_handling_info.title}
      content={
        <>
          <Typography variant="h3">{copy.common.adatree_name}</Typography>
          {getAdatreeList()}

          {taRecords.map((ta, index) => {
            return (
              <>
                <Typography variant="h3" sx={{ mt: 2 }} key={index}>
                  {ta.name}
                </Typography>
                {getTaList(ta)}
              </>
            );
          })}
        </>
      }
    />
  );
};
