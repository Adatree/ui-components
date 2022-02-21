import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Accordion } from '../../atoms/accordion/accordion.molecule';
import { ScopeResponse, UseCaseResponse } from '../../generated/consent/api';

export type UseCaseSummaryProps = {
  title: string;
  useCase: UseCaseResponse;
};

export const UseCaseSummary: React.FC<UseCaseSummaryProps> = (props) => {
  const { title, useCase } = props;

  const scopes = (
    <ul className="list">
      {useCase.scopes &&
        useCase.scopes.map((scope: ScopeResponse) => {
          return (
            <li key={scope.id}>
              <Typography>{scope.name}</Typography>
            </li>
          );
        })}
    </ul>
  );

  const purpose = <Typography>{useCase.name}</Typography>;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Accordion title="Types of data received" content={scopes} />
      <Accordion title="Purpose of receiving data" content={purpose} />
    </Box>
  );
};
