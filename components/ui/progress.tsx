import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive> {}

const ProgressPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
ProgressPrimitive.displayName = "ProgressTrack";

const ProgressIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "h-full w-full flex-1 rounded-full bg-primary transition-all",
      className
    )}
    style={style}
    {...props}
  />
));
ProgressIndicator.displayName = "ProgressIndicator";

function Progress({
  value = 0,
  className,
}: {
  value?: number;
  className?: string;
}) {
  return (
    <ProgressPrimitive className={className}>
      <ProgressIndicator
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive>
  );
}

export { Progress };
