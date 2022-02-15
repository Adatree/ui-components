import React, { ReactNode } from 'react';
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ChevronDown from 'mdi-material-ui/ChevronDown';

export type AccordionProps = {
  title: string;
  content: ReactNode;
};

export const Accordion: React.FC<AccordionProps> = (props) => {
  const { title, content } = props;

  return (
    <MuiAccordion>
      <AccordionSummary
        expandIcon={<ChevronDown />}
        aria-controls={`panel-content-${title.replace(' ', '-')}`}
        id={`panel-id-${title.replace(' ', '-')}`}
      >
        <Typography variant="h3">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{content} </AccordionDetails>
    </MuiAccordion>
  );
};
