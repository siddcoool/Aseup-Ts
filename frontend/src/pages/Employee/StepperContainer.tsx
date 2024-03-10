import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Box,
} from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface IStep {
  step: number;
  title: string;
  description: string;
  component: ({
    currentStep,
    setCurrentStep,
    goToNext,
    goToPrevious,
  }: {
    currentStep: number;
    setCurrentStep: Dispatch<SetStateAction<number>>;
    goToNext: () => void;
    goToPrevious: () => void;
  }) => ReactNode;
}

interface IStepperContainer {
  steps: IStep[];
}

const StepperContainer = ({ steps }: IStepperContainer) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNext = () => setCurrentStep((v) => v + 1);
  const goToPrevious = () => setCurrentStep((v) => v - 1);

  return (
    <div className="p-8">
      <div className="px-8">
        <Stepper index={currentStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </div>
      {steps[currentStep].component({
        currentStep,
        setCurrentStep,
        goToNext,
        goToPrevious,
      })}
    </div>
  );
};

export default StepperContainer;
