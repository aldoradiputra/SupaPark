import * as React from "react";

export interface MetricCardProps {
  /** Uppercase label, e.g. "Today's Revenue". */
  label: React.ReactNode;
  /** Large value, e.g. "Rp 2,4jt" or "47". */
  value: React.ReactNode;
  /** Sub-line, e.g. "+12%" or "3 pending". */
  delta?: React.ReactNode;
  /** Tints the delta. @default "muted" */
  deltaColor?: "up" | "down" | "muted";
  /** Optional leading icon for the label. */
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * KPI tile for the dashboard — uppercase label, 28px tabular value, optional delta.
 *
 * @startingPoint section="Dashboard" subtitle="KPI metric tile" viewport="280x110"
 */
export function MetricCard(props: MetricCardProps): React.JSX.Element;
