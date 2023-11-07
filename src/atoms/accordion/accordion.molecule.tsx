import React, { ReactNode } from 'react';
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ChevronDown } from 'mdi-material-ui';
import {
  AnalyticsAction,
  AnalyticsComponentMeta,
  AnalyticsEvents,
  useAnalytics,
} from '../../context/analytics.context';

export type AccordionProps = {
  title: string;
  content: ReactNode;
};

export const Accordion: React.FC<AccordionProps> = (props) => {
  const { title, content } = props;
  const { track } = useAnalytics();

  const handleOnChange = (event: React.SyntheticEvent, expanded: boolean) => {
    if (expanded && event) {
      track(
        AnalyticsEvents.UI_INTERACTION,
        AnalyticsComponentMeta.ADT_CMP_ACCORDION.id,
        AnalyticsComponentMeta.ADT_CMP_ACCORDION.description,
        AnalyticsAction.OPEN,
        title,
      );
    }
  };

  return (
    <MuiAccordion elevation={0} sx={{ boxShadow: '0 1px 2px rgba(0,0,0,.1)' }} onChange={handleOnChange}>
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
