import { Step1Form } from "@/components/onboarding/step1-form";
import { StepsProgress } from "@/components/onboarding/steps-progress";
import { Card } from "@/components/ui/card";

export default function OnboardingStep1Page() {
  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <StepsProgress current={1} />
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Daftarkan fasilitas Anda
        </h1>
        <p className="mt-1 text-sm text-muted">
          Mulai dengan data diri Anda — hanya dua langkah singkat.
        </p>
      </div>
      <Card className="p-6">
        <Step1Form />
      </Card>
    </div>
  );
}
