import React from "react";
import { Badge } from "./Badge.jsx";

// Mirrors the real dashboard's status-badge.tsx config.
const CONFIG = {
  // lane
  online: { label: "Online", variant: "success", dot: true },
  offline: { label: "Offline", variant: "error", dot: true },
  syncing: { label: "Syncing", variant: "warning", dot: true },
  // gate
  open: { label: "Open", variant: "success" },
  closed: { label: "Closed", variant: "default" },
  moving: { label: "Moving", variant: "warning" },
  error: { label: "Error", variant: "error" },
  // payment
  paid: { label: "Paid", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  override: { label: "Override", variant: "info" },
  failed: { label: "Failed", variant: "error" },
  // member
  active: { label: "Active", variant: "success" },
  expiring: { label: "Expiring", variant: "warning" },
  expired: { label: "Expired", variant: "error" },
};

const DOT_COLOR = {
  success: "var(--success)",
  error: "var(--error)",
  warning: "var(--amber)",
};

/**
 * Canonical lane / gate / payment / member status pill. Pass a raw status
 * `value` and it resolves the label, color, and (for lanes) a status dot.
 */
export function StatusBadge({ value, label, className = "", ...props }) {
  const cfg = CONFIG[value] || { label: label || value, variant: "default" };
  return (
    <Badge variant={cfg.variant} className={className} {...props}>
      {cfg.dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: DOT_COLOR[cfg.variant] || "var(--text-tertiary)",
            flexShrink: 0,
          }}
        />
      )}
      {label || cfg.label}
    </Badge>
  );
}
