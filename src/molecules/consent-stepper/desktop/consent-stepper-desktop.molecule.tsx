import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

type Step = {
  label: string;
  content: React.ReactNode;
  disableNextButton: boolean;
  onPrevious: () => {};
  onNext: () => {};
  nextButtonLabel?: string;
};

export type ConsentStepperDesktopProps = {
  steps: Step[];
};

export const ConsentStepperDesktop: React.FC<ConsentStepperDesktopProps> = (props) => {
  const { steps } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  const handleOnPrevious = (step: Step) => {
    step.onPrevious();
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleOnNext = (step: Step) => {
    step.onNext();
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
      <Stepper activeStep={activeStep} color="secondary" sx={{ mb: 6 }}>
        {steps.map((step) => {
          return (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {steps[activeStep].content}

      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
        <Button
          disabled={activeStep === 0}
          onClick={() => {
            handleOnPrevious(steps[activeStep]);
          }}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={steps[activeStep].disableNextButton}
          onClick={() => {
            handleOnNext(steps[activeStep]);
          }}
        >
          {getNextButtonLabel(steps[activeStep])}
        </Button>
      </Box>
    </Box>
  );
};
