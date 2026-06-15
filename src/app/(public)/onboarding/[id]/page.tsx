import { Card } from "@/components/ui/card";

export default function OnboardingStep2({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-label text-amber">
        Langkah 2 dari 2
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">
        Lokasi &amp; detail
      </h1>
      <p className="mt-1 text-sm text-muted">
        Lead ID: <span className="font-mono">{params.id}</span>
      </p>
      <Card className="mt-6 flex h-64 items-center justify-center text-sm text-faint">
        Peta (Leaflet) — placeholder
      </Card>
    </div>
  );
}
