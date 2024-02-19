"use client";
import { useState } from "react";

import { cn } from "@/lib/utils";

import StepMenuHeader from "./header";
import StepMenuFooter from "./footer";
import StepMenuContent from "./content";
import StepMenuPreviousTrigger from "./previous-trigger";
import StepMenuNextTrigger from "./next-trigger";
import StepMenuStep from "./step";
import StepMenuProgressBar from "./progress-bar";
import { StepMenuContext } from "./context";

interface StepMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  totalSteps: number;
}

function StepMenu({ children, className, totalSteps }: StepMenuProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  function toggleNextStep() {
    setCurrentStep((prevState) => prevState + 1);
  }

  function togglePreviousStep() {
    setCurrentStep((prevState) => prevState - 1);
  }

  const contextValue = {
    currentStep,
    togglePreviousStep,
    toggleNextStep,
    totalSteps,
  };

  return (
    <StepMenuContext.Provider value={contextValue}>
      <div
        className={cn("border p-2 pt-0 w-full rounded-md shadow-md", className)}
      >
        {children}
      </div>
    </StepMenuContext.Provider>
  );
}

export {
  StepMenu,
  StepMenuHeader,
  StepMenuFooter,
  StepMenuContent,
  StepMenuPreviousTrigger,
  StepMenuNextTrigger,
  StepMenuStep,
  StepMenuProgressBar,
};
