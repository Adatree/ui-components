import React from 'react';
import { List } from '@mui/material';
import { ConsentResponse, DataHolder } from '../../generated/consent';
import { ConsentListItem } from '../consent-list-item/consent-list-item.atom';

export type ListItemProps = {
  consents: ConsentResponse[];
  dataHolders: DataHolder[];
  url?: string;
};

export const ConsentList: React.FC<ListItemProps> = (props) => {
  const { consents, dataHolders, url = '/consent/' } = props;

  const getDataHolderLogoUrl = (dataHolderBrandId: string | undefined): string => {
    let logoUrl = 'not-found';

    if (!dataHolderBrandId) {
      return logoUrl;
    }

    if (dataHolders) {
      dataHolders.forEach((dataHolder) => {
        if (dataHolder.dataHolderBrandId === dataHolderBrandId) {
          logoUrl = dataHolder.logoUri;
        }
      });
    }

    return logoUrl;
  };

  return (
    <List>
      {consents.map((consent) => (
        <ConsentListItem
          key={consent.consentId}
          consent={consent}
          consentUrl={`${url}${consent.consentId}`}
          dataHolderLogoUrl={getDataHolderLogoUrl(consent.dataHolderBrandId)}
        />
      ))}
    </List>
  );
};
