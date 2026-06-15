import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { buttonClassName } from "@/components/ui/button";

export default function OnboardingSuccessPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
        <CheckCircle2 size={36} />
      </span>
      <h1 className="mt-6 text-2xl font-semibold text-foreground">
        Pendaftaran Berhasil!
      </h1>
      <p className="mt-2 text-muted">
        Tim kami akan menghubungi Anda dalam 1×24 jam.
      </p>
      <Link
        href="/"
        className={buttonClassName({ variant: "secondary", className: "mt-8" })}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
