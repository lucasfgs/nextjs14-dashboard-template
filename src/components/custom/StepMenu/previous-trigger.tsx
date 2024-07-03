import { useStepMenu } from "./context";

import { Button, ButtonProps } from "@/components/ui/button";

interface StepMenuPreviousTriggerProps extends ButtonProps {
  children: React.ReactNode;
}

export default function StepMenuPreviousTrigger({
  children,
  ...props
}: StepMenuPreviousTriggerProps) {
  const { currentStep, togglePreviousStep } = useStepMenu();
  return (
    <Button {...props} onClick={togglePreviousStep} disabled={currentStep <= 1}>
      {children}
    </Button>
  );
}
