import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { Card } from '../../atoms/card/card.atom';
import { DataHandlerList } from '../../atoms/data-handler-list/data-handler-list.atom';
import { DataRecipient } from '../../types/data-recipient.type';

export type ConsentSectionDataHandlerProps = {
  message: string | ReactElement;
  dataHandlers: DataRecipient[];
};

export const ConsentSectionDataHandler: React.FC<ConsentSectionDataHandlerProps> = (props) => {
  const { message, dataHandlers } = props;

  return (
    <>
      <Card sx={{ mt: 1, mb: '3rem' }}>
        <Typography sx={{ mb: 1 }}>{message}</Typography>
        <DataHandlerList dataHandlers={dataHandlers} />
      </Card>
    </>
  );
};
