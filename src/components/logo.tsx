import { cn } from "@/lib/utils";

/**
 * SupaPark logo mark — amber rounded square with a parking "P".
 * Swap for design-system/assets/logo-mark.svg when finalizing branding.
 */
export function Logo({
  size = 26,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="SupaPark"
      className={cn("shrink-0", className)}
    >
      <rect width="32" height="32" rx="8" fill="#F5A623" />
      <path
        d="M11 24V8h6.2a5.4 5.4 0 0 1 0 10.8H14.4"
        stroke="#0A0A0A"
        strokeWidth="3"
        strokeLinecap="square"
        fill="none"
      />
    </svg>
  );
}
