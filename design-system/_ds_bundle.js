/* @ds-bundle: {"format":3,"namespace":"SupaParkDesignSystem_80b640","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"BoothButton","sourcePath":"components/core/BoothButton.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardHeader","sourcePath":"components/core/Card.jsx"},{"name":"CardTitle","sourcePath":"components/core/Card.jsx"},{"name":"CardContent","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"MetricCard","sourcePath":"components/core/MetricCard.jsx"},{"name":"PlateDisplay","sourcePath":"components/core/PlateDisplay.jsx"},{"name":"StatusBadge","sourcePath":"components/core/StatusBadge.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"f74ce8b65407","components/core/BoothButton.jsx":"54529b07f405","components/core/Button.jsx":"7f19b2bc7184","components/core/Card.jsx":"70bdbb00fc63","components/core/Input.jsx":"6f73c5b2b2bf","components/core/Logo.jsx":"8be0a228104b","components/core/MetricCard.jsx":"0943abe0534b","components/core/PlateDisplay.jsx":"8bd5d8705578","components/core/StatusBadge.jsx":"fdacd096b972","ui_kits/booth/BoothScreens.jsx":"ce6abc288eba","ui_kits/dashboard/Leads.jsx":"6ece3050579d","ui_kits/dashboard/Overview.jsx":"a6e00cb6f8f5","ui_kits/dashboard/Projects.jsx":"1c463ebc0e23","ui_kits/dashboard/Shell.jsx":"1dfde9d514b7","ui_kits/dashboard/data.js":"038a431faac4","ui_kits/dashboard/ui.jsx":"e022f0ab23cf","ui_kits/onboarding/app.jsx":"cf851ba9d88e","ui_kits/onboarding/fields.jsx":"54626babd736","ui_kits/pwa/pwa.jsx":"986fba70ec35"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SupaParkDesignSystem_80b640 = window.SupaParkDesignSystem_80b640 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    whiteSpace: "nowrap"
  }
};
const VARIANTS = {
  default: {
    background: "var(--surface-elevated)",
    color: "var(--text-primary)"
  },
  success: {
    background: "rgba(34,197,94,.15)",
    color: "var(--success)"
  },
  warning: {
    background: "rgba(245,166,35,.15)",
    color: "var(--amber)"
  },
  error: {
    background: "rgba(239,68,68,.15)",
    color: "var(--error)"
  },
  info: {
    background: "rgba(59,130,246,.15)",
    color: "var(--info)"
  },
  outline: {
    background: "transparent",
    color: "var(--text-secondary)",
    boxShadow: "inset 0 0 0 1px var(--border)"
  }
};

/**
 * Small status / count label. 6 semantic variants.
 */
function Badge({
  variant = "default",
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...STYLE.base,
      ...VARIANTS[variant],
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/BoothButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ensureStyles(id, css) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.sp-booth-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:12px;
  min-height:80px;padding:0 28px;width:100%;
  font-family:var(--font-ui);font-weight:var(--fw-bold);font-size:24px;
  border:2px solid transparent;border-radius:var(--radius-lg);cursor:pointer;
  transition:filter 120ms,background 120ms;-webkit-tap-highlight-color:transparent;
}
.sp-booth-btn--primary{background:var(--booth-amber);color:#000;}
.sp-booth-btn--primary:active{filter:brightness(.88);}
.sp-booth-btn--outline{background:#000;color:#fff;border-color:#333;}
.sp-booth-btn--outline:active{background:#111;}
.sp-booth-btn--danger{background:var(--booth-error);color:#000;}
.sp-booth-btn--danger:active{filter:brightness(.9);}
`;

/**
 * Booth touchscreen button — 80px min tap target, ultra-contrast, Bahasa.
 */
function BoothButton({
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  ensureStyles("sp-booth-btn-styles", CSS);
  return /*#__PURE__*/React.createElement("button", _extends({
    className: `sp-booth-btn sp-booth-btn--${variant} ${className}`
  }, props), children);
}
Object.assign(__ds_scope, { BoothButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BoothButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Inject a component's CSS once (keyed by id). Lets primitives carry their
// own :hover / :focus / :active states while staying self-contained.
function ensureStyles(id, css) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.sp-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  white-space:nowrap;font-family:var(--font-ui);font-weight:var(--fw-semibold);
  border:1px solid transparent;cursor:pointer;
  transition:background-color 150ms,color 150ms,border-color 150ms,opacity 150ms;
  -webkit-font-smoothing:antialiased;
}
.sp-btn:focus-visible{outline:none;box-shadow:0 0 0 2px var(--surface-base),0 0 0 4px var(--amber);}
.sp-btn:disabled{opacity:.5;pointer-events:none;}
/* sizes */
.sp-btn--sm{height:32px;padding:0 12px;font-size:12px;border-radius:var(--radius-sm);}
.sp-btn--default{height:40px;padding:0 16px;font-size:14px;border-radius:var(--radius);}
.sp-btn--lg{height:48px;padding:0 24px;font-size:16px;border-radius:var(--radius);}
.sp-btn--icon{height:40px;width:40px;padding:0;border-radius:var(--radius);}
/* variants */
.sp-btn--default-v{background:var(--amber);color:var(--surface-base);}
.sp-btn--default-v:hover{background:var(--amber-bright);}
.sp-btn--default-v:active{background:var(--amber-dim);}
.sp-btn--destructive{background:var(--error);color:#fff;}
.sp-btn--destructive:hover{filter:brightness(1.08);}
.sp-btn--outline{background:transparent;color:var(--text-primary);border-color:var(--border);}
.sp-btn--outline:hover{background:var(--surface-elevated);}
.sp-btn--secondary{background:var(--surface-elevated);color:var(--text-primary);}
.sp-btn--secondary:hover{background:var(--surface-overlay);}
.sp-btn--ghost{background:transparent;color:var(--text-secondary);}
.sp-btn--ghost:hover{background:var(--surface-elevated);color:var(--text-primary);}
.sp-btn--link{background:transparent;color:var(--amber);height:auto!important;padding:0!important;}
.sp-btn--link:hover{text-decoration:underline;text-underline-offset:4px;}
`;

/**
 * SupaPark primary button. Amber = action & authority.
 */
function Button({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) {
  ensureStyles("sp-btn-styles", CSS);
  const variantClass = variant === "default" ? "sp-btn--default-v" : `sp-btn--${variant}`;
  return /*#__PURE__*/React.createElement("button", _extends({
    className: `sp-btn sp-btn--${size} ${variantClass} ${className}`
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container. `glow` adds the amber hero glow (use sparingly).
 */
function Card({
  glow = false,
  style,
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      background: "var(--surface-raised)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      boxShadow: glow ? "var(--glow-amber)" : "none",
      ...style
    }
  }, props), children);
}
function CardHeader({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: 20,
      paddingBottom: 12,
      ...style
    }
  }, props), children);
}
function CardTitle({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("h3", _extends({
    style: {
      margin: 0,
      fontFamily: "var(--font-ui)",
      fontSize: 16,
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)",
      letterSpacing: "-0.01em",
      display: "flex",
      alignItems: "center",
      gap: 8,
      ...style
    }
  }, props), children);
}
function CardContent({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: 20,
      paddingTop: 0,
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardContent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ensureStyles(id, css) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.sp-input{
  display:flex;height:40px;width:100%;
  padding:0 12px;font-family:var(--font-ui);font-size:14px;
  color:var(--text-primary);background:var(--surface-raised);
  border:1px solid var(--border);border-radius:var(--radius);
  transition:border-color 150ms,box-shadow 150ms;
}
.sp-input::placeholder{color:var(--text-tertiary);}
.sp-input:focus{outline:none;border-color:var(--amber);
  box-shadow:0 0 0 2px var(--surface-base),0 0 0 4px rgba(245,166,35,.4);}
.sp-input:disabled{opacity:.5;cursor:not-allowed;}
`;

/**
 * Text input on a raised surface with an amber focus ring.
 */
function Input({
  className = "",
  ...props
}) {
  ensureStyles("sp-input-styles", CSS);
  return /*#__PURE__*/React.createElement("input", _extends({
    className: `sp-input ${className}`
  }, props));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SupaPark logo — barrier-gate "P" mark, optionally with the SUPAPARK wordmark.
 */
function Logo({
  size = 32,
  color = "var(--amber)",
  wordmark = false,
  wordmarkColor,
  style,
  ...props
}) {
  const wc = wordmarkColor || color;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.25,
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-label": "SupaPark",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "8",
    width: "10",
    height: "32",
    rx: "3",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 8h10a10 10 0 0 1 0 20H20",
    stroke: color,
    strokeWidth: "8",
    strokeLinecap: "round",
    fill: "none"
  })), wordmark && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--fw-bold)",
      fontSize: size * 0.62,
      letterSpacing: "0.15em",
      color: wc,
      lineHeight: 1
    }
  }, "SUPAPARK"));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/MetricCard.jsx
try { (() => {
/**
 * Dashboard metric card — uppercase label, large tabular value, optional delta.
 */
function MetricCard({
  label,
  value,
  delta,
  deltaColor = "muted",
  icon,
  style
}) {
  const colors = {
    up: "var(--success)",
    down: "var(--error)",
    muted: "var(--text-secondary)"
  };
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    style: {
      padding: "14px 16px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      fontWeight: "var(--fw-semibold)",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--text-tertiary)",
      marginBottom: 8
    }
  }, icon, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 28,
      fontWeight: "var(--fw-bold)",
      color: "var(--text-primary)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1.1
    }
  }, value), delta != null && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: "var(--fw-medium)",
      color: colors[deltaColor] || colors.muted,
      marginTop: 4
    }
  }, delta));
}
Object.assign(__ds_scope, { MetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MetricCard.jsx", error: String((e && e.message) || e) }); }

// components/core/PlateDisplay.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    fontSize: 12,
    padding: "2px 6px"
  },
  md: {
    fontSize: 14,
    padding: "4px 8px"
  },
  lg: {
    fontSize: 16,
    padding: "6px 12px"
  }
};
function formatPlate(plate) {
  return String(plate).toUpperCase().replace(/\s+/g, " ").trim();
}

/**
 * License-plate chip — JetBrains Mono, amber, tracked. The plate IS the ticket.
 */
function PlateDisplay({
  plate,
  size = "md",
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-block",
      fontFamily: "var(--font-mono)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--amber)",
      letterSpacing: "0.1em",
      background: "rgba(245,166,35,.1)",
      borderRadius: "var(--radius-sm)",
      ...SIZES[size],
      ...style
    }
  }, props), formatPlate(plate));
}
Object.assign(__ds_scope, { PlateDisplay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PlateDisplay.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Mirrors the real dashboard's status-badge.tsx config.
const CONFIG = {
  // lane
  online: {
    label: "Online",
    variant: "success",
    dot: true
  },
  offline: {
    label: "Offline",
    variant: "error",
    dot: true
  },
  syncing: {
    label: "Syncing",
    variant: "warning",
    dot: true
  },
  // gate
  open: {
    label: "Open",
    variant: "success"
  },
  closed: {
    label: "Closed",
    variant: "default"
  },
  moving: {
    label: "Moving",
    variant: "warning"
  },
  error: {
    label: "Error",
    variant: "error"
  },
  // payment
  paid: {
    label: "Paid",
    variant: "success"
  },
  pending: {
    label: "Pending",
    variant: "warning"
  },
  override: {
    label: "Override",
    variant: "info"
  },
  failed: {
    label: "Failed",
    variant: "error"
  },
  // member
  active: {
    label: "Active",
    variant: "success"
  },
  expiring: {
    label: "Expiring",
    variant: "warning"
  },
  expired: {
    label: "Expired",
    variant: "error"
  }
};
const DOT_COLOR = {
  success: "var(--success)",
  error: "var(--error)",
  warning: "var(--amber)"
};

/**
 * Canonical lane / gate / payment / member status pill. Pass a raw status
 * `value` and it resolves the label, color, and (for lanes) a status dot.
 */
function StatusBadge({
  value,
  label,
  className = "",
  ...props
}) {
  const cfg = CONFIG[value] || {
    label: label || value,
    variant: "default"
  };
  return /*#__PURE__*/React.createElement(__ds_scope.Badge, _extends({
    variant: cfg.variant,
    className: className
  }, props), cfg.dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: DOT_COLOR[cfg.variant] || "var(--text-tertiary)",
      flexShrink: 0
    }
  }), label || cfg.label);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// ui_kits/booth/BoothScreens.jsx
try { (() => {
/* SupaPark — Booth Kiosk Screens
   Ultra-contrast pure-black kiosk UI for the 7" 1024×600 lane display.
   All copy is Bahasa Indonesia. Palette: #000 bg, #FFF text, #999 secondary,
   #F5A623 amber, #00FF88 neon-success, #FF3333 error.
   Exposes BoothShell + every screen + BoothSimulator on window. */

const B = {
  bg: "#000000",
  text: "#FFFFFF",
  sub: "#999999",
  amber: "#F5A623",
  green: "#00FF88",
  red: "#FF3333",
  ui: "'Plus Jakarta Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace"
};

/* ---- keyframes (injected once) ---- */
(function injectBoothKeyframes() {
  if (typeof document === "undefined" || document.getElementById("booth-kf")) return;
  const s = document.createElement("style");
  s.id = "booth-kf";
  s.textContent = `
    @keyframes boothPulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes boothScan{0%{top:8%}100%{top:92%}}
    @keyframes boothPop{0%{transform:scale(.7)}60%{transform:scale(1.06)}100%{transform:scale(1)}}
    @keyframes boothBlink{0%,100%{opacity:1}50%{opacity:.25}}
  `;
  document.head.appendChild(s);
})();

/* ---- Logo mark (barrier-gate P) ---- */
function Mark({
  size = 96,
  color = B.amber
}) {
  return React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none"
  }, React.createElement("rect", {
    x: 10,
    y: 8,
    width: 10,
    height: 32,
    rx: 3,
    fill: color
  }), React.createElement("path", {
    d: "M20 8h10a10 10 0 0 1 0 20H20",
    stroke: color,
    strokeWidth: 8,
    strokeLinecap: "round",
    fill: "none"
  }));
}

/* ---- Top status bar (small logo + location) ---- */
function TopBar({
  location = "Mall Grand Indonesia",
  lane = "EXIT A"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      borderBottom: "1px solid #1a1a1a"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: B.ui,
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: ".12em",
      color: B.amber
    }
  }, "SUPAPARK")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: B.ui,
      fontSize: 13,
      color: B.sub
    }
  }, location), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: B.mono,
      fontSize: 12,
      color: B.sub,
      border: "1px solid #2a2a2a",
      borderRadius: 6,
      padding: "3px 8px",
      letterSpacing: ".08em"
    }
  }, lane)));
}

/* ---- Big plate ---- */
function Plate({
  value,
  size = 56
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: B.mono,
      fontWeight: 700,
      fontSize: size,
      color: B.text,
      letterSpacing: ".1em",
      lineHeight: 1,
      whiteSpace: "nowrap"
    }
  }, value);
}

/* ---- Status icon disc (check / x) ---- */
function StatusIcon({
  kind = "check",
  color = B.green,
  size = 132
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 0 ${size * 0.5}px ${color}55`,
      animation: "boothPop 420ms cubic-bezier(.2,.8,.2,1) both"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size * 0.56,
    height: size * 0.56,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#000",
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, kind === "check" ? /*#__PURE__*/React.createElement("path", {
    d: "M5 13l4 4L19 7"
  }) : /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18"
  }))));
}

