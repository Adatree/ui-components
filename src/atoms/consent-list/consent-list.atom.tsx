import React from 'react';
import { List } from '@mui/material';
import { ConsentResponse } from '../../generated/consent';
import { ConsentListItem } from '../consent-list-item/consent-list-item.atom';

export type ListItemProps = {
  consents: ConsentResponse[];
  url?: string;
};

export const ConsentList: React.FC<ListItemProps> = (props) => {
  const { consents, url = '/consent/' } = props;

  return (
    <List>
      {consents.map((consent) => (
        <ConsentListItem
          key={consent.consentId}
          consent={consent}
          consentUrl={`${url}${consent.consentId}`}
          dataHolderLogoUrl={consent.dataHolderLogoUri}
        />
      ))}
    </List>
  );
};
