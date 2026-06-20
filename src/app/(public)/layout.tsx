import Link from "next/link";

import { Logo } from "@/components/logo";
import { buttonClassName } from "@/components/ui/button";

/** Minimal public chrome — no sidebar. Landing + onboarding funnel. */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={24} />
          <span className="font-bold tracking-[0.01em] text-foreground">
            SupaPark
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            Masuk
          </Link>
          <Link
            href="/onboarding"
            className={buttonClassName({ size: "sm" })}
          >
            Mulai
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

