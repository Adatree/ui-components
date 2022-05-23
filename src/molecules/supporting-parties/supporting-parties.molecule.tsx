import * as React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { UseCaseResponse } from '../../generated/consent/api';
import { Accordion } from '../../atoms/accordion/accordion.molecule';

// This type will be part of the Use Case Response
export type OutsourcedServiceProvider = {
  id: number;
  name: string;
  cdrPolicyUrl: string;
  accreditedId?: string;
  description?: string;
  service?: string;
};

export type SupportingPartiesProps = {
  title: string;
  useCase: UseCaseResponse;
  outsourcedServiceProvider: OutsourcedServiceProvider[];
};

export const SupportingParties: React.FC<SupportingPartiesProps> = (props) => {
  const { title, useCase, outsourcedServiceProvider } = props;

  return (
    <Accordion
      title={title}
      content={
        <>
          <Typography sx={{ mb: 0.5 }}>
            Supporting Parties help operate this service. They can access the data you have agreed to share with us but
            only for {useCase.name}.
          </Typography>

          <Typography sx={{ mb: 2 }}>The below parties help provide this service:</Typography>

          {outsourcedServiceProvider.map((osp) => {
            return (
              <Box sx={{ mb: 3 }} key={osp.id}>
                <Typography variant="h3">{osp.name}</Typography>
                {osp.accreditedId && (
                  <Typography sx={{ mb: 1 }} variant="body2">
                    Accredited ID: {osp.accreditedId}
                  </Typography>
                )}
                {osp.service && <Typography sx={{ mb: 1 }}>{osp.service}</Typography>}
                {osp.description && <Typography sx={{ mb: 1 }}>{osp.description}</Typography>}
                <Typography sx={{ mb: 1 }}>
                  Learn more about how they do this in our <Link href={osp.cdrPolicyUrl}>CDR Policy.</Link>
                </Typography>
              </Box>
            );
          })}
        </>
      }
    />
  );
};
