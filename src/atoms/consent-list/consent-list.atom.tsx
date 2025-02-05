import React from 'react';
import { Box, List, Pagination } from '@mui/material';
import { ConsentListItem } from '../consent-list-item/consent-list-item.atom';
import { PaginationModel } from '../../types/pagination.type';
import { ConsentResponse } from '@adatree/react-api-sdk-dashboard';

interface Props {
  consents: ConsentResponse[];
  url?: string;
  pagination?: PaginationModel;
  onPagination?: (page: number) => void;
}

export const ConsentList = ({ consents, url = '/consent/', pagination, onPagination }: Props) => {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    event.stopPropagation();
    if (onPagination) {
      onPagination(page);
    }
  };

  return (
    <>
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
      {onPagination && pagination && (
        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
          <Pagination page={pagination.page} count={pagination.totalPages} size="small" onChange={handleChange} />
        </Box>
      )}
    </>
  );
};
