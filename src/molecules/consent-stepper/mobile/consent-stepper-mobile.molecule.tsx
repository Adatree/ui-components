import * as React from 'react';
import Box from '@mui/material/Box';
import { MobileStepper, Step, Button } from '@mui/material';

type Step = {
  label: string;
  content: React.ReactNode;
  disableNextButton: boolean;
  nextButtonLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
};

export type ConsentStepperMobileProps = {
  steps: Step[];
};

export const ConsentStepperMobile: React.FC<ConsentStepperMobileProps> = (props) => {
  const { steps } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  const handleOnPrevious = (step: Step) => {
    if (step.onPrevious) {
      step.onPrevious();
    }

    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleOnNext = (step: Step) => {
    if (step.onNext) {
      step.onNext();
    }
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const getNextButtonLabel = (step: Step): string => {
    if (step.nextButtonLabel) {
      return step.nextButtonLabel;
    }
    return 'Next';
  };

  return (
    <Box>
      <MobileStepper
        variant="progress"
        activeStep={activeStep}
        color="secondary"
        sx={{
          mb: 1,
          '& .MuiLinearProgress-root .MuiLinearProgress-bar ': {
            backgroundColor: 'secondary.main',
          },
        }}
        steps={steps.length}
        nextButton={
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              handleOnNext(steps[activeStep]);
            }}
            disabled={steps[activeStep].disableNextButton}
          >
            {getNextButtonLabel(steps[activeStep])}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => {
              handleOnPrevious(steps[activeStep]);
            }}
            disabled={activeStep === 0}
          >
            Back
          </Button>
        }
      ></MobileStepper>

      {steps[activeStep].content}
    </Box>
  );
};
