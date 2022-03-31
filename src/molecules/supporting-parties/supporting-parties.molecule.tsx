import * as React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { UseCaseResponse } from '../../generated/consent/api';
import { TestUtil } from '../../utils/test/test.util';
import { Accordion } from '../../atoms/accordion/accordion.molecule';

export type SupportingPartiesProps = {
  title: string;
  useCase: UseCaseResponse;
};

export const SupportingParties: React.FC<SupportingPartiesProps> = (props) => {
  const { title, useCase } = props;

  const outsourcedServiceProvider = TestUtil.testData.outsourcedServiceProvider.all();

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
                <Typography sx={{ mb: 1 }} variant="body2">
                  Accredited ID: {osp.accreditedId}
                </Typography>
                <Typography sx={{ mb: 1 }}>{osp.service}</Typography>
                <Typography sx={{ mb: 1 }}>
                  Learn more about how they do this in their <Link href={osp.cdrPolicyUrl}>CDR Policy.</Link>
                </Typography>
              </Box>
            );
          })}
        </>
      }
    />
  );
};
