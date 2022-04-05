import React from 'react';
import { List, Typography } from '@mui/material';
import { BankCheck, CheckboxMultipleMarked, Connection } from 'mdi-material-ui';
import { IconListItem } from '../../../atoms/icon-list-item/icon-list-item.atom';

export const InfoHowItWorksStep = () => {
  return (
    <>
      <section>
        <Typography variant="h2" sx={{ mb: 2 }}>
          How data sharing works
        </Typography>

        <List>
          <IconListItem
            icon={<CheckboxMultipleMarked color="primary" />}
            content="You consent to share your data with us."
          />
          <IconListItem
            icon={<BankCheck color="primary" />}
            content="You confirm with your bank that you want to share your data."
          />
          <IconListItem
            icon={<Connection color="primary" />}
            content="We securely connect to your bank and retrieve your data."
          />
        </List>
      </section>
    </>
  );
};
