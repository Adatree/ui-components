import React from 'react';
import { List } from '@mui/material';
import { ConsentResponse } from '../../generated/consent';
import { ConsentListItem } from '../consent-list-item/consent-list-item.atom';

export type ListItemProps = {
  consents: ConsentResponse[];
};

export const ConsentList: React.FC<ListItemProps> = (props) => {
  const { consents } = props;

  return (
    <List>
      {consents.map((consent) => (
        <ConsentListItem key={consent.consentId} consent={consent} />
      ))}
    </List>
  );
};
