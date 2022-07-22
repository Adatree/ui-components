import React from 'react';
import { Typography } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';

export type PowerByAccordionProps = {
  organisationName: string;
};

export const PowerByAccordion: React.FC<PowerByAccordionProps> = (props) => {
  const { organisationName } = props;

  return (
    <Accordion
      title="About Adatree Pty Ltd"
      content={
        <>
          <Typography sx={{ mb: 1 }}>
            <strong>Adatree Pty Ltd</strong> are a fully accredited Consumer Data Right Provider.
          </Typography>
          <Typography>
            <strong>{organisationName}</strong> have partnered with <strong>Adatree Pty Ltd</strong> to Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Sed et luctus ipsum. Morbi nec leo neque. Nam pharetra augue
            metus, gravida congue magna tincidunt non. Integer feugiat nunc ac vehicula facilisis.
          </Typography>
        </>
      }
    />
  );
};
