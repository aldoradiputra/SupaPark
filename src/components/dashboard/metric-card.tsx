import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MetricCard({
  label,
  value,
  sub,
  icon: Icon,
  loading,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  icon?: LucideIcon;
  loading?: boolean;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-label text-faint">
          {label}
        </span>
        {Icon ? <Icon size={16} className="text-amber" /> : null}
      </div>
      {loading ? (
        <Skeleton className="mt-3 h-8 w-24" />
      ) : (
        <div className="mt-2 text-[28px] font-bold leading-none text-foreground">
          {value}
        </div>
      )}
      {sub && !loading ? (
        <div className="mt-2 text-xs text-muted">{sub}</div>
      ) : null}
    </Card>
  );
}
