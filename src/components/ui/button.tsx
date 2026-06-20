import * as React from "react";

import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-amber text-background hover:bg-amber-bright",
  secondary:
    "border border-border bg-surface-overlay text-foreground hover:bg-surface-elevated",
  ghost: "text-muted hover:bg-surface-overlay hover:text-foreground",
  danger: "bg-error text-white hover:opacity-90",
} as const;

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  ),
);
Button.displayName = "Button";
