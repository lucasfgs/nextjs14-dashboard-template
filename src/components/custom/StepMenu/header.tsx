import { cn } from "@/lib/utils";

interface StepMenuHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function StepMenuHeader({
  children,
  className,
  ...props
}: StepMenuHeaderProps) {
  return (
    <div className={cn("py-2 border-b", className)} {...props}>
      {children}
    </div>
  );
}
