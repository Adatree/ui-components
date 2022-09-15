import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { Card } from '../../atoms/card/card.atom';
import { DataHandler } from '../../types/data-handler.type';
import { TrustedAdvisorList } from '../../atoms/trusted-advisor-list/trusted-advisor-list.atom';

export type ConsentSectionTrustedAdvisorProps = {
  message: string | ReactElement;
  trustedAdvisors: DataHandler[];
};

export const ConsentSectionTrustedAdvisor: React.FC<ConsentSectionTrustedAdvisorProps> = (props) => {
  const { message, trustedAdvisors } = props;

  return (
    <>
      <Card sx={{ mt: 1, mb: '3rem' }}>
        <Typography sx={{ mb: 1 }}>{message}</Typography>
        <TrustedAdvisorList TrustedAdvisors={trustedAdvisors} />
      </Card>
    </>
  );
};
