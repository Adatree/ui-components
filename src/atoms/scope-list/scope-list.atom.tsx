import React from 'react';
import { Box, List, Typography } from '@mui/material';
import { ScopeResponse } from '../../generated/consent';
import { Accordion } from '../accordion/accordion.molecule';

export type ScopeListProps = {
  scopes: ScopeResponse[];
  companyName: string;
};

export const ScopeList: React.FC<ScopeListProps> = (props) => {
  const { scopes, companyName } = props;

  const renderScopeClaims = (scope: ScopeResponse) => {
    return (
      <>
        <Box sx={{ p: 2 }}>
          <Typography sx={{ mb: 1, opacity: 0.7 }} variant="h4">
            {scope.purpose}
          </Typography>
          <Typography sx={{ mb: 1, opacity: 0.7 }} variant="h4">
            {`${companyName} will receive access to the following information:`}
          </Typography>

          {scope.claims && (
            <ul>
              {scope.claims.map((claim: string, i: number) => (
                <li key={i} style={{ listStyle: 'inside', paddingLeft: '2px' }}>
                  {claim}
                </li>
              ))}
            </ul>
          )}
        </Box>
      </>
    );
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {scopes.map((scope: ScopeResponse) => {
          return (
            <li key={scope.id}>
              <Accordion title={scope.name !== undefined ? scope.name : ''} content={renderScopeClaims(scope)} />
            </li>
          );
        })}
      </List>
    </>
  );
};
