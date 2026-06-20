import * as React from "react";

import { cn } from "@/lib/utils";

/** Lightweight native select styled to match the dark theme. */
export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-10 w-full rounded-lg border border-border bg-surface-overlay px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Select.displayName = "Select";
