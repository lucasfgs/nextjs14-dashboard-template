import { cn } from "@/lib/utils";

interface StepMenuFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function StepMenuFooter({
  children,
  className,
  ...props
}: StepMenuFooterProps) {
  return (
    <div className={cn("flex py-2 border-t", className)} {...props}>
      {children}
    </div>
  );
}
