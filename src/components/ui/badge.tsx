import * as React from "react";

import { cn } from "@/lib/utils";

const tones = {
  neutral: "bg-surface-elevated text-muted",
  amber: "bg-amber-subtle text-amber",
  success: "bg-success/15 text-success",
  error: "bg-error/15 text-error",
  info: "bg-info/15 text-info",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: keyof typeof tones;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
