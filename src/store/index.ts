import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Locale } from "@/lib/i18n";

/**
 * Global UI state. Auth is intentionally NOT stored here — the Supabase
 * session (httpOnly cookies, refreshed by middleware) is the single source of
 * truth. This store only holds user preferences + the selected location.
 */
interface AppState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;

  selectedLocationId: string | null;
  setSelectedLocationId: (id: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      locale: "id",
      setLocale: (locale) => set({ locale }),
      toggleLocale: () => set({ locale: get().locale === "en" ? "id" : "en" }),

      selectedLocationId: null,
      setSelectedLocationId: (selectedLocationId) => set({ selectedLocationId }),
    }),
    { name: "supapark-prefs" },
  ),
);
