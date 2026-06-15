import React from "react";

/**
 * SupaPark logo — barrier-gate "P" mark, optionally with the SUPAPARK wordmark.
 */
export function Logo({
  size = 32,
  color = "var(--amber)",
  wordmark = false,
  wordmarkColor,
  style,
  ...props
}) {
  const wc = wordmarkColor || color;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.25,
        ...style,
      }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-label="SupaPark"
        style={{ flexShrink: 0 }}
      >
        <rect x="10" y="8" width="10" height="32" rx="3" fill={color} />
        <path
          d="M20 8h10a10 10 0 0 1 0 20H20"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {wordmark && (
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: "var(--fw-bold)",
            fontSize: size * 0.62,
            letterSpacing: "0.15em",
            color: wc,
            lineHeight: 1,
          }}
        >
          SUPAPARK
        </span>
      )}
    </span>
  );
}
