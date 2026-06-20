"use client";

import type { ReactNode } from "react";

/**
 * Client provider boundary. Zustand needs no provider, so this is currently a
 * pass-through — a single place to add React Query, a toaster, theme, etc.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
