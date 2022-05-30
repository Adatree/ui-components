import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import { ScopeResponse } from '../../generated/consent';

export type ScopeAccordionProps = {
  scopes: ScopeResponse[];
};

export const ScopeAccordion: React.FC<ScopeAccordionProps> = (props) => {
  const { scopes } = props;

  return (
    <>
      {scopes.map((scope: ScopeResponse) => {
        return (
          <Accordion key={scope.id}>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls={`panel-content-${scope.name?.replace(' ', '-')}`}
              id={`panel-id-${scope.name?.replace(' ', '-')}`}
            >
              <Box>
                <Typography variant="h3">{scope.name}</Typography>
                <Typography variant="body2">{scope.purpose}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <ul>
                  {scope.claims?.map((claim: string, i: number) => {
                    return (
                      <li key={i} style={{ listStyle: 'inside', paddingLeft: '12px' }}>
                        {claim}
                      </li>
                    );
                  })}
                </ul>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};
