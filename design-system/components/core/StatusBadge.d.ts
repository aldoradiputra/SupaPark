import * as React from "react";

export type StatusValue =
  | "online" | "offline" | "syncing"
  | "open" | "closed" | "moving" | "error"
  | "paid" | "pending" | "override" | "failed"
  | "active" | "expiring" | "expired";

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Raw status string; resolves to label + color (+ dot for lane states). */
  value: StatusValue | string;
  /** Override the resolved label. */
  label?: string;
}

/**
 * The system's standard status pill for lanes, gates, payments and members —
 * matches the dashboard's status-badge config exactly.
 */
export function StatusBadge(props: StatusBadgeProps): React.JSX.Element;
