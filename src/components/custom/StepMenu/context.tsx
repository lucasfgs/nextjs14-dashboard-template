import { createContext, useContext } from "react";

export const StepMenuContext = createContext<{
  currentStep: number;
  togglePreviousStep: () => void;
  toggleNextStep: () => void;
  totalSteps: number;
} | null>(null);

export function useStepMenu() {
  const context = useContext(StepMenuContext);

  if (!context) {
    throw new Error(
      "StepMenu compound components must be rendered within the StepMenu component"
    );
  }
  return context;
}
