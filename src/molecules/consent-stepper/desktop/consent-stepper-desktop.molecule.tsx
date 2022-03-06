import * as React from 'react';
import Box from '@mui/material/Box';
import { Stepper, Step, StepLabel, Button } from '@mui/material';

type Step = {
  label: string;
  content: React.ReactNode;
  disableNextButton: boolean;
  nextButtonLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
};

export type ConsentStepperDesktopProps = {
  steps: Step[];
};

export const ConsentStepperDesktop: React.FC<ConsentStepperDesktopProps> = (props) => {
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
      <Stepper activeStep={activeStep} color="secondary" sx={{ mb: 6 }}>
        {steps.map((step) => {
          return (
            <Step
              key={step.label}
              sx={{
                '& .MuiStepLabel-root .Mui-active': {
                  color: 'secondary.main',
                },
                '& .MuiStepLabel-root .Mui-completed': {
                  color: 'secondary.main',
                },
                '& .Mui-active .MuiStepIcon-text': {
                  fill: 'black',
                },
                '& .MuiStepLabel-label.Mui-active': {
                  color: 'black',
                },
                '& .MuiStepLabel-label.Mui-completed': {
                  color: 'black',
                },
              }}
            >
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
