import React, { ReactElement } from 'react';
import { Typography, List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { useCopy } from '../../context/copy.context';
import { useOrg } from '../../context/organisation.context';
import { TrustedAdvisorResponse } from '../../types/trusted-advisor.type';

export type DataHandlingInfoProps = {
  trustedAdvisors: TrustedAdvisorResponse[];
};

export const DataHandlingInfo: React.FC<DataHandlingInfoProps> = (props) => {
  const { trustedAdvisors } = props;
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

  const renderDataHandlingList = (): ReactElement => {
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

  const renderTrustedAdvisorList = (trustedAdvisor: TrustedAdvisorResponse): ReactElement => {
    return (
      <List>
        {renderListItem(
          copy.component.data_handling_info.list_protection_framework(
            trustedAdvisor.name,
            trustedAdvisor.protectionFrameworkUrl,
          ),
          0,
        )}
        {renderListItem(
          copy.component.data_handling_info.list_data_policy(trustedAdvisor.name, trustedAdvisor.dataPolicyUrl),
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
          <Typography variant="h3">{org.name}</Typography>
          {renderDataHandlingList()}

          {trustedAdvisors.map((trustedAdvisor, index) => {
            return (
              <>
                <Typography variant="h3" sx={{ mt: 2 }} key={index}>
                  {trustedAdvisor.name}
                </Typography>
                {renderTrustedAdvisorList(trustedAdvisor)}
              </>
            );
          })}
        </>
      }
    />
  );
};
