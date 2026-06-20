import * as React from "react";

export interface BoothButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "primary" */
  variant?: "primary" | "outline" | "danger";
}

/**
 * Full-width booth touchscreen button — 80px minimum tap target, pure-black /
 * ultra-contrast context, large 24px label. Booth copy is always Bahasa.
 */
export function BoothButton(props: BoothButtonProps): React.JSX.Element;
