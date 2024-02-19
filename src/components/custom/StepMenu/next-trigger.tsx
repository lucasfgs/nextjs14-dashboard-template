import { Button, ButtonProps } from "@/components/ui/button";

import { useStepMenu } from "./context";

interface StepMenuNextTriggerProps extends ButtonProps {
  children: React.ReactNode;
}

export default function StepMenuNextTrigger({
  children,
  ...props
}: StepMenuNextTriggerProps) {
  const { currentStep, totalSteps, toggleNextStep } = useStepMenu();
  return (
    <Button
      {...props}
      onClick={toggleNextStep}
      disabled={currentStep === totalSteps}
    >
      {children}
    </Button>
  );
}
