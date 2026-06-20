import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/** Single-line text input — raised surface, hairline border, amber focus ring. */
export function Input(props: InputProps): React.JSX.Element;
