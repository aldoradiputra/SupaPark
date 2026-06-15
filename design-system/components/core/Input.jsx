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
export function Input({ className = "", ...props }) {
  ensureStyles("sp-input-styles", CSS);
  return <input className={`sp-input ${className}`} {...props} />;
}
