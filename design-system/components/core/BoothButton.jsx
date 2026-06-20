import React from "react";

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
export function BoothButton({ variant = "primary", className = "", children, ...props }) {
  ensureStyles("sp-booth-btn-styles", CSS);
  return (
    <button className={`sp-booth-btn sp-booth-btn--${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}
