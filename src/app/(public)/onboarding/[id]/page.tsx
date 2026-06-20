import { Step2Form } from "@/components/onboarding/step2-form";
import { StepsProgress } from "@/components/onboarding/steps-progress";
import { Card } from "@/components/ui/card";

export default function OnboardingStep2Page({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <StepsProgress current={2} />
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Lokasi &amp; detail fasilitas
        </h1>
        <p className="mt-1 text-sm text-muted">
          Tandai lokasi di peta dan lengkapi detail operasional.
        </p>
      </div>
      <Card className="p-6">
        <Step2Form id={params.id} />
      </Card>
    </div>
  );
}
