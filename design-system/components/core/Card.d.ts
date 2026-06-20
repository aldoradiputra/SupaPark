import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds the amber hero glow. Use sparingly — feature cards only. @default false */
  glow?: boolean;
}

/** Dark raised surface (#111), 1px border, 12px radius. */
export function Card(props: CardProps): React.JSX.Element;
/** Card header region (20px padding). */
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
/** 16px/600 card title; lays out an optional leading icon. */
export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>): React.JSX.Element;
/** Card body region. */
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
