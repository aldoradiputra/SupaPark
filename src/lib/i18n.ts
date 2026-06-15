"use client";

import { useAppStore } from "@/store";

export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

// Minimal dictionary — extend as screens are built. Labels mirror the
// design-system dashboard kit (EN / ID).
const dict = {
  en: {
    overview: "Overview",
    sessions: "Sessions",
    revenue: "Revenue",
    members: "Members",
    plateRules: "Plate Rules",
    leads: "Leads",
    projects: "Projects",
    devices: "Devices",
    settings: "Settings",
    signOut: "Sign out",
    language: "English",
  },
  id: {
    overview: "Ringkasan",
    sessions: "Sesi",
    revenue: "Pendapatan",
    members: "Anggota",
    plateRules: "Aturan Plat",
    leads: "Leads",
    projects: "Proyek",
    devices: "Perangkat",
    settings: "Pengaturan",
    signOut: "Keluar",
    language: "Bahasa Indonesia",
  },
} as const;

export type TranslationKey = keyof (typeof dict)["en"];

export function translate(locale: Locale, key: TranslationKey): string {
  return dict[locale][key] ?? key;
}

/** Hook: returns a `t(key)` bound to the current locale from the store. */
export function useTranslations() {
  const locale = useAppStore((s) => s.locale);
  return (key: TranslationKey) => translate(locale, key);
}
