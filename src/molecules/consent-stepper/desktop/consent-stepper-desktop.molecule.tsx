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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleOnPrevious = (step: Step) => {
    scrollToTop();

    if (step.onPrevious) {
      step.onPrevious();
    }

    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleOnNext = (step: Step) => {
    scrollToTop();

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
      <Stepper activeStep={activeStep} color="primary" sx={{ mb: 6 }}>
        {steps.map((step) => {
          return (
            <Step
              key={step.label}
              sx={{
                '& .MuiStepLabel-root .Mui-active': {
                  color: 'primary.main',
                },
                '& .MuiStepLabel-root .Mui-completed': {
                  color: 'primary.main',
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
          color="inherit"
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
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
