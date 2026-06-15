import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-24">
      <span className="rounded-md bg-amber-subtle px-2 py-1 text-xs font-medium text-amber">
        Smart Parking · Indonesia
      </span>
      <h1 className="text-4xl font-bold leading-tight text-foreground">
        Cegah kebocoran. Maksimalkan pendapatan.
      </h1>
      <p className="max-w-xl text-muted">
        Sistem parkir ticketless &amp; offline-first — plat nomor adalah tiket.
        (Konten landing menyusul; ini halaman scaffold.)
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/onboarding">
          <Button>Mulai onboarding</Button>
        </Link>
        <Link href="/login">
          <Button variant="secondary">Masuk dashboard</Button>
        </Link>
      </div>
    </section>
  );
}
