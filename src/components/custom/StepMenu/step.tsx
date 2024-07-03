import { motion, MotionProps } from "framer-motion";

import { useStepMenu } from "./context";

import { cn } from "@/lib/utils";

interface StepProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  children: React.ReactNode;
  step: number;
}

export default function StepMenuStep({
  children,
  className,
  step,
  ...props
}: StepProps) {
  const { currentStep } = useStepMenu();

  return (
    step === currentStep && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.25 }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  );
}
