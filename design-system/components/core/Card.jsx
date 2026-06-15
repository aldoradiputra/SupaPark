import React from "react";

/**
 * Surface container. `glow` adds the amber hero glow (use sparingly).
 */
export function Card({ glow = false, style, className = "", children, ...props }) {
  return (
    <div
      className={className}
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: glow ? "var(--glow-amber)" : "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ style, children, ...props }) {
  return (
    <div style={{ padding: 20, paddingBottom: 12, ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ style, children, ...props }) {
  return (
    <h3
      style={{
        margin: 0,
        fontFamily: "var(--font-ui)",
        fontSize: 16,
        fontWeight: "var(--fw-semibold)",
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
        display: "flex",
        alignItems: "center",
        gap: 8,
        ...style,
      }}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ style, children, ...props }) {
  return (
    <div style={{ padding: 20, paddingTop: 0, ...style }} {...props}>
      {children}
    </div>
  );
}
