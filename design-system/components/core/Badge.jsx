import React from "react";

const STYLE = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "2px 8px",
    borderRadius: "var(--radius-sm)",
    fontFamily: "var(--font-ui)",
    fontSize: 12,
    fontWeight: "var(--fw-semibold)",
    lineHeight: 1.5,
    whiteSpace: "nowrap",
  },
};

const VARIANTS = {
  default: { background: "var(--surface-elevated)", color: "var(--text-primary)" },
  success: { background: "rgba(34,197,94,.15)", color: "var(--success)" },
  warning: { background: "rgba(245,166,35,.15)", color: "var(--amber)" },
  error: { background: "rgba(239,68,68,.15)", color: "var(--error)" },
  info: { background: "rgba(59,130,246,.15)", color: "var(--info)" },
  outline: {
    background: "transparent",
    color: "var(--text-secondary)",
    boxShadow: "inset 0 0 0 1px var(--border)",
  },
};

/**
 * Small status / count label. 6 semantic variants.
 */
export function Badge({ variant = "default", style, children, ...props }) {
  return (
    <span style={{ ...STYLE.base, ...VARIANTS[variant], ...style }} {...props}>
      {children}
    </span>
  );
}
