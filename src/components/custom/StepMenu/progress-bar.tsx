import { useStepMenu } from "./context";

import { cn } from "@/lib/utils";

interface StepMenuProgressBarProps {
  variant: "line" | "dots";
}

export default function StepMenuProgressBar({
  variant,
}: StepMenuProgressBarProps) {
  const { currentStep, totalSteps } = useStepMenu();

  switch (variant) {
    case "line":
      return (
        <div className="flex items-center justify-center w-full">
          <div className="w-full h-2 bg-gray-300 rounded-full relative">
            <div
              className="h-2 bg-primary rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      );
    case "dots":
      return (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-4 h-4 rounded-full",
                  currentStep > i ? "bg-primary" : "bg-gray-300"
                )}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">
            {currentStep} of {totalSteps}
          </div>
        </div>
      );
  }
}
