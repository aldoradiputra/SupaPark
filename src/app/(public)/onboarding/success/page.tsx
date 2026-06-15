import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function OnboardingSuccess() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Terima kasih</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">
        Pendaftaran Anda telah kami terima. Tim SupaPark akan menghubungi Anda.
        (Halaman konfirmasi — scaffold.)
      </p>
      <Link href="/" className="mt-6 inline-block">
        <Button variant="secondary">Kembali ke beranda</Button>
      </Link>
    </div>
  );
}
