import * as React from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "default" */
  variant?: BadgeVariant;
}

/**
 * Semantic label/count chip at ~15% tinted fill. Green = done, amber = pending,
 * red = error, blue = info. Use `StatusBadge` for canonical lane/gate/payment states.
 */
export function Badge(props: BadgeProps): React.JSX.Element;
