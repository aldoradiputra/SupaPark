import { Card } from "@/components/ui/card";

export default function OnboardingStep1() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-label text-amber">
        Langkah 1 dari 2
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">
        Daftarkan fasilitas Anda
      </h1>
      <p className="mt-1 text-sm text-muted">
        Formulir step 1 (placeholder). Submit akan membuat lead lewat{" "}
        <code className="font-mono">createLead()</code> dan mengarah ke step 2.
      </p>
      <Card className="mt-6 p-6 text-sm text-muted">
        Form fields placeholder — nama, email, telepon, nama fasilitas.
      </Card>
    </div>
  );
}
