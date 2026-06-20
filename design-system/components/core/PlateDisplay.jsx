import React from "react";

const SIZES = {
  sm: { fontSize: 12, padding: "2px 6px" },
  md: { fontSize: 14, padding: "4px 8px" },
  lg: { fontSize: 16, padding: "6px 12px" },
};

function formatPlate(plate) {
  return String(plate).toUpperCase().replace(/\s+/g, " ").trim();
}

/**
 * License-plate chip — JetBrains Mono, amber, tracked. The plate IS the ticket.
 */
export function PlateDisplay({ plate, size = "md", style, ...props }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--fw-semibold)",
        color: "var(--amber)",
        letterSpacing: "0.1em",
        background: "rgba(245,166,35,.1)",
        borderRadius: "var(--radius-sm)",
        ...SIZES[size],
        ...style,
      }}
      {...props}
    >
      {formatPlate(plate)}
    </span>
  );
}
