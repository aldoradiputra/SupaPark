import * as React from "react";

export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Mark height in px. Min 24. @default 32 */
  size?: number;
  /** Mark color. @default "var(--amber)" — use #FFF on the booth. */
  color?: string;
  /** Show the SUPAPARK wordmark beside the mark. @default false */
  wordmark?: boolean;
  /** Wordmark color (defaults to `color`). */
  wordmarkColor?: string;
}

/**
 * The SupaPark logomark — a stylized "P" where the stroke is the gate post and
 * the arc is the raised barrier arm. Amber on dark; white on the booth.
 */
export function Logo(props: LogoProps): React.JSX.Element;
