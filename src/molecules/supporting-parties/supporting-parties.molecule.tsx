import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { OutsourcedServiceProvider } from '@adatree/react-api-sdk-dashboard';
import { Accordion } from '../../atoms/accordion/accordion.molecule';
import { LinkExternal } from '../../atoms/links/link-external.atom';

interface Props {
  title: string;
  outsourcedServiceProviders: OutsourcedServiceProvider[];
}

export const SupportingParties = (props: Props) => {
  const { title, outsourcedServiceProviders } = props;

  return (
    <Accordion
      title={title}
      content={
        <>
          <Typography sx={{ mb: 0.5 }}>
            Supporting Parties help operate this service. They can access the data you have agreed to share with us.
          </Typography>

          <Typography sx={{ mb: 2 }}>The below parties help provide this service:</Typography>

          {outsourcedServiceProviders.map((osp) => {
            return (
              <Box sx={{ mb: 3 }} key={osp.providerName}>
                <Typography variant="h4">{osp.providerName}</Typography>
                {osp.accreditationId && (
                  <Typography sx={{ mb: 1 }} variant="body2">
                    Accredited ID: {osp.accreditationId}
                  </Typography>
                )}
                {osp.serviceDescription && <Typography sx={{ mb: 1 }}>{osp.serviceDescription}</Typography>}

                {osp.cdrPolicyUri && (
                  <Typography sx={{ mt: 0.5, mb: 1 }}>
                    You can find out more about how they may use the data you have consented to disclose to us in the{' '}
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
