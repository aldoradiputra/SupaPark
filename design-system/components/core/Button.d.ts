import * as React from "react";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
export type ButtonSize = "sm" | "default" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `default` is amber (primary/authority). @default "default" */
  variant?: ButtonVariant;
  /** @default "default" */
  size?: ButtonSize;
}

/**
 * SupaPark button. Amber is reserved for primary actions and gate controls —
 * use `secondary`/`outline`/`ghost` for everything else, `destructive` for danger.
 *
 * @startingPoint section="Core" subtitle="Amber primary, 6 variants, 4 sizes" viewport="700x150"
 */
export function Button(props: ButtonProps): React.JSX.Element;
