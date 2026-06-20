import { cn } from "@/lib/utils";

const STEPS = ["Data Diri", "Lokasi & Detail"];

export function StepsProgress({ current }: { current: 1 | 2 }) {
  return (
    <div className="mx-auto mb-8 w-full max-w-xl">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-amber">
          Langkah {current} dari {STEPS.length}
        </span>
        <span className="text-faint">{STEPS[current - 1]}</span>
      </div>
      <div className="flex gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < current ? "bg-amber" : "bg-surface-elevated",
            )}
          />
        ))}
      </div>
    </div>
  );
}
