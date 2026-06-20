import * as React from "react";

export interface PlateDisplayProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Raw plate, e.g. "b 1234 abc" — normalised to uppercase single-spaced. */
  plate: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

/**
 * License-plate chip. Always JetBrains Mono, amber, tracked 0.1em — the plate
 * is SupaPark's "ticket", so it is rendered consistently everywhere.
 */
export function PlateDisplay(props: PlateDisplayProps): React.JSX.Element;
