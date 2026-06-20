"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Clock,
  Cpu,
  DollarSign,
  FolderKanban,
  Globe,
  LayoutDashboard,
  LogOut,
  ScanLine,
  Settings,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { LocationSwitcher } from "@/components/layout/location-switcher";
import { useTranslations, type TranslationKey } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";

const NAV: { href: string; key: TranslationKey; icon: LucideIcon }[] = [
  { href: "/overview", key: "overview", icon: LayoutDashboard },
  { href: "/sessions", key: "sessions", icon: Clock },
  { href: "/revenue", key: "revenue", icon: DollarSign },
  { href: "/members", key: "members", icon: Users },
  { href: "/plate-rules", key: "plateRules", icon: ScanLine },
  { href: "/leads", key: "leads", icon: UserPlus },
  { href: "/projects", key: "projects", icon: FolderKanban },
  { href: "/devices", key: "devices", icon: Cpu },
  { href: "/settings", key: "settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const locale = useAppStore((s) => s.locale);
  const toggleLocale = useAppStore((s) => s.toggleLocale);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2.5 px-5 pb-4 pt-5">
        <Logo size={26} />
        <span className="text-[17px] font-bold tracking-[0.01em] text-foreground">
          SupaPark
        </span>
      </div>

      <div className="px-3 pb-3">
        <LocationSwitcher />
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
        {NAV.map(({ href, key, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-amber/[0.07] font-semibold text-amber"
                  : "font-normal text-muted hover:bg-surface-overlay hover:text-foreground",
              )}
            >
              {active ? (
                <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r bg-amber" />
              ) : null}
              <Icon size={18} className={active ? "text-amber" : "text-faint"} />
              {t(key)}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2 border-t border-border p-3">
        <button
          onClick={toggleLocale}
          className="flex items-center gap-2.5 rounded-lg border border-border bg-surface-overlay px-3 py-2.5 text-[13px] text-muted hover:text-foreground"
        >
          <Globe size={16} />
          <span className="flex-1 text-left">{t("language")}</span>
          <span className="text-[11px] uppercase text-faint">{locale}</span>
        </button>
        <button
          onClick={signOut}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] text-muted hover:bg-surface-overlay hover:text-foreground"
        >
          <LogOut size={16} />
          {t("signOut")}
        </button>
      </div>
    </aside>
  );
}
