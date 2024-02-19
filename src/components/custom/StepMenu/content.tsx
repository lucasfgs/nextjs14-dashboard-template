import { cn } from "@/lib/utils";

interface StepMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function StepMenuContent({
  children,
  className,
  ...props
}: StepMenuContentProps) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}
