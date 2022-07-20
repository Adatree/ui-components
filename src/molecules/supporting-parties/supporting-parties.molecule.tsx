import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { OutsourcedServiceProvider, UseCaseResponse } from '../../generated/consent/api';
import { Accordion } from '../../atoms/accordion/accordion.molecule';

export type SupportingPartiesProps = {
  title: string;
  useCase: UseCaseResponse;
  outsourcedServiceProviders: OutsourcedServiceProvider[];
};

export const SupportingParties: React.FC<SupportingPartiesProps> = (props) => {
  const { title, useCase, outsourcedServiceProviders } = props;

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

          {outsourcedServiceProviders.map((osp) => {
            return (
              <Box sx={{ mb: 3 }} key={osp.providerName}>
                <Typography variant="h3">{osp.providerName}</Typography>
                {osp.accreditationId && (
                  <Typography sx={{ mb: 1 }} variant="body2">
                    Accredited ID: {osp.accreditationId}
                  </Typography>
                )}
                {osp.serviceDescription && <Typography sx={{ mb: 1 }}>{osp.serviceDescription}</Typography>}

                <Typography sx={{ mt: 0.5, mb: 1 }}>
                  Learn more about how they do this in our{' '}
                  <a target="_blank" style={{ textDecoration: 'underline' }} href={osp.cdrPolicyUri}>
                    CDR Policy.
                  </a>
                </Typography>
              </Box>
            );
          })}
        </>
      }
    />
  );
};
