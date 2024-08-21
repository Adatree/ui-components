import React from 'react';
import { Alert, Box, Typography } from '@mui/material';
import { ScopeResponse } from '../../generated/consent';
import { Highlight as HL } from '../highlight-text/highlight-text.atom';
interface Props {
  insightScopes: ScopeResponse[];
  dataHolderName: string;
}

export const InsightList = (props: Props) => {
  const { insightScopes, dataHolderName } = props;

  return (
    <>
      <Typography sx={{ mb: 1 }}>Insight details</Typography>

      {insightScopes.length > 0 &&
        insightScopes.map((insight: ScopeResponse, index: number) => {
          return (
            <Box key={`insight-details-${index}`}>
              <Typography sx={{ my: 1 }}>
                <HL>{insight.name}</HL>
              </Typography>

              <Box sx={{ pl: 2 }}>
                {insight.description && <Typography sx={{ mb: 1 }}>{insight.description}</Typography>}
                <Typography sx={{ mb: 0.6 }}>
                  To generate this insight we use the following data from <HL>{dataHolderName}</HL>
                </Typography>

                <Box sx={{ pt: 1 }}>
                  <ul>
                    {insight.claims &&
                      insight.claims.map((claim, i: number) => (
                        <li key={i} style={{ listStyle: 'inside', paddingLeft: '12px' }}>
                          {claim}
                        </li>
                      ))}
                  </ul>
                </Box>
              </Box>
            </Box>
          );
        })}

      {insightScopes.length === 0 && <Alert severity="error">Insights scopes not found</Alert>}
    </>
  );
};
