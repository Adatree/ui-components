import React, { ReactNode } from 'react';
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ChevronDown } from 'mdi-material-ui';

interface Props {
  title: string;
  content: ReactNode;
  lazyLoad?: boolean;
}

export const Accordion = (props: Props) => {
  const { title, content, lazyLoad = false } = props;
  const slotProp = { transition: { unmountOnExit: true } };

  return (
    <MuiAccordion
      elevation={0}
      sx={{ boxShadow: '0 1px 2px rgba(0,0,0,.1)' }}
      slotProps={lazyLoad === true ? { ...slotProp } : {}}
    >
      <AccordionSummary
        expandIcon={<ChevronDown />}
        aria-controls={`panel-content-${title.replace(' ', '-')}`}
        id={`panel-id-${title.replace(' ', '-')}`}
      >
        <Typography variant="body1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{content} </AccordionDetails>
    </MuiAccordion>
  );
};
