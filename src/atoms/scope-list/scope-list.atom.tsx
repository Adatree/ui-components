import React from 'react';
import { Box, Typography } from '@mui/material';
import { ScopeResponse } from '../../generated/consent';
import { AccordionBasic } from '../accordion/accordion-basic.atom';

export type ScopeListProps = {
  scopes: ScopeResponse[];
  companyName: string;
};

export const ScopeList: React.FC<ScopeListProps> = (props) => {
  const { scopes, companyName } = props;

  const renderScopeClaims = (scope: ScopeResponse) => {
    return (
      <>
        <Typography sx={{ mb: 0.5, opacity: 0.8 }} variant="body2">
          {scope.purpose}
        </Typography>

        <Typography sx={{ mb: 0.5, opacity: 0.8 }} variant="body2">
          {companyName} will be able to view your
        </Typography>

        {scope.claims && (
          <ul>
            {scope.claims.map((claim: string, i: number) => (
              <li key={i} style={{ listStyle: 'inside', marginRight: '4px' }}>
                <Typography sx={{ opacity: 0.8, display: 'inline' }} variant="body2">
                  {claim}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <Box sx={{ py: 1, px: { xs: 1, sm: 3 } }}>
      <ul>
        {scopes.map((scope: ScopeResponse) => {
          return (
            <li key={scope.id}>
              {scope.name && <AccordionBasic title={scope.name}>{renderScopeClaims(scope)}</AccordionBasic>}
            </li>
          );
        })}
      </ul>
    </Box>
  );
};
