import { cn } from "@/lib/utils";

import { useStepMenu } from "./context";

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  step: number;
}

export default function StepMenuStep({ children, className, step }: StepProps) {
  const { currentStep } = useStepMenu();

  return (
    step === currentStep && <div className={cn("", className)}>{children}</div>
  );
}
