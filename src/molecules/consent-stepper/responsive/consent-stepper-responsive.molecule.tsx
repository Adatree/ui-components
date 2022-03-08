import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { ConsentStepperMobile } from '../mobile/consent-stepper-mobile.molecule';
import { ConsentStepperDesktop } from '../desktop/consent-stepper-desktop.molecule';

type Step = {
  label: string;
  content: React.ReactNode;
  disableNextButton: boolean;
  nextButtonLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
};

export type ConsentStepperResponsiveProps = {
  steps: Step[];
};

export const ConsentStepperResponsive: React.FC<ConsentStepperResponsiveProps> = (props) => {
  const { steps } = props;
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box>
      {isMobile && <ConsentStepperMobile steps={steps} />}
      {!isMobile && <ConsentStepperDesktop steps={steps} />}
    </Box>
  );
};