/* ---- Deterministic QR-like code (white card, black modules) ---- */
function QRCode({
  size = 220
}) {
  const N = 25;
  // deterministic pseudo-random modules
  const cells = [];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const finder = (r, c) => r < 7 && c < 7 || r < 7 && c >= N - 7 || r >= N - 7 && c < 7;
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    if (finder(r, c)) continue;
    if (rnd() > 0.5) cells.push([r, c]);
  }
  const FinderEye = ({
    x,
    y
  }) => /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    x: x,
    y: y,
    width: 7,
    height: 7,
    fill: "#000"
  }), /*#__PURE__*/React.createElement("rect", {
    x: x + 1,
    y: y + 1,
    width: 5,
    height: 5,
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("rect", {
    x: x + 2,
    y: y + 2,
    width: 3,
    height: 3,
    fill: "#000"
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 12,
      padding: 14,
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${N} ${N}`,
    shapeRendering: "crispEdges"
  }, /*#__PURE__*/React.createElement("rect", {
    width: N,
    height: N,
    fill: "#fff"
  }), cells.map(([r, c], i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: c,
    y: r,
    width: 1,
    height: 1,
    fill: "#000"
  })), /*#__PURE__*/React.createElement(FinderEye, {
    x: 0,
    y: 0
  }), /*#__PURE__*/React.createElement(FinderEye, {
    x: N - 7,
    y: 0
  }), /*#__PURE__*/React.createElement(FinderEye, {
    x: 0,
    y: N - 7
  })));
}

/* ---- Shell: the 1024×600 black frame ---- */
function BoothShell({
  children,
  withBar = false,
  location,
  lane,
  glow
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 1024,
      height: 600,
      background: B.bg,
      overflow: "hidden",
      fontFamily: B.ui,
      color: B.text,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, glow && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `radial-gradient(ellipse at center, ${glow}14 0%, transparent 60%)`
    }
  }), withBar && /*#__PURE__*/React.createElement(TopBar, {
    location: location,
    lane: lane
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: withBar ? 56 : 0
    }
  }, children));
}

/* ================= SCREENS ================= */

/* --- Idle (shared exit/entry) --- */
function IdleScreen() {
  return /*#__PURE__*/React.createElement(BoothShell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    size: 104
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: B.ui,
      fontWeight: 800,
      fontSize: 72,
      letterSpacing: ".12em",
      color: B.text
    }
  }, "SUPAPARK")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      fontSize: 26,
      color: B.sub,
      animation: "boothPulse 2.2s ease-in-out infinite"
    }
  }, "Menunggu kendaraan\u2026")));
}

/* --- Scanning (shared) --- */
function ScanningScreen() {
  return /*#__PURE__*/React.createElement(BoothShell, {
    withBar: true,
    lane: "LANE"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 560,
      height: 320,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 460,
      height: 220,
      border: "1px solid #1c1c1c",
      borderRadius: 14,
      overflow: "hidden",
      background: "#050505"
    }
  }, [["8px", "8px", null, null], [null, "8px", "8px", null], ["8px", null, null, "8px"], [null, null, "8px", "8px"]].map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "absolute",
      top: p[0],
      right: p[1],
      bottom: p[2],
      left: p[3],
      width: 28,
      height: 28,
      borderTop: p[0] ? `3px solid ${B.amber}` : "none",
      borderRight: p[1] ? `3px solid ${B.amber}` : "none",
      borderBottom: p[2] ? `3px solid ${B.amber}` : "none",
      borderLeft: p[3] ? `3px solid ${B.amber}` : "none",
      borderRadius: 4
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      height: 3,
      background: `linear-gradient(90deg, transparent, ${B.amber}, transparent)`,
      boxShadow: `0 0 16px ${B.amber}`,
      animation: "boothScan 1.6s ease-in-out infinite alternate"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      fontSize: 26,
      color: B.text,
      fontWeight: 600,
      animation: "boothPulse 1.4s ease-in-out infinite"
    }
  }, "Memindai kendaraan\u2026")));
}

/* --- Exit Payment (QRIS) --- */
function ExitPaymentScreen() {
  const [t, setT] = React.useState(45);
  React.useEffect(() => {
    const id = setInterval(() => setT(x => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(t % 60).padStart(2, "0");
  return /*#__PURE__*/React.createElement(BoothShell, {
    withBar: true,
    lane: "EXIT A"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 56,
      alignItems: "center",
      padding: "0 56px",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: B.sub,
      marginBottom: 12
    }
  }, "Total Pembayaran"), /*#__PURE__*/React.createElement(Plate, {
    value: "B 1234 ABC",
    size: 48
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: B.sub,
      marginTop: 10
    }
  }, "Masuk 10:32 \xB7 1 jam 47 menit \xB7 Mobil"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 80,
      fontWeight: 800,
      color: B.amber,
      marginTop: 18,
      lineHeight: 1,
      fontVariantNumeric: "tabular-nums"
    }
  }, "Rp 15.000"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: B.sub
    }
  }, "Sisa waktu"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: B.mono,
      fontSize: 22,
      fontWeight: 700,
      color: B.text,
      fontVariantNumeric: "tabular-nums"
    }
  }, mm, ":", ss))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(QRCode, {
    size: 210
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 22,
      fontWeight: 700,
      color: B.amber
    }
  }, "Scan untuk bayar"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 14,
      color: B.sub
    }
  }, "QRIS \xB7 GoPay \xB7 OVO \xB7 Dana"))));
}

/* --- Result template --- */
function ResultScreen({
  icon,
  iconColor,
  title,
  titleColor,
  plate,
  footer
}) {
  return /*#__PURE__*/React.createElement(BoothShell, {
    glow: iconColor
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(StatusIcon, {
    kind: icon,
    color: iconColor,
    size: 132
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      fontWeight: 700,
      color: titleColor,
      marginTop: 30
    }
  }, title), plate && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Plate, {
    value: plate,
    size: 40
  })), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: 22,
      color: B.sub
    }
  }, footer)));
}
function ExitSuccessScreen() {
  return /*#__PURE__*/React.createElement(ResultScreen, {
    icon: "check",
    iconColor: B.green,
    title: "Pembayaran Berhasil",
    titleColor: B.green,
    plate: "B 1234 ABC",
    footer: "Terima Kasih"
  });
}
function ExitMemberScreen() {
  return /*#__PURE__*/React.createElement(ResultScreen, {
    icon: "check",
    iconColor: B.amber,
    title: "Member Terverifikasi",
    titleColor: B.amber,
    plate: "B 1234 ABC",
    footer: "Selamat Jalan"
  });
}
function ErrorScreen() {
  return /*#__PURE__*/React.createElement(BoothShell, {
    glow: B.red
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(StatusIcon, {
    kind: "x",
    color: B.red,
    size: 132
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      fontWeight: 700,
      color: B.red,
      marginTop: 30
    }
  }, "Terjadi Kesalahan"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 22,
      color: B.sub,
      maxWidth: 560
    }
  }, "Plat tidak terdeteksi. Silakan hubungi petugas."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontFamily: B.mono,
      fontSize: 18,
      color: B.text
    }
  }, "0812-3456-7890")));
}

/* --- Entry success / member --- */
function InfoCell({
  label,
  value,
  valueColor = B.text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#0b0b0b",
      border: "1px solid #1c1c1c",
      borderRadius: 12,
      padding: "14px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: B.sub,
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: valueColor,
      fontVariantNumeric: "tabular-nums"
    }
  }, value));
}
function VehiclePill({
  children,
  color = B.text
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 16px",
      borderRadius: 999,
      border: `1.5px solid ${color}`,
      color,
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: ".04em"
    }
  }, children);
}
function EntryScreen({
  member
}) {
  const accent = member ? B.amber : B.green;
  return /*#__PURE__*/React.createElement(BoothShell, {
    withBar: true,
    lane: "ENTRY A"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(380px,1fr) 1fr",
      gap: 40,
      alignItems: "center",
      padding: "0 48px",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(StatusIcon, {
    kind: "check",
    color: accent,
    size: 96
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 700,
      color: accent,
      marginTop: 22
    }
  }, "Selamat Datang"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Plate, {
    value: "B 1234 ABC",
    size: 40
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "flex",
      justifyContent: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(VehiclePill, {
    color: B.text
  }, "Mobil"), member && /*#__PURE__*/React.createElement(VehiclePill, {
    color: B.amber
  }, "MEMBER"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(InfoCell, {
    label: "Waktu Masuk",
    value: "14:35 WIB"
  }), member ? /*#__PURE__*/React.createElement(InfoCell, {
    label: "Tarif",
    value: "GRATIS",
    valueColor: B.green
  }) : /*#__PURE__*/React.createElement(InfoCell, {
    label: "Tarif",
    value: "Rp 5.000/jam"
  }), /*#__PURE__*/React.createElement(InfoCell, {
    label: "Maks / hari",
    value: "Rp 50.000"
  }), /*#__PURE__*/React.createElement(InfoCell, {
    label: "Sisa Slot",
    value: "142",
    valueColor: B.amber
  }))));
}
function EntrySuccessScreen() {
  return /*#__PURE__*/React.createElement(EntryScreen, {
    member: false
  });
}
function EntryMemberScreen() {
  return /*#__PURE__*/React.createElement(EntryScreen, {
    member: true
  });
}

/* ================= SIMULATOR ================= */
const SCREENS = {
  exit: [{
    id: "idle",
    label: "Idle",
    el: IdleScreen
  }, {
    id: "scan",
    label: "Scanning",
    el: ScanningScreen
  }, {
    id: "payment",
    label: "Payment (QRIS)",
    el: ExitPaymentScreen
  }, {
    id: "success",
    label: "Success",
    el: ExitSuccessScreen
  }, {
    id: "member",
    label: "Member",
    el: ExitMemberScreen
  }, {
    id: "error",
    label: "Error",
    el: ErrorScreen
  }],
  entry: [{
    id: "idle",
    label: "Idle",
    el: IdleScreen
  }, {
    id: "scan",
    label: "Scanning",
    el: ScanningScreen
  }, {
    id: "success",
    label: "Entry Success",
    el: EntrySuccessScreen
  }, {
    id: "member",
    label: "Entry Member",
    el: EntryMemberScreen
  }]
};
function BoothSimulator() {
  const [mode, setMode] = React.useState("exit");
  const [idx, setIdx] = React.useState(0);
  const list = SCREENS[mode];
  const Cur = list[Math.min(idx, list.length - 1)].el;
  const [scale, setScale] = React.useState(1);
  const holderRef = React.useRef(null);
  React.useEffect(() => {
    const fit = () => {
      if (!holderRef.current) return;
      const w = holderRef.current.clientWidth;
      setScale(Math.min(1, w / 1024));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  const tab = (m, txt) => /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setMode(m);
      setIdx(0);
    },
    style: {
      fontFamily: B.ui,
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: ".08em",
      padding: "9px 18px",
      borderRadius: 8,
      cursor: "pointer",
      border: "1px solid",
      textTransform: "uppercase",
      background: mode === m ? B.amber : "transparent",
      color: mode === m ? "#000" : B.sub,
      borderColor: mode === m ? B.amber : "#2a2a2a"
    }
  }, txt);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "#0A0A0A",
      padding: "28px 24px 40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 22,
      fontFamily: B.ui
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 1024,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    size: 28
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: "#F5F5F0",
      letterSpacing: ".04em"
    }
  }, "Booth Kiosk"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#666660"
    }
  }, "7\" display \xB7 1024 \xD7 600 \xB7 Bahasa Indonesia"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, tab("exit", "Exit"), tab("entry", "Entry"))), /*#__PURE__*/React.createElement("div", {
    ref: holderRef,
    style: {
      width: "100%",
      maxWidth: 1024,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1024 * scale,
      height: 600 * scale
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1024,
      height: 600,
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      borderRadius: 16,
      overflow: "hidden",
      border: "2px solid #1c1c1c",
      boxShadow: "0 30px 80px rgba(0,0,0,.6)"
    }
  }, /*#__PURE__*/React.createElement(Cur, null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "center",
      maxWidth: 1024
    }
  }, list.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    onClick: () => setIdx(i),
    style: {
      fontFamily: B.ui,
      fontSize: 13,
      fontWeight: 600,
      padding: "8px 14px",
      borderRadius: 8,
      cursor: "pointer",
      border: "1px solid",
      background: i === idx ? "#1a1a1a" : "transparent",
      color: i === idx ? "#F5F5F0" : "#A3A39A",
      borderColor: i === idx ? "#F5A623" : "#2a2a2a"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#666660",
      marginRight: 8,
      fontFamily: B.mono,
      fontSize: 11
    }
  }, String(i + 1).padStart(2, "0")), s.label))));
}
Object.assign(window, {
  BoothShell,
  IdleScreen,
  ScanningScreen,
  ExitPaymentScreen,
  ExitSuccessScreen,
  ExitMemberScreen,
  ErrorScreen,
  EntrySuccessScreen,
  EntryMemberScreen,
  BoothSimulator
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/booth/BoothScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Leads.jsx
try { (() => {
/* SupaPark Dashboard — Leads list + detail. window.SP_Leads, window.SP_LeadDetail */
(function () {
  const U = window.SPUI;
  const {
    StatCard,
    Panel,
    Table,
    THRow,
    TD,
    SearchInput,
    Select,
    FilterBar,
    StatusPill,
    EmptyState,
    MapPanel,
    PageHeader,
    Icon
  } = U;
  const fmtDate = (s, locale) => {
    if (!s || s === "—") return "—";
    const d = new Date(s);
    return d.toLocaleDateString(locale === "en" ? "en-GB" : "id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  /* ---------- LIST ---------- */
  function Leads({
    t,
    locale,
    go
  }) {
    const D = window.SP_DATA;
    const [q, setQ] = React.useState("");
    const [status, setStatus] = React.useState("all");
    const [source, setSource] = React.useState("all");
    const counts = {
      total: D.leads.length,
      new: 0,
      qualified: 0,
      converted: 0
    };
    D.leads.forEach(l => {
      if (counts[l.status] != null) counts[l.status]++;
    });
    const sources = ["all", ...Array.from(new Set(D.leads.map(l => l.source)))];
    const filtered = D.leads.filter(l => {
      const mq = !q || (l.name + l.facility + l.city).toLowerCase().includes(q.toLowerCase());
      const ms = status === "all" || l.status === status;
      const msrc = source === "all" || l.source === source;
      return mq && ms && msrc;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 22
      }
    }, /*#__PURE__*/React.createElement(PageHeader, {
      title: t.leads,
      sub: locale === "en" ? "Inbound prospects across Indonesia" : "Calon pelanggan dari seluruh Indonesia",
      actions: /*#__PURE__*/React.createElement("button", {
        style: btnPrimary
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 16,
        color: "#0A0A0A"
      }), locale === "en" ? "Add Lead" : "Tambah Lead")
    }), /*#__PURE__*/React.createElement("div", {
      className: "sp-grid-4",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: locale === "en" ? "Total Leads" : "Total Lead",
      value: counts.total,
      accent: "#A3A39A",
      icon: "users"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: U.LEAD_STATUS.new[locale],
      value: counts.new,
      accent: U.CAT.blue,
      icon: "sparkles"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: U.LEAD_STATUS.qualified[locale],
      value: counts.qualified,
      accent: U.CAT.green,
      icon: "badge-check"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: U.LEAD_STATUS.converted[locale],
      value: counts.converted,
      accent: U.CAT.purple,
      icon: "git-branch"
    })), /*#__PURE__*/React.createElement(FilterBar, null, /*#__PURE__*/React.createElement(SearchInput, {
      value: q,
      onChange: setQ,
      placeholder: locale === "en" ? "Search name, facility, city…" : "Cari nama, fasilitas, kota…"
    }), /*#__PURE__*/React.createElement(Select, {
      value: status,
      onChange: setStatus,
      icon: "filter",
      options: [{
        value: "all",
        label: locale === "en" ? "All status" : "Semua status"
      }, ...Object.keys(U.LEAD_STATUS).map(k => ({
        value: k,
        label: U.LEAD_STATUS[k][locale]
      }))]
    }), /*#__PURE__*/React.createElement(Select, {
      value: source,
      onChange: setSource,
      icon: "radio",
      options: sources.map(s => ({
        value: s,
        label: s === "all" ? locale === "en" ? "All sources" : "Semua sumber" : s
      }))
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontSize: 13,
        color: "var(--text-tertiary)"
      }
    }, filtered.length, " ", locale === "en" ? "results" : "hasil")), /*#__PURE__*/React.createElement(Panel, {
      pad: false
    }, filtered.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
      icon: "search-x",
      title: locale === "en" ? "No leads found" : "Lead tidak ditemukan",
      sub: locale === "en" ? "Try adjusting your filters or search." : "Coba ubah filter atau kata kunci."
    }) : /*#__PURE__*/React.createElement(Table, {
      columns: [{
        label: locale === "en" ? "Name" : "Nama"
      }, {
        label: locale === "en" ? "Facility" : "Fasilitas"
      }, {
        label: locale === "en" ? "City" : "Kota"
      }, {
        label: t.status
      }, {
        label: locale === "en" ? "Source" : "Sumber"
      }, {
        label: locale === "en" ? "Date" : "Tanggal"
      }, {
        label: "",
        align: "right"
      }]
    }, filtered.map((l, i) => /*#__PURE__*/React.createElement(THRow, {
      key: l.id,
      last: i === filtered.length - 1,
      onClick: () => go("leadDetail", l.id)
    }, /*#__PURE__*/React.createElement(TD, {
      strong: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: avatar(l.name)
    }, initials(l.name)), l.name)), /*#__PURE__*/React.createElement(TD, null, l.facility), /*#__PURE__*/React.createElement(TD, null, l.city), /*#__PURE__*/React.createElement(TD, null, /*#__PURE__*/React.createElement(StatusPill, {
      kind: "lead",
      value: l.status,
      locale: locale
    })), /*#__PURE__*/React.createElement(TD, null, l.source), /*#__PURE__*/React.createElement(TD, {
      mono: true
    }, fmtDate(l.date, locale)), /*#__PURE__*/React.createElement(TD, {
      align: "right"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 16,
      color: "var(--text-tertiary)"
    })))))));
  }

  /* ---------- DETAIL ---------- */
  function LeadDetail({
    t,
    locale,
    id,
    go
  }) {
    const l = window.SP_DATA.leads.find(x => x.id === id) || window.SP_DATA.leads[0];
    const [notes, setNotes] = React.useState(l.notes);
    const en = locale === "en";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 22
      }
    }, /*#__PURE__*/React.createElement(PageHeader, {
      back: () => go("leads"),
      title: /*#__PURE__*/React.createElement(React.Fragment, null, l.name, /*#__PURE__*/React.createElement(StatusPill, {
        kind: "lead",
        value: l.status,
        locale: locale,
        size: "lg"
      })),
      sub: l.facility + " · " + l.city,
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        style: btnGhost
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "refresh-cw",
        size: 15,
        color: "var(--text-secondary)"
      }), en ? "Change Status" : "Ubah Status"), l.status === "qualified" && /*#__PURE__*/React.createElement("button", {
        style: btnPrimary
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "git-branch",
        size: 15,
        color: "#0A0A0A"
      }), en ? "Convert to Project" : "Jadikan Proyek"))
    }), /*#__PURE__*/React.createElement("div", {
      className: "sp-grid-2",
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: en ? "Contact" : "Kontak",
      icon: "user"
    }, /*#__PURE__*/React.createElement(InfoList, {
      rows: [{
        ic: "user",
        k: en ? "Name" : "Nama",
        v: l.name
      }, {
        ic: "mail",
        k: "Email",
        v: l.email,
        mono: true
      }, {
        ic: "phone",
        k: en ? "Phone" : "Telepon",
        v: l.phone,
        mono: true
      }, {
        ic: "building-2",
        k: en ? "Facility" : "Fasilitas",
        v: l.facility
      }, {
        ic: "radio",
        k: en ? "Source" : "Sumber",
        v: l.source
      }, {
        ic: "calendar",
        k: en ? "Registered" : "Terdaftar",
        v: fmtDate(l.date, locale),
        mono: true
      }]
    })), /*#__PURE__*/React.createElement(Panel, {
      title: en ? "Facility details" : "Detail Fasilitas",
      icon: "building-2"
    }, /*#__PURE__*/React.createElement(InfoList, {
      rows: [{
        ic: "map-pin",
        k: en ? "City" : "Kota",
        v: l.city
      }, {
        ic: "navigation",
        k: en ? "Address" : "Alamat",
        v: l.address
      }, {
        ic: "arrow-down-left",
        k: en ? "Lanes" : "Jalur",
        v: `${l.lanesIn} ${en ? "entry" : "masuk"} · ${l.lanesOut} ${en ? "exit" : "keluar"}`
      }, {
        ic: "cpu",
        k: en ? "Current system" : "Sistem saat ini",
        v: l.system
      }, {
        ic: "activity",
        k: en ? "Daily volume" : "Volume harian",
        v: `${l.volume.toLocaleString("id-ID")} ${en ? "vehicles" : "kendaraan"}`
      }, {
        ic: "calendar-clock",
        k: en ? "Preferred date" : "Tanggal diinginkan",
        v: fmtDate(l.prefDate, locale),
        mono: true
      }]
    }))), /*#__PURE__*/React.createElement(Panel, {
      title: en ? "Location" : "Lokasi",
      icon: "map",
      pad: false
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(MapPanel, {
      lat: l.lat,
      lng: l.lng,
      label: l.address,
      height: 300
    }))), /*#__PURE__*/React.createElement(Panel, {
      title: en ? "Notes" : "Catatan",
      icon: "sticky-note",
      right: /*#__PURE__*/React.createElement("button", {
        style: {
          ...btnGhost,
          height: 30,
          padding: "0 12px",
          fontSize: 12
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "save",
        size: 14,
        color: "var(--text-secondary)"
      }), en ? "Save" : "Simpan")
    }, /*#__PURE__*/React.createElement("textarea", {
      value: notes,
      onChange: e => setNotes(e.target.value),
      placeholder: en ? "Add a note about this lead…" : "Tambahkan catatan tentang lead ini…",
      style: {
        width: "100%",
        minHeight: 96,
        padding: 14,
        background: "var(--surface-overlay)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        color: "var(--text-primary)",
        fontSize: 14,
        fontFamily: "var(--font-ui)",
        lineHeight: 1.6,
        resize: "vertical",
        boxSizing: "border-box"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        ...btnGhost,
        color: "var(--error)",
        borderColor: "rgba(239,68,68,.3)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash-2",
      size: 15,
      color: "var(--error)"
    }), en ? "Delete Lead" : "Hapus Lead")));
  }

  /* ---------- shared bits ---------- */
  function InfoList({
    rows
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "10px 0",
        borderBottom: i < rows.length - 1 ? "1px solid var(--border-faint)" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        flexShrink: 0,
        borderRadius: 8,
        background: "var(--surface-overlay)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: r.ic,
      size: 15,
      color: "var(--text-tertiary)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-tertiary)",
        marginBottom: 2
      }
    }, r.k), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "var(--text-primary)",
        fontFamily: r.mono ? "var(--font-mono)" : "inherit",
        wordBreak: "break-word"
      }
    }, r.v)))));
  }
  const btnPrimary = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 40,
    padding: "0 16px",
    borderRadius: 8,
    border: "none",
    background: "var(--amber)",
    color: "#0A0A0A",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "var(--font-ui)",
    cursor: "pointer"
  };
  const btnGhost = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 40,
    padding: "0 14px",
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--surface-raised)",
    color: "var(--text-secondary)",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "var(--font-ui)",
    cursor: "pointer"
  };
  function initials(n) {
    return n.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  }
  const AV = ["#F5A623", "#3B82F6", "#22C55E", "#A855F7", "#F97316"];
  function avatar(name) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
    const c = AV[Math.abs(h) % AV.length];
    return {
      width: 30,
      height: 30,
      flexShrink: 0,
      borderRadius: 8,
      background: c + "22",
      color: c,
      fontSize: 11,
      fontWeight: 700,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-ui)"
    };
  }
  window.SP_Leads = Leads;
  window.SP_LeadDetail = LeadDetail;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Leads.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Overview.jsx
try { (() => {
/* SupaPark Dashboard — Overview page. window.SP_Overview */
(function () {
  const U = window.SPUI;
  const {
    StatCard,
    Panel,
    Table,
    THRow,
    TD,
    RevenueChart,
    OccupancyGauge,
    Icon
  } = U;
  const _DS = window.SupaParkDesignSystem_80b640;
  const {
    StatusBadge,
    PlateDisplay
  } = _DS;
  function Overview({
    t,
    locale
  }) {
    const D = window.SP_DATA;
    const carType = locale === "en" ? "Car" : "Mobil";
    const motoType = locale === "en" ? "Moto" : "Motor";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 22
      }
    }, /*#__PURE__*/React.createElement(U.PageHeader, {
      title: t.liveOverview,
      sub: locale === "en" ? "Real-time across all lanes · updated 3s ago" : "Real-time semua jalur · diperbarui 3 detik lalu"
    }), /*#__PURE__*/React.createElement("div", {
      className: "sp-grid-4",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: t.activeSessions,
      value: "47",
      trend: locale === "en" ? "3 awaiting payment" : "3 menunggu bayar",
      trendDir: "muted",
      accent: "#F5A623",
      icon: "clock"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: t.todayRevenue,
      value: U.rupiah(D.stats.revenueToday),
      trend: "+12% vs kemarin",
      trendDir: "up",
      accent: "#22C55E",
      icon: "dollar-sign"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: t.occupancy,
      value: "72%",
      trend: locale === "en" ? "139 free" : "139 slot kosong",
      trendDir: "muted",
      accent: "#3B82F6",
      icon: "gauge"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: t.alerts,
      value: "1",
      trend: locale === "en" ? "Exit B offline" : "Exit B offline",
      trendDir: "down",
      accent: "#EF4444",
      icon: "triangle-alert"
    })), /*#__PURE__*/React.createElement("div", {
      className: "sp-grid-2",
      style: {
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: locale === "en" ? "Revenue — last 7 days" : "Pendapatan — 7 hari terakhir",
      icon: "trending-up",
      right: /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: "var(--amber)",
          fontVariantNumeric: "tabular-nums"
        }
      }, U.rupiahFull(D.revenue7d.reduce((a, b) => a + b.v, 0)))
    }, /*#__PURE__*/React.createElement(RevenueChart, {
      data: D.revenue7d
    })), /*#__PURE__*/React.createElement(Panel, {
      title: t.occupancy,
      icon: "gauge"
    }, /*#__PURE__*/React.createElement(OccupancyGauge, {
      mix: D.occupancyMix
    }))), /*#__PURE__*/React.createElement("div", {
      className: "sp-grid-2",
      style: {
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gap: 16,
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: t.recentSessions,
      icon: "clock",
      pad: false,
      right: /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "var(--text-tertiary)"
        }
      }, locale === "en" ? "Last 8" : "8 terakhir")
    }, /*#__PURE__*/React.createElement(Table, {
      columns: [{
        label: t.plate
      }, {
        label: t.type
      }, {
        label: t.entry
      }, {
        label: t.duration
      }, {
        label: t.status
      }]
    }, D.recentSessions.map((s, i) => /*#__PURE__*/React.createElement(THRow, {
      key: i,
      last: i === D.recentSessions.length - 1
    }, /*#__PURE__*/React.createElement(TD, null, /*#__PURE__*/React.createElement(PlateDisplay, {
      plate: s.plate,
      size: "sm"
    })), /*#__PURE__*/React.createElement(TD, null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.type === "car" ? "car" : "bike",
      size: 14,
      color: "var(--text-secondary)"
    }), s.type === "car" ? carType : motoType)), /*#__PURE__*/React.createElement(TD, {
      mono: true
    }, s.entry), /*#__PURE__*/React.createElement(TD, {
      strong: true,
      mono: true
    }, s.dur), /*#__PURE__*/React.createElement(TD, null, /*#__PURE__*/React.createElement(StatusBadge, {
      value: s.st
    })))))), /*#__PURE__*/React.createElement(Panel, {
      title: t.alerts,
      icon: "triangle-alert",
      right: /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontWeight: 600,
          color: "var(--error)",
          background: "rgba(239,68,68,.15)",
          borderRadius: 999,
          padding: "2px 9px"
        }
      }, "1")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        border: "1px solid var(--border)",
        background: "var(--surface-overlay)",
        borderRadius: 10,
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        flexShrink: 0,
        borderRadius: 8,
        background: "rgba(239,68,68,.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "wifi-off",
      size: 16,
      color: "var(--error)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--text-primary)"
      }
    }, locale === "en" ? "Lane Exit B offline" : "Jalur Exit B offline"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".05em",
        color: "var(--error)",
        background: "rgba(239,68,68,.15)",
        borderRadius: 5,
        padding: "2px 6px"
      }
    }, "Critical")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)",
        marginTop: 5,
        lineHeight: 1.5
      }
    }, locale === "en" ? "No heartbeat for 5 minutes. Gate sensor error detected." : "Tidak ada heartbeat selama 5 menit. Sensor portal terdeteksi error."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        height: 30,
        padding: "0 12px",
        fontSize: 12,
        fontWeight: 600,
        borderRadius: 6,
        border: "1px solid var(--border)",
        background: "var(--surface-raised)",
        color: "var(--text-primary)",
        cursor: "pointer",
        fontFamily: "var(--font-ui)"
      }
    }, t.resolve), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-tertiary)"
      }
    }, "5m ago")))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "8px 0 2px",
        fontSize: 12,
        color: "var(--text-tertiary)"
      }
    }, locale === "en" ? "All other lanes operational" : "Jalur lain beroperasi normal")))));
  }
  window.SP_Overview = Overview;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Overview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Projects.jsx
try { (() => {
/* SupaPark Dashboard — Projects list + detail. window.SP_Projects, window.SP_ProjectDetail */
(function () {
  const U = window.SPUI;
  const {
    StatCard,
    Panel,
    Table,
    THRow,
    TD,
    SearchInput,
    Select,
    FilterBar,
    StatusPill,
    EmptyState,
    MapPanel,
    Pipeline,
    PageHeader,
    Icon
  } = U;
  const fmtDate = (s, locale) => {
    if (!s || s === "—") return "—";
    const d = new Date(s);
    return d.toLocaleDateString(locale === "en" ? "en-GB" : "id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  /* ---------- LIST ---------- */
  function Projects({
    t,
    locale,
    go
  }) {
    const D = window.SP_DATA;
    const [q, setQ] = React.useState("");
    const [status, setStatus] = React.useState("all");
    const en = locale === "en";
    const total = D.projects.length;
    const active = D.projects.filter(p => p.status !== "live").length;
    const live = D.projects.filter(p => p.status === "live").length;
    const filtered = D.projects.filter(p => {
      const mq = !q || (p.facility + p.contact + p.city).toLowerCase().includes(q.toLowerCase());
      const ms = status === "all" || p.status === status;
      return mq && ms;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 22
      }
    }, /*#__PURE__*/React.createElement(PageHeader, {
      title: t.projects,
      sub: en ? "Active rollouts and live deployments" : "Implementasi berjalan dan deployment aktif",
      actions: /*#__PURE__*/React.createElement("button", {
        style: btnPrimary
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 16,
        color: "#0A0A0A"
      }), en ? "New Project" : "Proyek Baru")
    }), /*#__PURE__*/React.createElement("div", {
      className: "sp-grid-3",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: en ? "Total Projects" : "Total Proyek",
      value: total,
      accent: "#A3A39A",
      icon: "folder"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: en ? "In Progress" : "Berjalan",
      value: active,
      accent: "#F5A623",
      icon: "loader"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: U.PROJECT_STATUS.live[locale],
      value: live,
      accent: U.CAT.green,
      icon: "circle-check-big"
    })), /*#__PURE__*/React.createElement(FilterBar, null, /*#__PURE__*/React.createElement(SearchInput, {
      value: q,
      onChange: setQ,
      placeholder: en ? "Search facility, contact, city…" : "Cari fasilitas, kontak, kota…"
    }), /*#__PURE__*/React.createElement(Select, {
      value: status,
      onChange: setStatus,
      icon: "filter",
      options: [{
        value: "all",
        label: en ? "All status" : "Semua status"
      }, ...Object.keys(U.PROJECT_STATUS).map(k => ({
        value: k,
        label: U.PROJECT_STATUS[k][locale]
      }))]
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontSize: 13,
        color: "var(--text-tertiary)"
      }
    }, filtered.length, " ", en ? "results" : "hasil")), /*#__PURE__*/React.createElement(Panel, {
      pad: false
    }, filtered.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
      icon: "folder-x",
      title: en ? "No projects found" : "Proyek tidak ditemukan",
      sub: en ? "Try adjusting your filters." : "Coba ubah filter pencarian."
    }) : /*#__PURE__*/React.createElement(Table, {
      columns: [{
        label: en ? "Facility" : "Fasilitas"
      }, {
        label: en ? "Contact" : "Kontak"
      }, {
        label: en ? "City" : "Kota"
      }, {
        label: en ? "Lanes" : "Jalur",
        align: "center"
      }, {
        label: t.status
      }, {
        label: en ? "Target Live" : "Target Aktif"
      }, {
        label: "",
        align: "right"
      }]
    }, filtered.map((p, i) => /*#__PURE__*/React.createElement(THRow, {
      key: p.id,
      last: i === filtered.length - 1,
      onClick: () => go("projectDetail", p.id)
    }, /*#__PURE__*/React.createElement(TD, {
      strong: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        flexShrink: 0,
        borderRadius: 8,
        background: "var(--surface-overlay)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "building-2",
      size: 15,
      color: "var(--text-tertiary)"
    })), p.facility)), /*#__PURE__*/React.createElement(TD, null, p.contact), /*#__PURE__*/React.createElement(TD, null, p.city), /*#__PURE__*/React.createElement(TD, {
      align: "center",
      mono: true
    }, p.lanesIn + p.lanesOut), /*#__PURE__*/React.createElement(TD, null, /*#__PURE__*/React.createElement(StatusPill, {
      kind: "project",
      value: p.status,
      locale: locale
    })), /*#__PURE__*/React.createElement(TD, {
      mono: true
    }, fmtDate(p.targetLive, locale)), /*#__PURE__*/React.createElement(TD, {
      align: "right"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 16,
      color: "var(--text-tertiary)"
    })))))));
  }

  /* ---------- DETAIL ---------- */
  function ProjectDetail({
    t,
    locale,
    id,
    go
  }) {
    const p = window.SP_DATA.projects.find(x => x.id === id) || window.SP_DATA.projects[0];
    const [notes, setNotes] = React.useState(p.notes);
    const en = locale === "en";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 22
      }
    }, /*#__PURE__*/React.createElement(PageHeader, {
      back: () => go("projects"),
      title: /*#__PURE__*/React.createElement(React.Fragment, null, p.facility, /*#__PURE__*/React.createElement(StatusPill, {
        kind: "project",
        value: p.status,
        locale: locale,
        size: "lg"
      })),
      sub: p.contact + " · " + p.city,
      actions: /*#__PURE__*/React.createElement("button", {
        style: btnGhost
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "refresh-cw",
        size: 15,
        color: "var(--text-secondary)"
      }), en ? "Update Status" : "Perbarui Status")
    }), /*#__PURE__*/React.createElement(Panel, {
      title: en ? "Deployment pipeline" : "Alur Deployment",
      icon: "git-commit-horizontal"
    }, /*#__PURE__*/React.createElement(Pipeline, {
      status: p.status,
      locale: locale
    })), /*#__PURE__*/React.createElement("div", {
      className: "sp-grid-2",
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: en ? "Contact" : "Kontak",
      icon: "user"
    }, /*#__PURE__*/React.createElement(InfoList, {
      rows: [{
        ic: "user",
        k: en ? "Contact" : "Kontak",
        v: p.contact
      }, {
        ic: "mail",
        k: "Email",
        v: p.email,
        mono: true
      }, {
        ic: "phone",
        k: en ? "Phone" : "Telepon",
        v: p.phone,
        mono: true
      }, {
        ic: "navigation",
        k: en ? "Address" : "Alamat",
        v: p.address
      }]
    })), /*#__PURE__*/React.createElement(Panel, {
      title: en ? "Project details" : "Detail Proyek",
      icon: "clipboard-list"
    }, /*#__PURE__*/React.createElement(InfoList, {
      rows: [{
        ic: "arrow-down-left",
        k: en ? "Lanes" : "Jalur",
        v: `${p.lanesIn} ${en ? "entry" : "masuk"} · ${p.lanesOut} ${en ? "exit" : "keluar"}`
      }, {
        ic: "play",
        k: en ? "Start date" : "Tanggal mulai",
        v: fmtDate(p.startDate, locale),
        mono: true
      }, {
        ic: "target",
        k: en ? "Target live" : "Target aktif",
        v: fmtDate(p.targetLive, locale),
        mono: true
      }, {
        ic: "circle-check-big",
        k: en ? "Actual live" : "Aktif sejak",
        v: fmtDate(p.actualLive, locale),
        mono: true
      }]
    }))), /*#__PURE__*/React.createElement(Panel, {
      title: en ? "Location" : "Lokasi",
      icon: "map",
      pad: false
    }, /*#__PURE__*/React.createElement(MapPanel, {
      lat: p.lat,
      lng: p.lng,
      label: p.address,
      height: 300
    })), /*#__PURE__*/React.createElement(Panel, {
      title: en ? "Notes" : "Catatan",
      icon: "sticky-note",
      right: /*#__PURE__*/React.createElement("button", {
        style: {
          ...btnGhost,
          height: 30,
          padding: "0 12px",
          fontSize: 12
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "save",
        size: 14,
        color: "var(--text-secondary)"
      }), en ? "Save" : "Simpan")
    }, /*#__PURE__*/React.createElement("textarea", {
      value: notes,
      onChange: e => setNotes(e.target.value),
      style: {
        width: "100%",
        minHeight: 96,
        padding: 14,
        background: "var(--surface-overlay)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        color: "var(--text-primary)",
        fontSize: 14,
        fontFamily: "var(--font-ui)",
        lineHeight: 1.6,
        resize: "vertical",
        boxSizing: "border-box"
      }
    })));
  }
  function InfoList({
    rows
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "10px 0",
        borderBottom: i < rows.length - 1 ? "1px solid var(--border-faint)" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        flexShrink: 0,
        borderRadius: 8,
        background: "var(--surface-overlay)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: r.ic,
      size: 15,
      color: "var(--text-tertiary)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-tertiary)",
        marginBottom: 2
      }
    }, r.k), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "var(--text-primary)",
        fontFamily: r.mono ? "var(--font-mono)" : "inherit",
        wordBreak: "break-word"
      }
    }, r.v)))));
  }
  const btnPrimary = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 40,
    padding: "0 16px",
    borderRadius: 8,
    border: "none",
    background: "var(--amber)",
    color: "#0A0A0A",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "var(--font-ui)",
    cursor: "pointer"
  };
  const btnGhost = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 40,
    padding: "0 14px",
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--surface-raised)",
    color: "var(--text-secondary)",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "var(--font-ui)",
    cursor: "pointer"
  };
  window.SP_Projects = Projects;
  window.SP_ProjectDetail = ProjectDetail;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Projects.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Shell.jsx
try { (() => {
/* SupaPark Dashboard — Shell: sidebar, routing, location selector, language
   toggle, secondary-page stubs, mobile layout + preview toggle. window.SP_App */
(function () {
  const U = window.SPUI;
  const {
    Icon,
    Panel,
    PageHeader,
    EmptyState
  } = U;
  const _DS = window.SupaParkDesignSystem_80b640;
  const {
    Logo
  } = _DS;
  const T = {
    en: {
      liveOverview: "Live Overview",
      overview: "Overview",
      sessions: "Sessions",
      revenue: "Revenue",
      members: "Members",
      plateRules: "Plate Rules",
      leads: "Leads",
      projects: "Projects",
      devices: "Devices",
      settings: "Settings",
      activeSessions: "Active Sessions",
      todayRevenue: "Today's Revenue",
      occupancy: "Occupancy",
      alerts: "Alerts",
      recentSessions: "Recent Sessions",
      plate: "Plate",
      type: "Type",
      entry: "Entry",
      duration: "Duration",
      status: "Status",
      resolve: "Resolve",
      lang: "English",
      langSwitch: "Bahasa Indonesia",
      soon: "Module preview",
      soonSub: "This screen is part of the SupaPark build. The Overview, Leads and Projects flows are fully designed in this kit."
    },
    id: {
      liveOverview: "Ringkasan Langsung",
      overview: "Ringkasan",
      sessions: "Sesi",
      revenue: "Pendapatan",
      members: "Anggota",
      plateRules: "Aturan Plat",
      leads: "Leads",
      projects: "Proyek",
      devices: "Perangkat",
      settings: "Pengaturan",
      activeSessions: "Sesi Aktif",
      todayRevenue: "Pendapatan Hari Ini",
      occupancy: "Okupansi",
      alerts: "Peringatan",
      recentSessions: "Sesi Terbaru",
      plate: "Plat",
      type: "Jenis",
      entry: "Masuk",
      duration: "Durasi",
      status: "Status",
      resolve: "Selesaikan",
      lang: "Bahasa Indonesia",
      langSwitch: "English",
      soon: "Pratinjau Modul",
      soonSub: "Layar ini bagian dari sistem SupaPark. Alur Ringkasan, Leads, dan Proyek telah dirancang lengkap di kit ini."
    }
  };
  const NAV = [{
    key: "overview",
    icon: "layout-dashboard"
  }, {
    key: "sessions",
    icon: "clock"
  }, {
    key: "revenue",
    icon: "dollar-sign"
  }, {
    key: "members",
    icon: "users"
  }, {
    key: "plateRules",
    icon: "scan-line"
  }, {
    key: "leads",
    icon: "user-plus"
  }, {
    key: "projects",
    icon: "folder-kanban"
  }, {
    key: "devices",
    icon: "cpu"
  }, {
    key: "settings",
    icon: "settings"
  }];
  const MOBILE_NAV = ["overview", "sessions", "leads", "projects", "settings"];
  // page -> active nav key
  const ACTIVE_OF = {
    leadDetail: "leads",
    projectDetail: "projects"
  };
  function renderPage(page, id, t, locale, go) {
    switch (page) {
      case "overview":
        return /*#__PURE__*/React.createElement(window.SP_Overview, {
          t: t,
          locale: locale
        });
      case "leads":
        return /*#__PURE__*/React.createElement(window.SP_Leads, {
          t: t,
          locale: locale,
          go: go
        });
      case "leadDetail":
        return /*#__PURE__*/React.createElement(window.SP_LeadDetail, {
          t: t,
          locale: locale,
          id: id,
          go: go
        });
      case "projects":
        return /*#__PURE__*/React.createElement(window.SP_Projects, {
          t: t,
          locale: locale,
          go: go
        });
      case "projectDetail":
        return /*#__PURE__*/React.createElement(window.SP_ProjectDetail, {
          t: t,
          locale: locale,
          id: id,
          go: go
        });
      default:
        return /*#__PURE__*/React.createElement(Stub, {
          t: t,
          locale: locale,
          page: page
        });
    }
  }
  function Stub({
    t,
    locale,
    page
  }) {
    const ICONS = {
      sessions: "clock",
      revenue: "dollar-sign",
      members: "users",
      plateRules: "scan-line",
      devices: "cpu",
      settings: "settings"
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 22
      }
    }, /*#__PURE__*/React.createElement(PageHeader, {
      title: t[page]
    }), /*#__PURE__*/React.createElement(Panel, {
      pad: false
    }, /*#__PURE__*/React.createElement(EmptyState, {
      icon: ICONS[page] || "layers",
      title: t.soon,
      sub: t.soonSub
    })));
  }

  /* ---------- Location selector ---------- */
  function LocationSelector({
    locale
  }) {
    const [open, setOpen] = React.useState(false);
    const [loc, setLoc] = React.useState(window.SP_DATA.locations[0]);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 12px",
        background: "var(--surface-overlay)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        color: "var(--text-primary)",
        fontSize: 13,
        fontFamily: "var(--font-ui)",
        cursor: "pointer",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 15,
      color: "var(--amber)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, loc), /*#__PURE__*/React.createElement(Icon, {
      name: open ? "chevron-up" : "chevron-down",
      size: 15,
      color: "var(--text-tertiary)"
    })), open && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: "calc(100% + 6px)",
        left: 0,
        right: 0,
        zIndex: 30,
        background: "var(--surface-overlay)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: 5,
        boxShadow: "0 12px 32px rgba(0,0,0,.5)"
      }
    }, window.SP_DATA.locations.map(l => /*#__PURE__*/React.createElement("button", {
      key: l,
      onClick: () => {
        setLoc(l);
        setOpen(false);
      },
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "9px 10px",
        background: l === loc ? "rgba(245,166,35,.08)" : "transparent",
        border: "none",
        borderRadius: 7,
        color: l === loc ? "var(--amber)" : "var(--text-secondary)",
        fontSize: 13,
        fontFamily: "var(--font-ui)",
        cursor: "pointer",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "building",
      size: 14,
      color: l === loc ? "var(--amber)" : "var(--text-tertiary)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, l), l === loc && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14,
      color: "var(--amber)"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid var(--border)",
        marginTop: 4,
        paddingTop: 4
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "9px 10px",
        background: "transparent",
        border: "none",
        borderRadius: 7,
        color: "var(--text-tertiary)",
        fontSize: 13,
        fontFamily: "var(--font-ui)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14,
      color: "var(--text-tertiary)"
    }), locale === "en" ? "Add location" : "Tambah lokasi"))));
  }

  /* ---------- Sidebar (desktop) ---------- */
  function Sidebar({
    active,
    go,
    locale,
    setLocale
  }) {
    const t = T[locale];
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        width: 240,
        flexShrink: 0,
        background: "var(--surface-raised)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "20px 20px 16px"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 26
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17,
        fontWeight: 700,
        color: "var(--text-primary)",
        letterSpacing: ".01em"
      }
    }, "SupaPark")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 14px 14px"
      }
    }, /*#__PURE__*/React.createElement(LocationSelector, {
      locale: locale
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: "var(--border)"
      }
    }), /*#__PURE__*/React.createElement("nav", {
      style: {
        flex: 1,
        padding: "12px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflowY: "auto"
      }
    }, NAV.map(n => {
      const on = active === n.key;
      return /*#__PURE__*/React.createElement("button", {
        key: n.key,
        onClick: () => go(n.key),
        style: {
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "9px 12px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          textAlign: "left",
          background: on ? "rgba(245,166,35,.07)" : "transparent",
          color: on ? "var(--amber)" : "var(--text-secondary)",
          fontWeight: on ? 600 : 400,
          transition: "background 120ms,color 120ms"
        }
      }, on && /*#__PURE__*/React.createElement("span", {
        style: {
          position: "absolute",
          left: -12,
          top: "50%",
          transform: "translateY(-50%)",
          width: 3,
          height: 22,
          background: "var(--amber)",
          borderRadius: "0 3px 3px 0"
        }
      }), /*#__PURE__*/React.createElement(Icon, {
        name: n.icon,
        size: 18,
        color: on ? "var(--amber)" : "var(--text-tertiary)"
      }), t[n.key]);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: "var(--border)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setLocale(locale === "en" ? "id" : "en"),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 9,
        width: "100%",
        padding: "9px 12px",
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--surface-overlay)",
        color: "var(--text-secondary)",
        fontSize: 13,
        fontFamily: "var(--font-ui)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "globe",
      size: 16,
      color: "var(--text-secondary)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        textAlign: "left"
      }
    }, t.lang), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-tertiary)"
      }
    }, locale.toUpperCase()))));
  }

  /* ---------- Desktop app ---------- */
  function DesktopApp({
    route,
    go,
    locale,
    setLocale
  }) {
    const t = T[locale];
    const active = ACTIVE_OF[route.page] || route.page;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        minHeight: "100vh",
        background: "var(--surface-base)"
      }
    }, /*#__PURE__*/React.createElement(Sidebar, {
      active: active,
      go: go,
      locale: locale,
      setLocale: setLocale
    }), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1,
        minWidth: 0,
        padding: "28px 32px 48px",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box"
      }
    }, renderPage(route.page, route.id, t, locale, go)));
  }

  /* ---------- Mobile app ---------- */
  function MobileApp({
    route,
    go,
    locale,
    setLocale
  }) {
    const t = T[locale];
    const active = ACTIVE_OF[route.page] || route.page;
    const [sheet, setSheet] = React.useState(false);
    return /*#__PURE__*/React.createElement("div", {
      className: "sp-mobile",
      style: {
        position: "relative",
        width: 390,
        height: 820,
        background: "var(--surface-base)",
        borderRadius: 36,
        border: "10px solid #1a1a1a",
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,.6)",
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 30,
        flexShrink: 0,
        background: "var(--surface-raised)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        fontSize: 12,
        fontWeight: 600,
        color: "var(--text-primary)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        gap: 5,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "signal",
      size: 13,
      color: "var(--text-primary)"
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "wifi",
      size: 13,
      color: "var(--text-primary)"
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "battery-full",
      size: 15,
      color: "var(--text-primary)"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 54,
        flexShrink: 0,
        background: "var(--surface-raised)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 14px"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 22
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-tertiary)",
        lineHeight: 1
      }
    }, locale === "en" ? "Location" : "Lokasi"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "var(--text-primary)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, window.SP_DATA.locations[0])), /*#__PURE__*/React.createElement("button", {
      onClick: () => setSheet(true),
      style: {
        width: 38,
        height: 38,
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--surface-overlay)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "menu",
      size: 18,
      color: "var(--text-secondary)"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        padding: "18px 14px 90px"
      }
    }, renderPage(route.page, route.id, t, locale, go)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 68,
        background: "rgba(17,17,17,.94)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "stretch",
        padding: "0 6px"
      }
    }, MOBILE_NAV.map(key => {
      const n = NAV.find(x => x.key === key);
      const on = active === key;
      return /*#__PURE__*/React.createElement("button", {
        key: key,
        onClick: () => go(key),
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: on ? "var(--amber)" : "var(--text-tertiary)",
          paddingBottom: 8
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: n.icon,
        size: 20,
        color: on ? "var(--amber)" : "var(--text-tertiary)"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          fontWeight: on ? 600 : 500,
          fontFamily: "var(--font-ui)"
        }
      }, t[key]));
    })), sheet && /*#__PURE__*/React.createElement("div", {
      onClick: () => setSheet(false),
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,.6)",
        display: "flex",
        alignItems: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        width: "100%",
        background: "var(--surface-raised)",
        borderRadius: "20px 20px 0 0",
        border: "1px solid var(--border)",
        padding: 16,
        maxHeight: "80%",
        overflowY: "auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 4,
        borderRadius: 2,
        background: "var(--surface-elevated)",
        margin: "0 auto 14px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8
      }
    }, NAV.map(n => {
      const on = active === n.key;
      return /*#__PURE__*/React.createElement("button", {
        key: n.key,
        onClick: () => {
          go(n.key);
          setSheet(false);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 12px",
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: on ? "rgba(245,166,35,.08)" : "var(--surface-overlay)",
          color: on ? "var(--amber)" : "var(--text-secondary)",
          fontSize: 13,
          fontWeight: on ? 600 : 500,
          fontFamily: "var(--font-ui)",
          cursor: "pointer",
          textAlign: "left"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: n.icon,
        size: 17,
        color: on ? "var(--amber)" : "var(--text-tertiary)"
      }), T[locale][n.key]);
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setLocale(locale === "en" ? "id" : "en");
      },
      style: {
        marginTop: 12,
        display: "flex",
        alignItems: "center",
        gap: 9,
        width: "100%",
        padding: "12px",
        borderRadius: 10,
        border: "1px solid var(--border)",
        background: "var(--surface-overlay)",
        color: "var(--text-secondary)",
        fontSize: 13,
        fontFamily: "var(--font-ui)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "globe",
      size: 16,
      color: "var(--text-secondary)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        textAlign: "left"
      }
    }, T[locale].lang), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-tertiary)"
      }
    }, locale.toUpperCase())))));
  }

  /* ---------- Root ---------- */
  function App() {
    const [locale, setLocale] = React.useState("id");
    const [mode, setMode] = React.useState("desktop");
    const [route, setRoute] = React.useState({
      page: "overview",
      id: null
    });
    const go = (page, id = null) => {
      setRoute({
        page,
        id
      });
      const m = document.querySelector(".sp-main-scroll");
      if (m) m.scrollTop = 0;
    };
    React.useEffect(() => {
      if (window.lucide) window.lucide.createIcons();
    });
    return /*#__PURE__*/React.createElement("div", null, mode === "desktop" ? /*#__PURE__*/React.createElement(DesktopApp, {
      route: route,
      go: go,
      locale: locale,
      setLocale: setLocale
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        background: "var(--surface-base)"
      }
    }, /*#__PURE__*/React.createElement(MobileApp, {
      route: route,
      go: go,
      locale: locale,
      setLocale: setLocale
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        right: 18,
        bottom: 18,
        zIndex: 200,
        display: "flex",
        gap: 3,
        padding: 4,
        background: "rgba(26,26,26,.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        boxShadow: "0 8px 24px rgba(0,0,0,.5)"
      }
    }, [["desktop", "monitor", "Desktop"], ["mobile", "smartphone", "Mobile"]].map(([m, ic, lbl]) => /*#__PURE__*/React.createElement("button", {
      key: m,
      onClick: () => setMode(m),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "7px 13px",
        borderRadius: 7,
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-ui)",
        fontSize: 13,
        fontWeight: 600,
        background: mode === m ? "var(--amber)" : "transparent",
        color: mode === m ? "#0A0A0A" : "var(--text-secondary)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 15,
      color: mode === m ? "#0A0A0A" : "var(--text-secondary)"
    }), lbl))));
  }
  window.SP_App = App;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/data.js
try { (() => {
/* SupaPark — Operator Dashboard demo data.
   Realistic Indonesian operators, facilities, cities, Rupiah amounts.
   Exposes window.SP_DATA. */

window.SP_DATA = {
  locations: ["Mall Grand Indonesia", "RS Siloam Kebon Jeruk", "Kampus BINUS Anggrek", "Ruko Galaxy Bekasi"],
  /* --- Overview --- */
  stats: {
    activeSessions: 47,
    revenueToday: 12450000,
    occupancy: 72,
    alerts: 1
  },
  // last 7 days revenue (in Rupiah)
  revenue7d: [{
    d: "Sen",
    v: 9800000
  }, {
    d: "Sel",
    v: 11200000
  }, {
    d: "Rab",
    v: 10400000
  }, {
    d: "Kam",
    v: 13100000
  }, {
    d: "Jum",
    v: 15600000
  }, {
    d: "Sab",
    v: 18200000
  }, {
    d: "Min",
    v: 12450000
  }],
  occupancyMix: {
    car: {
      cur: 187,
      cap: 250
    },
    moto: {
      cur: 312,
      cap: 500
    }
  },
  recentSessions: [{
    plate: "B 1234 KJP",
    type: "car",
    entry: "14:02",
    dur: "1h 47m",
    st: "pending"
  }, {
    plate: "D 5678 ABC",
    type: "moto",
    entry: "13:48",
    dur: "2h 01m",
    st: "paid"
  }, {
    plate: "B 9012 DEF",
    type: "car",
    entry: "14:31",
    dur: "0h 30m",
    st: "pending"
  }, {
    plate: "F 3456 GHI",
    type: "car",
    entry: "13:15",
    dur: "1h 34m",
    st: "override"
  }, {
    plate: "B 7890 JKL",
    type: "moto",
    entry: "14:46",
    dur: "0h 15m",
    st: "pending"
  }, {
    plate: "B 2345 MNO",
    type: "car",
    entry: "12:50",
    dur: "2h 11m",
    st: "paid"
  }, {
    plate: "L 6677 PQR",
    type: "moto",
    entry: "14:20",
    dur: "0h 41m",
    st: "pending"
  }, {
    plate: "B 8899 STU",
    type: "car",
    entry: "11:30",
    dur: "3h 32m",
    st: "paid"
  }],
  /* --- Leads (CRM) --- */
  leads: [{
    id: "ld_01",
    name: "Budi Santoso",
    facility: "Apartemen Taman Anggrek",
    city: "Jakarta Barat",
    status: "qualified",
    source: "Website",
    date: "2026-06-12",
    email: "budi.santoso@tamananggrek.id",
    phone: "+62 812-1100-2031",
    address: "Jl. Letjen S. Parman Kav. 21, Jakarta Barat",
    lanesIn: 3,
    lanesOut: 2,
    system: "Manual (karcis)",
    volume: 1800,
    lat: -6.178,
    lng: 106.792,
    prefDate: "2026-07-01",
    notes: "Pengelola ingin demo lapangan minggu depan. Tertarik fitur QRIS + member bulanan."
  }, {
    id: "ld_02",
    name: "Siti Nurhaliza",
    facility: "RS Permata Hijau",
    city: "Jakarta Selatan",
    status: "new",
    source: "Referral",
    date: "2026-06-14",
    email: "siti.n@rspermata.co.id",
    phone: "+62 813-5566-7788",
    address: "Jl. Permata Hijau No. 9, Jakarta Selatan",
    lanesIn: 2,
    lanesOut: 2,
    system: "Gate lama (rusak)",
    volume: 2400,
    lat: -6.224,
    lng: 106.783,
    prefDate: "2026-07-15",
    notes: ""
  }, {
    id: "ld_03",
    name: "Agus Wijaya",
    facility: "Pasar Modern BSD",
    city: "Tangerang",
    status: "contacted",
    source: "Pameran",
    date: "2026-06-10",
    email: "agus.wijaya@pasarbsd.id",
    phone: "+62 811-2233-4455",
    address: "Jl. Pahlawan Seribu, BSD City, Tangerang",
    lanesIn: 4,
    lanesOut: 3,
    system: "Tanpa sistem",
    volume: 3600,
    lat: -6.301,
    lng: 106.653,
    prefDate: "2026-08-01",
    notes: "Volume tinggi, butuh 7 lane. Sudah kirim proposal harga."
  }, {
    id: "ld_04",
    name: "Dewi Lestari",
    facility: "Kampus Universitas Trisakti",
    city: "Jakarta Barat",
    status: "converted",
    source: "Website",
    date: "2026-05-28",
    email: "dewi.l@trisakti.ac.id",
    phone: "+62 812-9988-7766",
    address: "Jl. Kyai Tapa No. 1, Grogol, Jakarta Barat",
    lanesIn: 3,
    lanesOut: 3,
    system: "Manual (karcis)",
    volume: 2900,
    lat: -6.168,
    lng: 106.788,
    prefDate: "2026-06-20",
    notes: "Sudah dikonversi ke proyek. Kontrak ditandatangani 1 Juni."
  }, {
    id: "ld_05",
    name: "Rudi Hartono",
    facility: "Ruko Pluit Village",
    city: "Jakarta Utara",
    status: "lost",
    source: "Referral",
    date: "2026-05-20",
    email: "rudi.h@pluitvillage.id",
    phone: "+62 813-1212-3434",
    address: "Jl. Pluit Indah Raya, Jakarta Utara",
    lanesIn: 1,
    lanesOut: 1,
    system: "Gate kompetitor",
    volume: 800,
    lat: -6.124,
    lng: 106.790,
    prefDate: "—",
    notes: "Memilih vendor lain karena harga. Follow-up Q4."
  }, {
    id: "ld_06",
    name: "Maya Anggraini",
    facility: "Hotel Santika Premiere",
    city: "Bandung",
    status: "qualified",
    source: "Pameran",
    date: "2026-06-08",
    email: "maya.a@santika.com",
    phone: "+62 811-7070-8080",
    address: "Jl. Sumatera No. 52, Bandung",
    lanesIn: 2,
    lanesOut: 2,
    system: "Manual (karcis)",
    volume: 1500,
    lat: -6.908,
    lng: 107.610,
    prefDate: "2026-07-25",
    notes: "Manajemen tertarik integrasi WhatsApp receipt."
  }, {
    id: "ld_07",
    name: "Hendra Gunawan",
    facility: "Mega Mall Pluit",
    city: "Jakarta Utara",
    status: "new",
    source: "Website",
    date: "2026-06-15",
    email: "hendra.g@megamall.id",
    phone: "+62 812-4545-6767",
    address: "Jl. Pluit Indah, Jakarta Utara",
    lanesIn: 6,
    lanesOut: 5,
    system: "Gate lama",
    volume: 5200,
    lat: -6.118,
    lng: 106.795,
    prefDate: "2026-09-01",
    notes: ""
  }],
  /* --- Projects --- */
  projects: [{
    id: "pj_01",
    facility: "Universitas Trisakti",
    contact: "Dewi Lestari",
    city: "Jakarta Barat",
    lanesIn: 3,
    lanesOut: 3,
    status: "installation",
    targetLive: "2026-07-10",
    startDate: "2026-06-02",
    actualLive: "—",
    email: "dewi.l@trisakti.ac.id",
    phone: "+62 812-9988-7766",
    address: "Jl. Kyai Tapa No. 1, Grogol, Jakarta Barat",
    lat: -6.168,
    lng: 106.788,
    notes: "Pemasangan kamera ANPR di 6 lane berjalan. Estimasi selesai 5 Juli."
  }, {
    id: "pj_02",
    facility: "Mall Grand Indonesia",
    contact: "Andi Pratama",
    city: "Jakarta Pusat",
    lanesIn: 4,
    lanesOut: 4,
    status: "live",
    targetLive: "2026-04-01",
    startDate: "2026-02-15",
    actualLive: "2026-03-28",
    email: "andi.p@grandindonesia.com",
    phone: "+62 811-3030-4040",
    address: "Jl. M.H. Thamrin No. 1, Jakarta Pusat",
    lat: -6.195,
    lng: 106.820,
    notes: "Live sejak Maret. Uptime 99.8%. Revenue naik 14% vs sistem lama."
  }, {
    id: "pj_03",
    facility: "RS Siloam Kebon Jeruk",
    contact: "Putri Maharani",
    city: "Jakarta Barat",
    lanesIn: 2,
    lanesOut: 2,
    status: "testing",
    targetLive: "2026-06-25",
    startDate: "2026-05-10",
    actualLive: "—",
    email: "putri.m@siloam.co.id",
    phone: "+62 813-6060-7070",
    address: "Jl. Perjuangan, Kebon Jeruk, Jakarta Barat",
    lat: -6.190,
    lng: 106.770,
    notes: "Uji coba 1 minggu. Akurasi plat 97,4%. Tuning kamera lane 2."
  }, {
    id: "pj_04",
    facility: "Kampus BINUS Anggrek",
    contact: "Fajar Nugroho",
    city: "Jakarta Barat",
    lanesIn: 3,
    lanesOut: 2,
    status: "procurement",
    targetLive: "2026-08-15",
    startDate: "2026-06-10",
    actualLive: "—",
    email: "fajar.n@binus.edu",
    phone: "+62 812-8080-9090",
    address: "Jl. Kebon Jeruk Raya No. 27, Jakarta Barat",
    lat: -6.201,
    lng: 106.782,
    notes: "PO hardware dikirim. Menunggu kedatangan barrier gate (ETA 2 minggu)."
  }, {
    id: "pj_05",
    facility: "Pasar Modern BSD",
    contact: "Agus Wijaya",
    city: "Tangerang",
    lanesIn: 4,
    lanesOut: 3,
    status: "planning",
    targetLive: "2026-09-30",
    startDate: "2026-06-14",
    actualLive: "—",
    email: "agus.wijaya@pasarbsd.id",
    phone: "+62 811-2233-4455",
    address: "Jl. Pahlawan Seribu, BSD City, Tangerang",
    lat: -6.301,
    lng: 106.653,
    notes: "Survey lokasi terjadwal 20 Juni. Finalisasi jumlah lane."
  }],
  // pipeline order
  pipeline: ["planning", "procurement", "installation", "testing", "live"]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/data.js", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/ui.jsx
try { (() => {
/* SupaPark Dashboard — shared UI primitives.
   Composes design-system components from window.SupaParkDesignSystem_80b640
   and Lucide icons. Exposes window.SPUI + window.SPIcon. */

const _DS = window.SupaParkDesignSystem_80b640;

/* ---------- Lucide icon ---------- */
function Icon({
  name,
  size = 18,
  color = "currentColor",
  strokeWidth = 1.75,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (el && window.lucide) {
      el.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      el.appendChild(i);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          stroke: color,
          "stroke-width": strokeWidth
        },
        nameAttr: "data-lucide"
      });
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      flexShrink: 0,
      ...style
    }
  });
}
window.SPIcon = Icon;

/* ---------- CRM taxonomy colors (category, not brand) ---------- */
const CAT = {
  blue: "#3B82F6",
  amber: "#F5A623",
  green: "#22C55E",
  purple: "#A855F7",
  red: "#EF4444",
  orange: "#F97316"
};
const LEAD_STATUS = {
  new: {
    c: "blue",
    en: "New",
    id: "Baru"
  },
  contacted: {
    c: "amber",
    en: "Contacted",
    id: "Dihubungi"
  },
  qualified: {
    c: "green",
    en: "Qualified",
    id: "Terkualifikasi"
  },
  converted: {
    c: "purple",
    en: "Converted",
    id: "Dikonversi"
  },
  lost: {
    c: "red",
    en: "Lost",
    id: "Hilang"
  }
};
const PROJECT_STATUS = {
  planning: {
    c: "blue",
    en: "Planning",
    id: "Perencanaan"
  },
  procurement: {
    c: "amber",
    en: "Procurement",
    id: "Pengadaan"
  },
  installation: {
    c: "orange",
    en: "Installation",
    id: "Pemasangan"
  },
  testing: {
    c: "purple",
    en: "Testing",
    id: "Pengujian"
  },
  live: {
    c: "green",
    en: "Live",
    id: "Aktif"
  }
};

/* ---------- Status pill (CRM) ---------- */
function StatusPill({
  kind,
  value,
  locale = "id",
  size = "md"
}) {
  const map = kind === "lead" ? LEAD_STATUS : PROJECT_STATUS;
  const cfg = map[value] || {
    c: "blue",
    en: value,
    id: value
  };
  const color = CAT[cfg.c];
  const pad = size === "lg" ? "5px 14px" : "2px 9px";
  const fs = size === "lg" ? 14 : 12;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: pad,
      borderRadius: 999,
      fontSize: fs,
      fontWeight: 600,
      lineHeight: 1.4,
      color,
      background: color + "1f",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size === "lg" ? 7 : 6,
      height: size === "lg" ? 7 : 6,
      borderRadius: "50%",
      background: color
    }
  }), cfg[locale] || cfg.en);
}

/* ---------- Page header ---------- */
function PageHeader({
  title,
  sub,
  actions,
  back
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      minWidth: 0
    }
  }, back && /*#__PURE__*/React.createElement("button", {
    onClick: back,
    "aria-label": "Back",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 38,
      height: 38,
      borderRadius: 8,
      border: "1px solid var(--border)",
      background: "var(--surface-raised)",
      color: "var(--text-secondary)",
      cursor: "pointer",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 18,
    color: "var(--text-secondary)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 24,
      fontWeight: 600,
      color: "var(--text-primary)",
      letterSpacing: "-0.01em",
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap"
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, sub))), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexShrink: 0
    }
  }, actions));
}

/* ---------- Stat card ---------- */
function StatCard({
  label,
  value,
  trend,
  trendDir = "muted",
  accent,
  icon
}) {
  const tc = {
    up: "var(--success)",
    down: "var(--error)",
    muted: "var(--text-tertiary)"
  }[trendDir];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-raised)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: "16px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--text-secondary)"
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 28,
      height: 28,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      background: (accent || "var(--text-tertiary)") + "1a"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 15,
    color: accent || "var(--text-tertiary)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      color: "var(--text-primary)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1.05
    }
  }, value), trend != null && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 12,
      fontWeight: 500,
      color: tc,
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, trendDir === "up" && /*#__PURE__*/React.createElement(Icon, {
    name: "trending-up",
    size: 13,
    color: tc
  }), trendDir === "down" && /*#__PURE__*/React.createElement(Icon, {
    name: "trending-down",
    size: 13,
    color: tc
  }), trend));
}

/* ---------- Filter bar ---------- */
function SearchInput({
  placeholder,
  value,
  onChange,
  width = 280
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    color: "var(--text-tertiary)"
  })), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    placeholder: placeholder,
    style: {
      width: "100%",
      height: 40,
      padding: "0 12px 0 36px",
      background: "var(--surface-raised)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      color: "var(--text-primary)",
      fontSize: 14,
      fontFamily: "var(--font-ui)",
      boxSizing: "border-box"
    }
  }));
}
function Select({
  value,
  onChange,
  options,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "inline-flex"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 11,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 15,
    color: "var(--text-tertiary)"
  })), /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      height: 40,
      padding: icon ? "0 34px 0 32px" : "0 34px 0 12px",
      background: "var(--surface-raised)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      color: "var(--text-primary)",
      fontSize: 14,
      fontFamily: "var(--font-ui)",
      cursor: "pointer",
      appearance: "none",
      WebkitAppearance: "none"
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value,
    style: {
      background: "#1A1A1A"
    }
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 11,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 15,
    color: "var(--text-tertiary)"
  })));
}
function FilterBar({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap"
    }
  }, children);
}

/* ---------- Surface card ---------- */
function Panel({
  title,
  icon,
  right,
  children,
  pad = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-raised)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      fontSize: 15,
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16,
    color: "var(--text-secondary)"
  }), title), right), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad ? 20 : 0
    }
  }, children));
}

/* ---------- Data table ---------- */
function Table({
  columns,
  children
}) {
  return /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: c.align || "left",
      padding: "11px 20px",
      fontSize: 11,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: ".06em",
      color: "var(--text-tertiary)",
      borderBottom: "1px solid var(--border)",
      whiteSpace: "nowrap"
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, children));
}
function THRow({
  onClick,
  children,
  last
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("tr", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      borderBottom: last ? "none" : "1px solid var(--border-faint)",
      cursor: onClick ? "pointer" : "default",
      background: h && onClick ? "var(--surface-overlay)" : "transparent",
      transition: "background 120ms"
    }
  }, children);
}
function TD({
  children,
  align,
  mono,
  strong,
  color
}) {
  return /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "13px 20px",
      textAlign: align || "left",
      color: color || (strong ? "var(--text-primary)" : "var(--text-secondary)"),
      fontWeight: strong ? 600 : 400,
      fontFamily: mono ? "var(--font-mono)" : "inherit",
      whiteSpace: "nowrap"
    }
  }, children);
}

/* ---------- Empty state ---------- */
function EmptyState({
  icon = "inbox",
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "64px 20px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      margin: "0 auto 18px",
      borderRadius: 16,
      background: "var(--surface-overlay)",
      border: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 28,
    color: "var(--text-tertiary)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, sub));
}

/* ---------- Stylized dark map (on-brand, no light OSM tiles) ---------- */
function MapPanel({
  lat,
  lng,
  label,
  height = 280
}) {
  // deterministic street layout seeded by coords
  const seed = Math.abs(Math.round(lat * 1000 + lng * 1000));
  const rnd = n => {
    let s = seed + n * 97;
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const vlines = [14, 30, 47, 63, 80].map((x, i) => x + (rnd(i) - 0.5) * 6);
  const hlines = [18, 38, 58, 78].map((y, i) => y + (rnd(i + 9) - 0.5) * 6);
  const blocks = [];
  for (let i = 0; i < 7; i++) {
    blocks.push({
      x: rnd(i * 2) * 78 + 4,
      y: rnd(i * 2 + 1) * 70 + 6,
      w: 7 + rnd(i + 3) * 12,
      h: 6 + rnd(i + 5) * 10
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid var(--border)",
      height,
      background: "#0c0d0e"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 100 100",
    preserveAspectRatio: "xMidYMid slice",
    style: {
      position: "absolute",
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    fill: "#0c0d0e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "62",
    y: "8",
    width: "30",
    height: "22",
    rx: "3",
    fill: "#10211a"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 86 Q 20 78 40 86 T 80 86 L 100 82 L 100 100 L 0 100 Z",
    fill: "#0a1620"
  }), blocks.map((b, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: b.x,
    y: b.y,
    width: b.w,
    height: b.h,
    rx: "1.4",
    fill: "#15171a",
    stroke: "#1d2024",
    strokeWidth: "0.4"
  })), vlines.map((x, i) => /*#__PURE__*/React.createElement("line", {
    key: "v" + i,
    x1: x,
    y1: "0",
    x2: x,
    y2: "100",
    stroke: "#1f2226",
    strokeWidth: i === 2 ? 2.2 : 1.1
  })), hlines.map((y, i) => /*#__PURE__*/React.createElement("line", {
    key: "h" + i,
    x1: "0",
    y1: y,
    x2: "100",
    y2: y,
    stroke: "#1f2226",
    strokeWidth: i === 1 ? 2.2 : 1.1
  })), /*#__PURE__*/React.createElement("line", {
    x1: vlines[2],
    y1: "0",
    x2: vlines[2],
    y2: "100",
    stroke: "#26292e",
    strokeWidth: "2.6"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "48%",
      transform: "translate(-50%,-100%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "100%",
      marginLeft: -13,
      marginTop: -13,
      width: 26,
      height: 26,
      borderRadius: "50%",
      background: "rgba(245,166,35,.28)",
      animation: "spPing 2.2s ease-out infinite"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: "30",
    height: "40",
    viewBox: "0 0 24 32",
    fill: "none",
    style: {
      position: "relative",
      filter: "drop-shadow(0 4px 8px rgba(0,0,0,.5))"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 0C5.4 0 0 5.4 0 12c0 8.5 12 20 12 20s12-11.5 12-20C24 5.4 18.6 0 12 0z",
    fill: "#F5A623"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4.5",
    fill: "#0A0A0A"
  })))), label && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 12,
      bottom: 12,
      background: "rgba(10,10,10,.85)",
      backdropFilter: "blur(8px)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: "7px 12px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      maxWidth: "85%"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14,
    color: "var(--amber)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-primary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 12,
      top: 12,
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "var(--text-tertiary)",
      background: "rgba(10,10,10,.7)",
      borderRadius: 6,
      padding: "3px 7px"
    }
  }, lat.toFixed(3), ", ", lng.toFixed(3)));
}

/* ---------- Project pipeline bar ---------- */
function Pipeline({
  status,
  locale = "id"
}) {
  const order = window.SP_DATA.pipeline;
  const cur = order.indexOf(status);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, order.map((step, i) => {
    const done = i < cur,
      active = i === cur;
    const cfg = PROJECT_STATUS[step];
    const barColor = done ? "var(--success)" : active ? "var(--amber)" : "var(--surface-elevated)";
    const txtColor = active ? "var(--amber)" : done ? "var(--text-secondary)" : "var(--text-tertiary)";
    return /*#__PURE__*/React.createElement("div", {
      key: step,
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 999,
        background: barColor,
        boxShadow: active ? "0 0 12px rgba(245,166,35,.4)" : "none"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, done && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13,
      color: "var(--success)"
    }), active && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "var(--amber)",
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: active ? 600 : 500,
        color: txtColor,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, cfg[locale])));
  }));
}

/* ---------- Revenue area chart (SVG) ---------- */
function RevenueChart({
  data,
  height = 180
}) {
  const W = 600,
    H = height,
    pl = 8,
    pr = 8,
    pt = 14,
    pb = 26;
  const vals = data.map(d => d.v);
  const max = Math.max(...vals) * 1.12,
    min = 0;
  const ix = i => pl + i * (W - pl - pr) / (data.length - 1);
  const iy = v => pt + (1 - (v - min) / (max - min)) * (H - pt - pb);
  const pts = data.map((d, i) => [ix(i), iy(d.v)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L ${ix(data.length - 1)} ${H - pb} L ${ix(0)} ${H - pb} Z`;
  const [hover, setHover] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: "100%",
    height: H,
    preserveAspectRatio: "none",
    onMouseLeave: () => setHover(null),
    onMouseMove: e => {
      const r = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * W;
      let best = 0,
        bd = 1e9;
      pts.forEach((p, i) => {
        const d = Math.abs(p[0] - x);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      setHover(best);
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "revfill",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#F5A623",
    stopOpacity: "0.28"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#F5A623",
    stopOpacity: "0.02"
  }))), [0.25, 0.5, 0.75].map(g => /*#__PURE__*/React.createElement("line", {
    key: g,
    x1: pl,
    x2: W - pr,
    y1: pt + g * (H - pt - pb),
    y2: pt + g * (H - pt - pb),
    stroke: "#1c1c1c",
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#revfill)"
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: "#F5A623",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), pts.map((p, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: p[0],
    cy: p[1],
    r: hover === i ? 5 : 3,
    fill: hover === i ? "#FFB830" : "#F5A623",
    stroke: "#0A0A0A",
    strokeWidth: "2"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0 6px",
      marginTop: 2
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontSize: 11,
      color: hover === i ? "var(--text-primary)" : "var(--text-tertiary)",
      fontWeight: hover === i ? 600 : 400
    }
  }, d.d))), hover != null && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: `${pts[hover][0] / W * 100}%`,
      top: 0,
      transform: "translateX(-50%)",
      background: "var(--surface-overlay)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: "6px 10px",
      pointerEvents: "none",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "var(--text-tertiary)"
    }
  }, data[hover].d), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text-primary)",
      fontVariantNumeric: "tabular-nums"
    }
  }, window.SPUI.rupiah(data[hover].v))));
}

