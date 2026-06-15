import Link from "next/link";

import { Logo } from "@/components/logo";

/** Minimal public chrome — no sidebar. Landing + onboarding funnel. */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={24} />
          <span className="font-bold tracking-[0.01em] text-foreground">
            SupaPark
          </span>
        </Link>
        <Link
          href="/login"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Masuk
        </Link>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
