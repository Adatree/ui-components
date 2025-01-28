import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { OutsourcedServiceProvider, UseCaseResponse } from '@adatree/react-api-sdk';
import { Accordion } from '../../atoms/accordion/accordion.molecule';
import { LinkExternal } from '../../atoms/links/link-external.atom';

interface Props {
  title: string;
  useCase: UseCaseResponse;
  outsourcedServiceProviders: OutsourcedServiceProvider[];
}

export const SupportingParties = (props: Props) => {
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
                <Typography variant="h5">{osp.providerName}</Typography>
                {osp.accreditationId && (
                  <Typography sx={{ mb: 1 }} variant="body2">
                    Accredited ID: {osp.accreditationId}
                  </Typography>
                )}
                {osp.serviceDescription && <Typography sx={{ mb: 1 }}>{osp.serviceDescription}</Typography>}

                {osp.cdrPolicyUri && (
                  <Typography sx={{ mt: 0.5, mb: 1 }}>
                    Learn more about how they do this in the{' '}
                    <LinkExternal href={osp.cdrPolicyUri} text={`${osp.providerName} CDR Policy`} />.
                  </Typography>
                )}
              </Box>
            );
          })}
        </>
      }
    />
  );
};