/* ---------- Occupancy donut gauge ---------- */
function OccupancyGauge({
  mix
}) {
  const car = mix.car,
    moto = mix.moto;
  const total = car.cur + moto.cur,
    totalCap = car.cap + moto.cap;
  const pct = Math.round(total / totalCap * 100);
  const R = 52,
    C = 2 * Math.PI * R;
  const carFrac = car.cur / totalCap,
    motoFrac = moto.cur / totalCap;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 132,
      height: 132,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "132",
    height: "132",
    viewBox: "0 0 132 132",
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "66",
    cy: "66",
    r: R,
    fill: "none",
    stroke: "var(--surface-overlay)",
    strokeWidth: "13"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "66",
    cy: "66",
    r: R,
    fill: "none",
    stroke: "#F5A623",
    strokeWidth: "13",
    strokeLinecap: "round",
    strokeDasharray: `${carFrac * C} ${C}`
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "66",
    cy: "66",
    r: R,
    fill: "none",
    stroke: "#3B82F6",
    strokeWidth: "13",
    strokeLinecap: "round",
    strokeDasharray: `${motoFrac * C} ${C}`,
    strokeDashoffset: `${-carFrac * C}`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 700,
      color: "var(--text-primary)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1
    }
  }, pct, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text-tertiary)"
    }
  }, total, "/", totalCap))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      flex: 1
    }
  }, [{
    k: "car",
    lbl: "Mobil",
    lblEn: "Cars",
    c: "#F5A623",
    o: car
  }, {
    k: "moto",
    lbl: "Motor",
    lblEn: "Motorcycles",
    c: "#3B82F6",
    o: moto
  }].map(row => /*#__PURE__*/React.createElement("div", {
    key: row.k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 3,
      background: row.c
    }
  }), row.lbl), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-primary)",
      fontVariantNumeric: "tabular-nums"
    }
  }, row.o.cur, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      fontWeight: 400
    }
  }, " / ", row.o.cap))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: "var(--surface-overlay)",
      borderRadius: 999,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${row.o.cur / row.o.cap * 100}%`,
      background: row.c,
      borderRadius: 999
    }
  }))))));
}

/* ---------- helpers ---------- */
function rupiah(n) {
  if (n >= 1e9) return "Rp " + (n / 1e9).toFixed(1).replace(".", ",") + "M";
  if (n >= 1e6) return "Rp " + (n / 1e6).toFixed(1).replace(".", ",") + "jt";
  return "Rp " + n.toLocaleString("id-ID");
}
function rupiahFull(n) {
  return "Rp " + n.toLocaleString("id-ID");
}
window.SPUI = {
  Icon,
  StatusPill,
  PageHeader,
  StatCard,
  SearchInput,
  Select,
  FilterBar,
  Panel,
  Table,
  THRow,
  TD,
  EmptyState,
  MapPanel,
  Pipeline,
  RevenueChart,
  OccupancyGauge,
  CAT,
  LEAD_STATUS,
  PROJECT_STATUS,
  rupiah,
  rupiahFull
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/onboarding/app.jsx
try { (() => {
/* SupaPark Onboarding — two-step public registration funnel + success.
   Dark Leaflet map (CartoDB dark) with existing-location markers, a draggable
   amber pin, and reverse-geocode autofill. Mobile-first, 375 / 1024 toggle.
   window.OB_App */
(function () {
  const {
    Icon,
    Field,
    TextInput,
    NumberInput,
    SelectInput,
    DateInput,
    TextArea,
    PrimaryButton,
    OutlineButton,
    Progress,
    BrandHeader,
    SuccessCheck
  } = window.OB;

  /* Existing SupaPark locations (blue markers) */
  const EXISTING = [{
    name: "Mall Grand Indonesia",
    lat: -6.195,
    lng: 106.820
  }, {
    name: "RS Siloam Kebon Jeruk",
    lat: -6.190,
    lng: 106.770
  }, {
    name: "Kampus BINUS Anggrek",
    lat: -6.201,
    lng: 106.782
  }, {
    name: "Universitas Trisakti",
    lat: -6.168,
    lng: 106.788
  }, {
    name: "Ruko Pluit Village",
    lat: -6.124,
    lng: 106.790
  }];

  /* Offline reverse-geocoder — nearest Jakarta district + synthesized street */
  const AREAS = [{
    name: "Menteng",
    city: "Jakarta Pusat",
    lat: -6.196,
    lng: 106.832,
    streets: ["Jl. HOS Cokroaminoto", "Jl. Sutan Syahrir", "Jl. Teuku Umar"]
  }, {
    name: "Tanah Abang",
    city: "Jakarta Pusat",
    lat: -6.186,
    lng: 106.812,
    streets: ["Jl. K.H. Mas Mansyur", "Jl. Kebon Kacang", "Jl. Jati Baru"]
  }, {
    name: "Kebayoran Baru",
    city: "Jakarta Selatan",
    lat: -6.244,
    lng: 106.800,
    streets: ["Jl. Senopati", "Jl. Wijaya", "Jl. Suryo"]
  }, {
    name: "Kebon Jeruk",
    city: "Jakarta Barat",
    lat: -6.190,
    lng: 106.772,
    streets: ["Jl. Perjuangan", "Jl. Panjang", "Jl. Arjuna Utara"]
  }, {
    name: "Grogol",
    city: "Jakarta Barat",
    lat: -6.166,
    lng: 106.789,
    streets: ["Jl. Kyai Tapa", "Jl. Daan Mogot", "Jl. S. Parman"]
  }, {
    name: "Pluit",
    city: "Jakarta Utara",
    lat: -6.124,
    lng: 106.790,
    streets: ["Jl. Pluit Indah Raya", "Jl. Pluit Selatan", "Jl. Pluit Permai"]
  }, {
    name: "Kelapa Gading",
    city: "Jakarta Utara",
    lat: -6.158,
    lng: 106.906,
    streets: ["Jl. Boulevard Raya", "Jl. Kelapa Nias", "Jl. Boulevard Barat"]
  }, {
    name: "Cawang",
    city: "Jakarta Timur",
    lat: -6.242,
    lng: 106.866,
    streets: ["Jl. Mayjen Sutoyo", "Jl. D.I. Panjaitan", "Jl. Otista Raya"]
  }];
  function reverseGeocode(lat, lng) {
    let best = AREAS[0],
      bd = Infinity;
    AREAS.forEach(a => {
      const d = (a.lat - lat) ** 2 + (a.lng - lng) ** 2;
      if (d < bd) {
        bd = d;
        best = a;
      }
    });
    const h = Math.abs(Math.round(lat * 1000 + lng * 1000));
    const street = best.streets[h % best.streets.length];
    const no = h % 90 + 1;
    return {
      city: best.city,
      address: `${street} No. ${no}, ${best.name}, ${best.city}`
    };
  }
  const amberPinSVG = `<svg width="32" height="42" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 4px 6px rgba(0,0,0,.55))"><path d="M12 0C5.4 0 0 5.4 0 12c0 8.5 12 20 12 20s12-11.5 12-20C24 5.4 18.6 0 12 0z" fill="#F5A623"/><circle cx="12" cy="12" r="4.5" fill="#0A0A0A"/></svg>`;

  /* ---------- Map field ---------- */
  function MapField({
    hasPin,
    onPlace,
    mode
  }) {
    const elRef = React.useRef(null);
    const mapRef = React.useRef(null);
    const markerRef = React.useRef(null);
    React.useEffect(() => {
      if (!window.L || !elRef.current || mapRef.current) return;
      const map = window.L.map(elRef.current, {
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: false
      }).setView([-6.2088, 106.8200], 12);
      window.L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        subdomains: "abcd"
      }).addTo(map);
      EXISTING.forEach(loc => {
        window.L.circleMarker([loc.lat, loc.lng], {
          radius: 6,
          color: "#0A0A0A",
          weight: 2,
          fillColor: "#3B82F6",
          fillOpacity: 1
        }).addTo(map).bindTooltip(loc.name, {
          direction: "top",
          offset: [0, -4]
        });
      });
      const icon = window.L.divIcon({
        className: "ob-pin",
        html: amberPinSVG,
        iconSize: [32, 42],
        iconAnchor: [16, 42]
      });
      const place = latlng => {
        if (!markerRef.current) {
          markerRef.current = window.L.marker(latlng, {
            icon,
            draggable: true
          }).addTo(map);
          markerRef.current.on("dragend", () => {
            const p = markerRef.current.getLatLng();
            onPlace(p.lat, p.lng);
          });
        } else markerRef.current.setLatLng(latlng);
        onPlace(latlng.lat, latlng.lng);
      };
      map.on("click", e => place(e.latlng));
      mapRef.current = map;
      setTimeout(() => map.invalidateSize(), 120);
      setTimeout(() => map.invalidateSize(), 420);
      return () => {
        map.remove();
        mapRef.current = null;
        markerRef.current = null;
      };
    }, []);
    React.useEffect(() => {
      if (mapRef.current) setTimeout(() => mapRef.current.invalidateSize(), 120);
    }, [mode]);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      ref: elRef,
      style: {
        height: 300,
        width: "100%",
        background: "#0c0d0e"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 12,
        left: 12,
        right: 12,
        zIndex: 500,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: hasPin ? 0 : 1,
        transition: "opacity 200ms"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(10,10,10,.86)",
        backdropFilter: "blur(8px)",
        border: "1px solid var(--border)",
        borderRadius: 999,
        padding: "8px 14px",
        maxWidth: "100%"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "hand-pointer",
      size: 15,
      color: "#F5A623"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: "var(--text-primary)",
        lineHeight: 1.3
      }
    }, "Ketuk peta untuk menandai lokasi fasilitas Anda"))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        bottom: 12,
        left: 12,
        zIndex: 500,
        display: "flex",
        gap: 12,
        background: "rgba(10,10,10,.82)",
        backdropFilter: "blur(8px)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: "7px 11px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        color: "var(--text-secondary)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: "#3B82F6"
      }
    }), "Lokasi SupaPark"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        color: "var(--text-secondary)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: "#F5A623"
      }
    }), "Fasilitas Anda")));
  }

  /* ---------- Card shell ---------- */
  function Card({
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-raised)",
        border: "1px solid var(--border)",
        borderRadius: 18,
        padding: 24,
        ...style
      }
    }, children);
  }

  /* ====================== SCREENS ====================== */
  function Step1({
    form,
    errors,
    set,
    next,
    mode
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 24,
        animation: "obUp 360ms ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(BrandHeader, {
      size: mode === "desktop" ? "lg" : "md"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontSize: mode === "desktop" ? 34 : 26,
        fontWeight: 700,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em"
      }
    }, "Mulai dengan SupaPark"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "8px 0 0",
        fontSize: 15,
        color: "var(--text-secondary)"
      }
    }, "Isi form singkat untuk memulai"))), /*#__PURE__*/React.createElement(Progress, {
      step: 1
    }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Nama Lengkap",
      error: errors.nama
    }, /*#__PURE__*/React.createElement(TextInput, {
      value: form.nama,
      onChange: v => set("nama", v),
      placeholder: "Mis. Budi Santoso",
      icon: "user",
      error: !!errors.nama
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Email",
      error: errors.email
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "email",
      inputMode: "email",
      value: form.email,
      onChange: v => set("email", v),
      placeholder: "nama@email.com",
      icon: "mail",
      error: !!errors.email
    })), /*#__PURE__*/React.createElement(Field, {
      label: "No. Handphone",
      error: errors.phone
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "tel",
      inputMode: "tel",
      value: form.phone,
      onChange: v => set("phone", v),
      placeholder: "08xxxxxxxxxx",
      icon: "phone",
      error: !!errors.phone
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Nama Fasilitas",
      error: errors.facility
    }, /*#__PURE__*/React.createElement(TextInput, {
      value: form.facility,
      onChange: v => set("facility", v),
      placeholder: "Mall / Gedung / Apartemen",
      icon: "building-2",
      error: !!errors.facility
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(PrimaryButton, {
      onClick: next
    }, "Lanjutkan", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18,
      color: "#0A0A0A"
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        fontSize: 14,
        color: "var(--text-secondary)"
      }
    }, "Sudah terdaftar? ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => e.preventDefault(),
      style: {
        color: "#F5A623",
        fontWeight: 600,
        textDecoration: "none"
      }
    }, "Hubungi kami")));
  }
  function Step2({
    form,
    errors,
    set,
    hasPin,
    onPlace,
    back,
    submit,
    mode
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 22,
        animation: "obUp 360ms ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement(BrandHeader, {
      size: "md"
    })), /*#__PURE__*/React.createElement(Progress, {
      step: 2
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(245,166,35,.06)",
        border: "1px solid rgba(245,166,35,.25)",
        borderRadius: 12,
        padding: "12px 16px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 38,
        height: 38,
        flexShrink: 0,
        borderRadius: 10,
        background: "rgba(245,166,35,.14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "building-2",
      size: 19,
      color: "#F5A623"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-tertiary)",
        textTransform: "uppercase",
        letterSpacing: ".06em"
      }
    }, "Fasilitas"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: "var(--text-primary)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, form.facility || "Fasilitas Anda")), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 12,
        color: "#22C55E",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14,
      color: "#22C55E"
    }), "Langkah 1")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Kota",
      error: errors.kota
    }, /*#__PURE__*/React.createElement(TextInput, {
      value: form.kota,
      onChange: v => set("kota", v),
      placeholder: "Mis. Jakarta Selatan",
      icon: "map-pin",
      error: !!errors.kota
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Lokasi Fasilitas",
      hint: "Ketuk peta untuk menandai \u2014 alamat terisi otomatis"
    }, /*#__PURE__*/React.createElement(MapField, {
      hasPin: hasPin,
      onPlace: onPlace,
      mode: mode
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Alamat",
      error: errors.alamat,
      hint: !form.alamat ? "Terisi otomatis dari titik peta" : null
    }, /*#__PURE__*/React.createElement(TextInput, {
      value: form.alamat,
      onChange: v => set("alamat", v),
      placeholder: "Alamat lengkap fasilitas",
      icon: "navigation",
      error: !!errors.alamat
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Jalur Masuk",
      error: errors.lanesIn
    }, /*#__PURE__*/React.createElement(NumberInput, {
      value: form.lanesIn,
      onChange: v => set("lanesIn", v),
      placeholder: "0",
      error: !!errors.lanesIn
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Jalur Keluar",
      error: errors.lanesOut
    }, /*#__PURE__*/React.createElement(NumberInput, {
      value: form.lanesOut,
      onChange: v => set("lanesOut", v),
      placeholder: "0",
      error: !!errors.lanesOut
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Sistem Saat Ini",
      error: errors.system
    }, /*#__PURE__*/React.createElement(SelectInput, {
      value: form.system,
      onChange: v => set("system", v),
      placeholder: "Pilih sistem parkir saat ini",
      error: !!errors.system,
      options: ["Manual", "Boom Gate", "Tiket", "RFID", "Lainnya"]
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Volume Harian",
      error: errors.volume
    }, /*#__PURE__*/React.createElement(NumberInput, {
      value: form.volume,
      onChange: v => set("volume", v),
      placeholder: "Estimasi kendaraan/hari",
      error: !!errors.volume
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Tanggal Demo Diinginkan",
      error: errors.demoDate
    }, /*#__PURE__*/React.createElement(DateInput, {
      value: form.demoDate,
      onChange: v => set("demoDate", v),
      error: !!errors.demoDate
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Catatan Tambahan",
      optional: true
    }, /*#__PURE__*/React.createElement(TextArea, {
      value: form.notes,
      onChange: v => set("notes", v),
      placeholder: "Kebutuhan khusus, jam operasional, dll."
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 96,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(OutlineButton, {
      onClick: back
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 18,
      color: "var(--text-primary)"
    }))), /*#__PURE__*/React.createElement(PrimaryButton, {
      onClick: submit
    }, "Kirim Pendaftaran", /*#__PURE__*/React.createElement(Icon, {
      name: "send",
      size: 17,
      color: "#0A0A0A"
    }))))));
  }
  function Success({
    form,
    reset,
    mode
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        textAlign: "center",
        animation: "obUp 360ms ease",
        paddingTop: mode === "desktop" ? 20 : 8
      }
    }, /*#__PURE__*/React.createElement(BrandHeader, {
      size: "md"
    }), /*#__PURE__*/React.createElement(SuccessCheck, {
      size: mode === "desktop" ? 128 : 112
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontSize: mode === "desktop" ? 32 : 26,
        fontWeight: 700,
        color: "var(--text-primary)"
      }
    }, "Pendaftaran Berhasil!"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "10px auto 0",
        fontSize: 15,
        color: "var(--text-secondary)",
        maxWidth: 340,
        lineHeight: 1.6
      }
    }, "Tim kami akan menghubungi Anda dalam 1\xD724 jam untuk menjadwalkan demo.")), /*#__PURE__*/React.createElement(Card, {
      style: {
        width: "100%",
        textAlign: "left",
        padding: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: ".08em",
        color: "var(--text-tertiary)",
        marginBottom: 14
      }
    }, "Ringkasan Pendaftaran"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 0
      }
    }, [{
      ic: "user",
      k: "Nama",
      v: form.nama
    }, {
      ic: "building-2",
      k: "Fasilitas",
      v: form.facility
    }, {
      ic: "map-pin",
      k: "Kota",
      v: form.kota
    }].map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 0",
        borderBottom: i < 2 ? "1px solid var(--border-faint)" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        flexShrink: 0,
        borderRadius: 8,
        background: "var(--surface-overlay)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: r.ic,
      size: 15,
      color: "var(--text-tertiary)"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--text-tertiary)",
        width: 72
      }
    }, r.k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--text-primary)",
        flex: 1
      }
    }, r.v))))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(OutlineButton, {
      onClick: reset
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "home",
      size: 18,
      color: "var(--text-primary)"
    }), "Kembali ke Beranda")));
  }

  /* ====================== ROOT ====================== */
  const BLANK = {
    nama: "",
    email: "",
    phone: "",
    facility: "",
    kota: "",
    alamat: "",
    lanesIn: "",
    lanesOut: "",
    system: "",
    volume: "",
    demoDate: "",
    notes: ""
  };
  function validate1(f) {
    const e = {};
    if (!f.nama.trim()) e.nama = "Nama lengkap wajib diisi";
    if (!f.email.trim()) e.email = "Email wajib diisi";else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = "Format email tidak valid";
    if (!f.phone.trim()) e.phone = "No. handphone wajib diisi";else if (!/^08[0-9]{8,12}$/.test(f.phone)) e.phone = "Gunakan format 08xxxxxxxxxx";
    if (!f.facility.trim()) e.facility = "Nama fasilitas wajib diisi";
    return e;
  }
  function validate2(f) {
    const e = {};
    if (!f.kota.trim()) e.kota = "Kota wajib diisi";
    if (!f.alamat.trim()) e.alamat = "Tandai lokasi pada peta atau isi alamat";
    if (!f.lanesIn || +f.lanesIn < 1) e.lanesIn = "Min. 1 jalur";
    if (!f.lanesOut || +f.lanesOut < 1) e.lanesOut = "Min. 1 jalur";
    if (!f.system) e.system = "Pilih sistem saat ini";
    if (!f.volume || +f.volume < 1) e.volume = "Estimasi volume wajib diisi";
    if (!f.demoDate) e.demoDate = "Pilih tanggal demo";
    return e;
  }
  function App() {
    const [mode, setMode] = React.useState("mobile");
    const [step, setStep] = React.useState(1);
    const [form, setForm] = React.useState(BLANK);
    const [errors, setErrors] = React.useState({});
    const [hasPin, setHasPin] = React.useState(false);
    const set = (k, v) => {
      setForm(f => ({
        ...f,
        [k]: v
      }));
      setErrors(e => e[k] ? {
        ...e,
        [k]: undefined
      } : e);
    };
    const onPlace = React.useCallback((lat, lng) => {
      const g = reverseGeocode(lat, lng);
      setHasPin(true);
      setForm(f => ({
        ...f,
        kota: g.city,
        alamat: g.address
      }));
      setErrors(e => ({
        ...e,
        kota: undefined,
        alamat: undefined
      }));
    }, []);
    const next = () => {
      const e = validate1(form);
      setErrors(e);
      if (Object.keys(e).length === 0) {
        setStep(2);
        scrollTop();
      }
    };
    const submit = () => {
      const e = validate2(form);
      setErrors(e);
      if (Object.keys(e).length === 0) {
        setStep(3);
        scrollTop();
      }
    };
    const back = () => {
      setStep(1);
      setErrors({});
      scrollTop();
    };
    const reset = () => {
      setForm(BLANK);
      setErrors({});
      setHasPin(false);
      setStep(1);
      scrollTop();
    };
    const scrollTop = () => {
      const s = document.querySelector(".ob-scroll");
      if (s) s.scrollTop = 0;
    };
    React.useEffect(() => {
      if (window.lucide) window.lucide.createIcons();
    });
    const contentMax = mode === "desktop" ? step === 2 ? 760 : 560 : 380;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh",
        background: "var(--surface-base)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ob-scroll",
      style: {
        minHeight: "100vh",
        maxHeight: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: mode === "desktop" ? "40px 24px 80px" : "20px 16px 64px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 22,
        padding: "7px 14px",
        background: "var(--surface-raised)",
        border: "1px solid var(--border)",
        borderRadius: 999,
        fontSize: 12.5,
        color: "var(--text-tertiary)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 12,
      color: "var(--text-tertiary)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)"
      }
    }, "supapark.id/onboarding")), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        maxWidth: contentMax,
        transition: "max-width 200ms"
      }
    }, step === 1 && /*#__PURE__*/React.createElement(Step1, {
      form: form,
      errors: errors,
      set: set,
      next: next,
      mode: mode
    }), step === 2 && /*#__PURE__*/React.createElement(Step2, {
      form: form,
      errors: errors,
      set: set,
      hasPin: hasPin,
      onPlace: onPlace,
      back: back,
      submit: submit,
      mode: mode
    }), step === 3 && /*#__PURE__*/React.createElement(Success, {
      form: form,
      reset: reset,
      mode: mode
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        right: 18,
        bottom: 18,
        zIndex: 2000,
        display: "flex",
        gap: 3,
        padding: 4,
        background: "rgba(26,26,26,.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        boxShadow: "0 8px 24px rgba(0,0,0,.5)"
      }
    }, [["mobile", "smartphone", "375"], ["desktop", "monitor", "1024"]].map(([m, ic, lbl]) => /*#__PURE__*/React.createElement("button", {
      key: m,
      onClick: () => setMode(m),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "7px 13px",
        borderRadius: 7,
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-ui)",
        fontSize: 13,
        fontWeight: 600,
        background: mode === m ? "#F5A623" : "transparent",
        color: mode === m ? "#0A0A0A" : "var(--text-secondary)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 15,
      color: mode === m ? "#0A0A0A" : "var(--text-secondary)"
    }), lbl))));
  }
  window.OB_App = App;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/onboarding/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/onboarding/fields.jsx
