import React from "react";

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
export function Button({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) {
  ensureStyles("sp-btn-styles", CSS);
  const variantClass =
    variant === "default" ? "sp-btn--default-v" : `sp-btn--${variant}`;
  return (
    <button
      className={`sp-btn sp-btn--${size} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
