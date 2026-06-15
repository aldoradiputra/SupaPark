import React from "react";
import { Card } from "./Card.jsx";

/**
 * Dashboard metric card — uppercase label, large tabular value, optional delta.
 */
export function MetricCard({ label, value, delta, deltaColor = "muted", icon, style }) {
  const colors = {
    up: "var(--success)",
    down: "var(--error)",
    muted: "var(--text-secondary)",
  };
  return (
    <Card style={{ padding: "14px 16px", ...style }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          fontWeight: "var(--fw-semibold)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--text-tertiary)",
          marginBottom: 8,
        }}
      >
        {icon}
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 28,
          fontWeight: "var(--fw-bold)",
          color: "var(--text-primary)",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {delta != null && (
        <div
          style={{
            fontSize: 12,
            fontWeight: "var(--fw-medium)",
            color: colors[deltaColor] || colors.muted,
            marginTop: 4,
          }}
        >
          {delta}
        </div>
      )}
    </Card>
  );
}