try { (() => {
/* SupaPark Onboarding — form field components with full states:
   empty · focused (amber border) · filled · error (red border + message).
   Exposes window.OB. */
(function () {
  function Icon({
    name,
    size = 18,
    color = "currentColor",
    strokeWidth = 1.75,
    style
  }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const el = ref.current;
      if (el && window.lucide) {
        el.innerHTML = "";
        const i = document.createElement("i");
        i.setAttribute("data-lucide", name);
        el.appendChild(i);
        window.lucide.createIcons({
          attrs: {
            width: size,
            height: size,
            stroke: color,
            "stroke-width": strokeWidth
          },
          nameAttr: "data-lucide"
        });
      }
    });
    return /*#__PURE__*/React.createElement("span", {
      ref: ref,
      style: {
        display: "inline-flex",
        width: size,
        height: size,
        flexShrink: 0,
        ...style
      }
    });
  }
  const FONT = "var(--font-ui)";
  function borderFor(error, focused) {
    return error ? "#EF4444" : focused ? "#F5A623" : "#2A2A2A";
  }
  function ringFor(error, focused) {
    return error ? "rgba(239,68,68,.16)" : focused ? "rgba(245,166,35,.18)" : "transparent";
  }
  const baseInput = (error, focused) => ({
    width: "100%",
    height: 48,
    padding: "0 14px",
    boxSizing: "border-box",
    background: "var(--surface-base)",
    color: "var(--text-primary)",
    border: `1px solid ${borderFor(error, focused)}`,
    borderRadius: 10,
    fontSize: 15,
    fontFamily: FONT,
    lineHeight: 1.4,
    boxShadow: `0 0 0 3px ${ringFor(error, focused)}`,
    transition: "border-color 140ms, box-shadow 140ms",
    outline: "none"
  });

  /* ---------- Field wrapper ---------- */
  function Field({
    label,
    optional,
    error,
    children,
    hint
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 7
      }
    }, label && /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "var(--text-primary)",
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, label, optional && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 400,
        color: "var(--text-tertiary)"
      }
    }, "(opsional)")), children, hint && !error && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-tertiary)"
      }
    }, hint), error && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12.5,
        color: "#EF4444"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "alert-circle",
      size: 14,
      color: "#EF4444"
    }), error));
  }

  /* ---------- Text input (with optional leading icon) ---------- */
  function TextInput({
    value,
    onChange,
    onCommit,
    type = "text",
    placeholder,
    error,
    icon,
    inputMode,
    autoComplete
  }) {
    const [f, setF] = React.useState(false);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, icon && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 14,
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 17,
      color: f ? "#F5A623" : "var(--text-tertiary)"
    })), /*#__PURE__*/React.createElement("input", {
      type: type,
      value: value,
      placeholder: placeholder,
      inputMode: inputMode,
      autoComplete: autoComplete,
      onChange: e => onChange(e.target.value),
      onFocus: () => setF(true),
      onBlur: () => {
        setF(false);
        onCommit && onCommit();
      },
      style: {
        ...baseInput(error, f),
        paddingLeft: icon ? 42 : 14
      }
    }));
  }

  /* ---------- Number input with steppers ---------- */
  function NumberInput({
    value,
    onChange,
    placeholder,
    error,
    min = 0
  }) {
    const [f, setF] = React.useState(false);
    const num = parseInt(value, 10);
    const set = n => onChange(String(Math.max(min, n)));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      inputMode: "numeric",
      value: value,
      placeholder: placeholder,
      onChange: e => onChange(e.target.value.replace(/[^0-9]/g, "")),
      onFocus: () => setF(true),
      onBlur: () => setF(false),
      style: {
        ...baseInput(error, f),
        paddingRight: 44
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        right: 6,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, [["chevron-up", 1], ["chevron-down", -1]].map(([ic, d]) => /*#__PURE__*/React.createElement("button", {
      key: ic,
      type: "button",
      tabIndex: -1,
      onClick: () => set((isNaN(num) ? 0 : num) + d),
      style: {
        width: 28,
        height: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        background: "var(--surface-overlay)",
        borderRadius: 5,
        cursor: "pointer",
        color: "var(--text-secondary)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 13,
      color: "var(--text-secondary)"
    })))));
  }

  /* ---------- Select ---------- */
  function SelectInput({
    value,
    onChange,
    options,
    placeholder,
    error
  }) {
    const [f, setF] = React.useState(false);
    const empty = !value;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("select", {
      value: value,
      onChange: e => onChange(e.target.value),
      onFocus: () => setF(true),
      onBlur: () => setF(false),
      style: {
        ...baseInput(error, f),
        appearance: "none",
        WebkitAppearance: "none",
        color: empty ? "var(--text-tertiary)" : "var(--text-primary)",
        paddingRight: 42,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: "",
      disabled: true,
      style: {
        background: "#1A1A1A"
      }
    }, placeholder), options.map(o => /*#__PURE__*/React.createElement("option", {
      key: o,
      value: o,
      style: {
        background: "#1A1A1A",
        color: "#F5F5F0"
      }
    }, o))), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        right: 14,
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down",
      size: 17,
      color: "var(--text-tertiary)"
    })));
  }

  /* ---------- Date ---------- */
  function DateInput({
    value,
    onChange,
    error
  }) {
    const [f, setF] = React.useState(false);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 14,
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 17,
      color: f ? "#F5A623" : "var(--text-tertiary)"
    })), /*#__PURE__*/React.createElement("input", {
      type: "date",
      value: value,
      onChange: e => onChange(e.target.value),
      onFocus: () => setF(true),
      onBlur: () => setF(false),
      style: {
        ...baseInput(error, f),
        paddingLeft: 42,
        color: value ? "var(--text-primary)" : "var(--text-tertiary)",
        colorScheme: "dark"
      }
    }));
  }

  /* ---------- Textarea ---------- */
  function TextArea({
    value,
    onChange,
    placeholder,
    error
  }) {
    const [f, setF] = React.useState(false);
    return /*#__PURE__*/React.createElement("textarea", {
      value: value,
      placeholder: placeholder,
      onChange: e => onChange(e.target.value),
      onFocus: () => setF(true),
      onBlur: () => setF(false),
      style: {
        ...baseInput(error, f),
        height: "auto",
        minHeight: 90,
        padding: 14,
        resize: "vertical",
        lineHeight: 1.6
      }
    });
  }

  /* ---------- Primary / outline buttons ---------- */
  function PrimaryButton({
    children,
    onClick,
    disabled,
    type = "button"
  }) {
    const [h, setH] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      type: type,
      onClick: onClick,
      disabled: disabled,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        width: "100%",
        height: 52,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        background: disabled ? "#3a2e12" : h ? "#FFB830" : "#F5A623",
        color: disabled ? "#7a6a44" : "#0A0A0A",
        border: "none",
        borderRadius: 12,
        fontSize: 16,
        fontWeight: 700,
        fontFamily: FONT,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 140ms"
      }
    }, children);
  }
  function OutlineButton({
    children,
    onClick
  }) {
    const [h, setH] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onClick,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        width: "100%",
        height: 52,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        background: h ? "var(--surface-elevated)" : "transparent",
        color: "var(--text-primary)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        fontSize: 16,
        fontWeight: 600,
        fontFamily: FONT,
        cursor: "pointer",
        transition: "background 140ms"
      }
    }, children);
  }

  /* ---------- Progress (Step n of 2) ---------- */
  function Progress({
    step
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: ".06em",
        textTransform: "uppercase",
        color: "#F5A623"
      }
    }, "Langkah ", step, " dari 2"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-tertiary)"
      }
    }, step === 1 ? "Data singkat" : "Detail fasilitas")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, [1, 2].map(s => /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        flex: 1,
        height: 5,
        borderRadius: 999,
        background: s <= step ? "#F5A623" : "var(--surface-elevated)",
        boxShadow: s === step ? "0 0 12px rgba(245,166,35,.4)" : "none",
        transition: "background 200ms"
      }
    }))));
  }

  /* ---------- Brand header ---------- */
  function BrandHeader({
    size = "md"
  }) {
    const big = size === "lg";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: big ? 34 : 28,
      height: big ? 34 : 28,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "10",
      y: "8",
      width: "10",
      height: "32",
      rx: "3",
      fill: "#F5A623"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20 8h10a10 10 0 0 1 0 20H20",
      stroke: "#F5A623",
      strokeWidth: "8",
      strokeLinecap: "round",
      fill: "none"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: big ? 24 : 20,
        fontWeight: 800,
        letterSpacing: ".14em",
        color: "#F5F5F0"
      }
    }, "SUPAPARK")));
  }

  /* ---------- Animated success check ---------- */
  function SuccessCheck({
    size = 120
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(0,255,136,.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "obPop 520ms cubic-bezier(.2,.8,.2,1)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: size * 0.7,
        height: size * 0.7,
        borderRadius: "50%",
        background: "rgba(0,255,136,.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: size * 0.46,
      height: size * 0.46,
      viewBox: "0 0 52 52"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "26",
      cy: "26",
      r: "24",
      fill: "none",
      stroke: "#00FF88",
      strokeWidth: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M15 27 l8 8 l15 -16",
      fill: "none",
      stroke: "#00FF88",
      strokeWidth: "4",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))));
  }
  window.OB = {
    Icon,
    Field,
    TextInput,
    NumberInput,
    SelectInput,
    DateInput,
    TextArea,
    PrimaryButton,
    OutlineButton,
    Progress,
    BrandHeader,
    SuccessCheck
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/onboarding/fields.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pwa/pwa.jsx
try { (() => {
/* SupaPark Parking PWA — visitor mobile web app (375px).
   Scan QR on a pillar → link plate → prepay before the exit gate.
   Bahasa Indonesia. window.PWA_App */
(function () {
  const C = {
    bg: "#0A0A0A",
    card: "#111111",
    overlay: "#1A1A1A",
    elevated: "#222222",
    border: "#2A2A2A",
    borderFaint: "rgba(255,255,255,.06)",
    text: "#F5F5F0",
    sub: "#A3A39A",
    faint: "#666660",
    amber: "#F5A623",
    amberHover: "#FFB830",
    green: "#00FF88",
    red: "#FF3333",
    ui: "var(--font-ui)",
    mono: "var(--font-mono)"
  };
  function Icon({
    name,
    size = 18,
    color = "currentColor",
    strokeWidth = 1.75,
    style
  }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const el = ref.current;
      if (el && window.lucide) {
        el.innerHTML = "";
        const i = document.createElement("i");
        i.setAttribute("data-lucide", name);
        el.appendChild(i);
        window.lucide.createIcons({
          attrs: {
            width: size,
            height: size,
            stroke: color,
            "stroke-width": strokeWidth
          },
          nameAttr: "data-lucide"
        });
      }
    });
    return /*#__PURE__*/React.createElement("span", {
      ref: ref,
      style: {
        display: "inline-flex",
        width: size,
        height: size,
        flexShrink: 0,
        ...style
      }
    });
  }

  /* ---------- deterministic QR ---------- */
  function QRCode({
    size = 220
  }) {
    const N = 25;
    const cells = [];
    let seed = 13;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const finder = (r, c) => r < 7 && c < 7 || r < 7 && c >= N - 7 || r >= N - 7 && c < 7;
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      if (finder(r, c)) continue;
      if (rnd() > 0.5) cells.push([r, c]);
    }
    const Eye = ({
      x,
      y
    }) => /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: y,
      width: "7",
      height: "7",
      fill: "#000"
    }), /*#__PURE__*/React.createElement("rect", {
      x: x + 1,
      y: y + 1,
      width: "5",
      height: "5",
      fill: "#fff"
    }), /*#__PURE__*/React.createElement("rect", {
      x: x + 2,
      y: y + 2,
      width: "3",
      height: "3",
      fill: "#000"
    }));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 14,
        padding: 14,
        display: "inline-block"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: `0 0 ${N} ${N}`,
      shapeRendering: "crispEdges"
    }, /*#__PURE__*/React.createElement("rect", {
      width: N,
      height: N,
      fill: "#fff"
    }), cells.map(([r, c], i) => /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: c,
      y: r,
      width: "1",
      height: "1",
      fill: "#000"
    })), /*#__PURE__*/React.createElement(Eye, {
      x: 0,
      y: 0
    }), /*#__PURE__*/React.createElement(Eye, {
      x: N - 7,
      y: 0
    }), /*#__PURE__*/React.createElement(Eye, {
      x: 0,
      y: N - 7
    })));
  }

  /* ---------- fee model ---------- */
  function feeFor(minutes) {
    const hrs = Math.max(1, Math.ceil(minutes / 60));
    return 5000 + (hrs - 1) * 3000;
  }
  function rupiah(n) {
    return "Rp " + n.toLocaleString("id-ID");
  }
  function durText(minutes) {
    const h = Math.floor(minutes / 60),
      m = minutes % 60;
    if (h === 0) return `${m} menit`;
    return `${h} jam ${m} menit`;
  }

  /* ---------- buttons ---------- */
  function PrimaryBtn({
    children,
    onClick,
    color = C.amber,
    textColor = "#0A0A0A"
  }) {
    const [h, setH] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        width: "100%",
        minHeight: 54,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        background: h ? "#FFB830" : color,
        color: textColor,
        border: "none",
        borderRadius: 14,
        fontSize: 16,
        fontWeight: 700,
        fontFamily: C.ui,
        cursor: "pointer",
        transition: "background 140ms",
        padding: "0 18px"
      }
    }, children);
  }

  /* ---------- plate input ---------- */
  function PlateInput({
    value,
    onChange,
    error
  }) {
    const [f, setF] = React.useState(false);
    return /*#__PURE__*/React.createElement("input", {
      value: value,
      onChange: e => onChange(e.target.value.toUpperCase()),
      onFocus: () => setF(true),
      onBlur: () => setF(false),
      placeholder: "B 1234 ABC",
      style: {
        width: "100%",
        height: 56,
        padding: "0 16px",
        boxSizing: "border-box",
        textAlign: "center",
        background: C.bg,
        color: C.amber,
        border: `1px solid ${error ? C.red : f ? C.amber : C.border}`,
        borderRadius: 12,
        fontFamily: C.mono,
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: "0.12em",
        boxShadow: `0 0 0 3px ${error ? "rgba(255,51,51,.16)" : f ? "rgba(245,166,35,.18)" : "transparent"}`,
        outline: "none",
        transition: "border-color 140ms, box-shadow 140ms"
      }
    });
  }
  function PhoneInput({
    value,
    onChange,
    error
  }) {
    const [f, setF] = React.useState(false);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 14,
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 17,
      color: f ? C.amber : C.faint
    })), /*#__PURE__*/React.createElement("input", {
      value: value,
      onChange: e => onChange(e.target.value.replace(/[^0-9]/g, "")),
      onFocus: () => setF(true),
      onBlur: () => setF(false),
      type: "tel",
      inputMode: "tel",
      placeholder: "08xxxxxxxxxx",
      style: {
        width: "100%",
        height: 52,
        padding: "0 14px 0 42px",
        boxSizing: "border-box",
        background: C.bg,
        color: C.text,
        border: `1px solid ${error ? C.red : f ? C.amber : C.border}`,
        borderRadius: 12,
        fontFamily: C.ui,
        fontSize: 16,
        boxShadow: `0 0 0 3px ${error ? "rgba(255,51,51,.16)" : f ? "rgba(245,166,35,.18)" : "transparent"}`,
        outline: "none",
        transition: "border-color 140ms, box-shadow 140ms"
      }
    }));
  }
  function Field({
    label,
    error,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 7
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: C.text
      }
    }, label), children, error && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12.5,
        color: C.red
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "alert-circle",
      size: 14,
      color: C.red
    }), error));
  }
  function PlatePill({
    plate,
    size = 20
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: C.mono,
        fontWeight: 700,
        color: C.amber,
        letterSpacing: "0.1em",
        fontSize: size
      }
    }, plate);
  }
  function Logo({
    size = 22,
    withWord = true
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "10",
      y: "8",
      width: "10",
      height: "32",
      rx: "3",
      fill: C.amber
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20 8h10a10 10 0 0 1 0 20H20",
      stroke: C.amber,
      strokeWidth: "8",
      strokeLinecap: "round",
      fill: "none"
    })), withWord && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: size * 0.62,
        fontWeight: 800,
        letterSpacing: ".12em",
        color: C.text
      }
    }, "SUPAPARK"));
  }

  /* ====================== SCREENS ====================== */

  /* 1. Landing / Link plate */
  function Landing({
    go,
    state,
    set
  }) {
    const [plate, setPlate] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [err, setErr] = React.useState({});
    const submit = () => {
      const e = {};
      if (!/^[A-Z]{1,2}\s?\d{1,4}\s?[A-Z]{0,3}$/.test(plate.trim())) e.plate = "Masukkan plat yang valid (mis. B 1234 ABC)";
      if (!/^08\d{8,12}$/.test(phone)) e.phone = "Gunakan format 08xxxxxxxxxx";
      setErr(e);
      if (Object.keys(e).length === 0) {
        set({
          plate: plate.trim()
        });
        go("session");
      }
    };
    return /*#__PURE__*/React.createElement(ScreenScroll, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        paddingTop: 6
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: C.overlay,
        border: `1px solid ${C.border}`,
        borderRadius: 999,
        padding: "7px 14px",
        fontSize: 13,
        color: C.text
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 14,
      color: C.amber
    }), state.location)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        marginTop: 22
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontSize: 26,
        fontWeight: 700,
        color: C.text
      }
    }, "Hubungkan Plat Anda"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "8px 16px 0",
        fontSize: 14.5,
        color: C.sub,
        lineHeight: 1.5
      }
    }, "Satu kali saja \u2014 berlaku di semua lokasi SupaPark")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: 20,
        marginTop: 24,
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Nomor Plat",
      error: err.plate
    }, /*#__PURE__*/React.createElement(PlateInput, {
      value: plate,
      onChange: setPlate,
      error: !!err.plate
    })), /*#__PURE__*/React.createElement(Field, {
      label: "No. Handphone",
      error: err.phone
    }, /*#__PURE__*/React.createElement(PhoneInput, {
      value: phone,
      onChange: setPhone,
      error: !!err.phone
    })), /*#__PURE__*/React.createElement(PrimaryBtn, {
      onClick: submit
    }, "Hubungkan", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18,
      color: "#0A0A0A"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 14,
        color: C.sub
      }
    }, "Sudah terhubung? ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        set({
          plate: "B 1234 ABC"
        });
        go("session");
      },
      style: {
        color: C.amber,
        fontWeight: 600,
        textDecoration: "none"
      }
    }, "Cek sesi Anda")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        marginTop: 22,
        padding: "12px 14px",
        background: "rgba(245,166,35,.05)",
        border: "1px solid rgba(245,166,35,.18)",
        borderRadius: 12
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shield-check",
      size: 16,
      color: C.amber,
      style: {
        marginTop: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: C.sub,
        lineHeight: 1.5
      }
    }, "Plat & nomor Anda aman. Digunakan hanya untuk verifikasi parkir.")));
  }

  /* 2. Active session */
  function Session({
    go,
    state
  }) {
    const [mins, setMins] = React.useState(135);
    React.useEffect(() => {
      const base = Date.now();
      const id = setInterval(() => setMins(135 + Math.floor((Date.now() - base) / 60000)), 1000);
      // tick seconds for live feel via re-render
      return () => clearInterval(id);
    }, []);
    const [sec, setSec] = React.useState(0);
    React.useEffect(() => {
      const id = setInterval(() => setSec(s => (s + 1) % 60), 1000);
      return () => clearInterval(id);
    }, []);
    const fee = feeFor(mins);
    return /*#__PURE__*/React.createElement(ScreenScroll, null, /*#__PURE__*/React.createElement(TopBar, {
      onBack: () => go("landing"),
      title: "Sesi Aktif",
      right: /*#__PURE__*/React.createElement("button", {
        onClick: () => go("history"),
        style: iconBtn
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "history",
        size: 18,
        color: C.sub
      }))
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 12px",
        borderRadius: 999,
        background: "rgba(0,255,136,.1)",
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: C.green,
        animation: "pwaPulse 1.6s ease-in-out infinite"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: C.green
      }
    }, "Sedang Parkir")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlatePill, {
      plate: state.plate,
      size: 34
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 14,
        color: C.text,
        fontWeight: 600
      }
    }, state.location), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: C.faint,
        marginTop: 2
      }
    }, state.address)), /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: 4,
        marginTop: 22
      }
    }, /*#__PURE__*/React.createElement(Row, {
      icon: "log-in",
      label: "Waktu Masuk",
      value: "14:35 WIB, 14 Jun 2026"
    }), /*#__PURE__*/React.createElement(Row, {
      icon: "timer",
      label: "Durasi",
      value: /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: C.mono
        }
      }, durText(mins), " ", String(sec).padStart(2, "0"), "s"),
      live: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 16px",
        borderTop: `1px solid ${C.borderFaint}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.sub,
        marginBottom: 4
      }
    }, "Biaya Saat Ini"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: C.ui,
        fontSize: 40,
        fontWeight: 800,
        color: C.amber,
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums"
      }
    }, rupiah(fee))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 16px",
        borderTop: `1px solid ${C.borderFaint}`,
        display: "flex",
        gap: 10,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "receipt-text",
      size: 15,
      color: C.faint,
      style: {
        marginTop: 2
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: C.sub,
        lineHeight: 1.5
      }
    }, "Tarif: Rp 5.000/jam pertama, Rp 3.000/jam berikutnya"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 20
      }
    }, /*#__PURE__*/React.createElement(PrimaryBtn, {
      onClick: () => go("payment")
    }, "Bayar Sekarang \u2014 ", rupiah(fee)), /*#__PURE__*/React.createElement("p", {
      style: {
        textAlign: "center",
        margin: "12px 8px 0",
        fontSize: 12.5,
        color: C.sub,
        lineHeight: 1.5
      }
    }, "Bayar sebelum keluar untuk melewati gerbang lebih cepat")));
  }

  /* 3. Payment QRIS */
  function Payment({
    go,
    state
  }) {
    const fee = feeFor(135);
    const [t, setT] = React.useState(300);
    React.useEffect(() => {
      const id = setInterval(() => setT(x => x > 0 ? x - 1 : 0), 1000);
      return () => clearInterval(id);
    }, []);
    const mm = Math.floor(t / 60),
      ss = String(t % 60).padStart(2, "0");
    return /*#__PURE__*/React.createElement(ScreenScroll, null, /*#__PURE__*/React.createElement(TopBar, {
      onBack: () => go("session"),
      title: "Pembayaran"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "12px 16px",
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.faint
      }
    }, "Plat"), /*#__PURE__*/React.createElement(PlatePill, {
      plate: state.plate,
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.faint
      }
    }, "Total"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: C.ui,
        fontSize: 22,
        fontWeight: 800,
        color: C.amber
      }
    }, rupiah(fee)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 26
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => go("success"),
      style: {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(QRCode, {
      size: 208
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18,
        fontSize: 16,
        fontWeight: 700,
        color: C.text
      }
    }, "Scan QR atau ketuk untuk bayar"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        fontSize: 13,
        color: C.sub
      }
    }, "QRIS \xB7 GoPay \xB7 OVO \xB7 Dana \xB7 ShopeePay"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: 999,
        background: C.overlay,
        border: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 15,
      color: t < 60 ? C.red : C.amber
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: C.text
      }
    }, "Berlaku ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: C.mono,
        fontWeight: 700,
        color: t < 60 ? C.red : C.text
      }
    }, mm, ":", ss), " menit"))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        marginTop: 28
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        go("session");
      },
      style: {
        color: C.sub,
        fontSize: 15,
        textDecoration: "none"
      }
    }, "Batal")));
  }

  /* 4. Payment success */
  function Success({
    go
  }) {
    const fee = feeFor(135);
    return /*#__PURE__*/React.createElement(ScreenScroll, {
      center: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 120,
        height: 120,
        borderRadius: "50%",
        background: "rgba(0,255,136,.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "pwaPop 520ms cubic-bezier(.2,.8,.2,1)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 84,
        height: 84,
        borderRadius: "50%",
        background: "rgba(0,255,136,.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "52",
      height: "52",
      viewBox: "0 0 52 52"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "26",
      cy: "26",
      r: "24",
      fill: "none",
      stroke: C.green,
      strokeWidth: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M15 27 l8 8 l15 -16",
      fill: "none",
      stroke: C.green,
      strokeWidth: "4",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontSize: 26,
        fontWeight: 700,
        color: C.text
      }
    }, "Pembayaran Berhasil!"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        fontFamily: C.ui,
        fontSize: 44,
        fontWeight: 800,
        color: C.green
      }
    }, rupiah(fee))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "14px 16px",
        margin: "0 8px"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "door-open",
      size: 20,
      color: C.amber
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13.5,
        color: C.text,
        textAlign: "left",
        lineHeight: 1.5
      }
    }, "Gerbang keluar akan terbuka otomatis saat Anda tiba"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 30
      }
    }, /*#__PURE__*/React.createElement(PrimaryBtn, {
      onClick: () => go("history")
    }, "Selesai")));
  }

  /* 5. Session history */
  const HISTORY = [{
    loc: "Plaza Yogyakarta",
    date: "14 Jun 2026",
    dur: "2 jam 15 menit",
    amount: 11000,
    status: "paid"
  }, {
    loc: "Malioboro Mall",
    date: "10 Jun 2026",
    dur: "1 jam 30 menit",
    amount: 8000,
    status: "paid"
  }, {
    loc: "RS Sardjito",
    date: "5 Jun 2026",
    dur: "0 jam 45 menit",
    amount: 5000,
    status: "unpaid"
  }, {
    loc: "Hartono Mall",
    date: "28 Mei 2026",
    dur: "3 jam 10 menit",
    amount: 14000,
    status: "paid"
  }, {
    loc: "Plaza Yogyakarta",
    date: "21 Mei 2026",
    dur: "1 jam 05 menit",
    amount: 8000,
    status: "paid"
  }];
  function History({
    go,
    empty
  }) {
    const data = empty ? [] : HISTORY;
    return /*#__PURE__*/React.createElement(ScreenScroll, null, /*#__PURE__*/React.createElement(TopBar, {
      onBack: () => go("landing"),
      title: "Riwayat Parkir"
    }), data.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 72,
        height: 72,
        borderRadius: 18,
        background: C.overlay,
        border: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "receipt-text",
      size: 30,
      color: C.faint
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 600,
        color: C.text
      }
    }, "Belum ada riwayat"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        color: C.sub,
        marginTop: 6,
        maxWidth: 240,
        lineHeight: 1.5
      }
    }, "Sesi parkir Anda akan muncul di sini setelah pembayaran pertama.")) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginTop: 14
      }
    }, data.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: C.text
      }
    }, s.loc), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: C.faint,
        marginTop: 3
      }
    }, s.date)), /*#__PURE__*/React.createElement(StatusPill, {
      status: s.status
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 12,
        paddingTop: 12,
        borderTop: `1px solid ${C.borderFaint}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13,
        color: C.sub
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "timer",
      size: 14,
      color: C.faint
    }), s.dur), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: C.ui,
        fontSize: 16,
        fontWeight: 700,
        color: C.text
      }
    }, rupiah(s.amount)))))));
  }
  function StatusPill({
    status
  }) {
    const paid = status === "paid";
    const color = paid ? C.green : C.red;
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 10px",
        borderRadius: 999,
        background: color + "1f",
        color,
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: "nowrap",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: color
      }
    }), paid ? "Lunas" : "Belum Bayar");
  }

  /* ---------- shared ---------- */
  const iconBtn = {
    width: 38,
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    border: `1px solid ${C.border}`,
    background: C.card,
    cursor: "pointer"
  };
  function TopBar({
    onBack,
    title,
    right
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: iconBtn
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 18,
      color: C.sub
    })), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        flex: 1,
        fontSize: 18,
        fontWeight: 700,
        color: C.text
      }
    }, title), right);
  }
  function Row({
    icon,
    label,
    value,
    live
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 16px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        flexShrink: 0,
        borderRadius: 9,
        background: C.overlay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 16,
      color: C.faint
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: C.sub,
        flex: 1
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: C.text,
        display: "flex",
        alignItems: "center",
        gap: 7
      }
    }, live && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: C.green,
        animation: "pwaPulse 1.6s ease-in-out infinite"
      }
    }), value));
  }
  function ScreenScroll({
    children,
    center
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pwa-scroll",
      style: {
        height: "100%",
        overflowY: "auto",
        padding: "12px 18px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: center ? "center" : "flex-start"
      }
    }, children);
  }

  /* ====================== PHONE + ROUTER ====================== */
  function App() {
    const [screen, setScreen] = React.useState("landing");
    const [emptyHistory, setEmptyHistory] = React.useState(false);
    const [state, setState] = React.useState({
      plate: "B 1234 ABC",
      location: "Plaza Yogyakarta",
      address: "Jl. Malioboro No. 52, Yogyakarta"
    });
    const set = patch => setState(s => ({
      ...s,
      ...patch
    }));
    const go = s => {
      setScreen(s);
      const el = document.querySelector(".pwa-scroll");
      if (el) el.scrollTop = 0;
    };
    React.useEffect(() => {
      if (window.lucide) window.lucide.createIcons();
    });
    const SCREENS = [["landing", "Hubungkan", "link"], ["session", "Sesi Aktif", "car"], ["payment", "Bayar (QRIS)", "qr-code"], ["success", "Berhasil", "check-circle"], ["history", "Riwayat", "history"]];
    let content;
    if (screen === "landing") content = /*#__PURE__*/React.createElement(Landing, {
      go: go,
      state: state,
      set: set
    });else if (screen === "session") content = /*#__PURE__*/React.createElement(Session, {
      go: go,
      state: state
    });else if (screen === "payment") content = /*#__PURE__*/React.createElement(Payment, {
      go: go,
      state: state
    });else if (screen === "success") content = /*#__PURE__*/React.createElement(Success, {
      go: go
    });else content = /*#__PURE__*/React.createElement(History, {
      go: go,
      empty: emptyHistory
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh",
        background: "#070707",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        padding: 30,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: 375,
        height: 812,
        background: C.bg,
        borderRadius: 44,
        border: "11px solid #1a1a1a",
        overflow: "hidden",
        boxShadow: "0 40px 90px rgba(0,0,0,.6)",
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 44,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "relative",
        zIndex: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: C.text
      }
    }, "9:41"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: 8,
        transform: "translateX(-50%)",
        width: 110,
        height: 26,
        background: "#000",
        borderRadius: 14
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "signal",
      size: 15,
      color: C.text
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "wifi",
      size: 15,
      color: C.text
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "battery-full",
      size: 17,
      color: C.text
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0
      }
    }, content), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 22,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 134,
        height: 5,
        borderRadius: 3,
        background: "#3a3a3a"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 220,
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: ".1em",
        color: C.faint,
        marginBottom: 2
      }
    }, "Layar PWA"), SCREENS.map(([key, label, ic]) => {
      const on = screen === key;
      return /*#__PURE__*/React.createElement("button", {
        key: key,
        onClick: () => go(key),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: "11px 13px",
          borderRadius: 10,
          border: `1px solid ${on ? C.amber : C.border}`,
          background: on ? "rgba(245,166,35,.08)" : C.card,
          color: on ? C.amber : C.sub,
          fontSize: 14,
          fontWeight: on ? 600 : 500,
          fontFamily: C.ui,
          cursor: "pointer",
          textAlign: "left"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: ic,
        size: 17,
        color: on ? C.amber : C.faint
      }), label);
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: C.border,
        margin: "8px 0"
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setEmptyHistory(e => !e);
        go("history");
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "10px 13px",
        borderRadius: 10,
        border: `1px solid ${C.border}`,
        background: C.card,
        color: C.sub,
        fontSize: 13,
        fontFamily: C.ui,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "repeat",
      size: 15,
      color: C.faint
    }), "Riwayat: ", emptyHistory ? "kosong" : "terisi")));
  }
  window.PWA_App = App;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pwa/pwa.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.BoothButton = __ds_scope.BoothButton;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.MetricCard = __ds_scope.MetricCard;

__ds_ns.PlateDisplay = __ds_scope.PlateDisplay;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

})();
