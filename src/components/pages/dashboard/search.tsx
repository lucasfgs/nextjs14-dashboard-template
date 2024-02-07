import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Search({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <Input
      type="search"
      placeholder="Search..."
      className={cn("md:w-[100px] lg:w-[300px]", className)}
    />
  );
}
