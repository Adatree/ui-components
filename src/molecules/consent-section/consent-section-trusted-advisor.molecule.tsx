import React, { ReactElement } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Card } from '../../atoms/card/card.atom';
import { TrustedAdvisorResponse } from '../../types/trusted-advisor.type';

export type ConsentSectionTrustedAdvisorProps = {
  message: string | ReactElement;
  trustedAdvisors: TrustedAdvisorResponse[];
};

export const ConsentSectionTrustedAdvisor: React.FC<ConsentSectionTrustedAdvisorProps> = (props) => {
  const { message, trustedAdvisors } = props;

  return (
    <>
      <Card sx={{ mt: 1, mb: '3rem' }}>
        <Typography sx={{ mb: 1 }}>{message}</Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
          {trustedAdvisors.map((trustedAdvisor) => {
            return (
              <ListItem key={trustedAdvisor.id} sx={{ px: 1, py: 0.5 }}>
                <ListItemText
                  id={`trusted-advisor-list-label-${trustedAdvisor.id}`}
                  primary={<Typography variant="body2">{trustedAdvisor.name}</Typography>}
                />
              </ListItem>
            );
          })}
        </List>
      </Card>
    </>
  );
};
