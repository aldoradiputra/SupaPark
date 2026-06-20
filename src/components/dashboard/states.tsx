import { AlertCircle, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function ErrorState({
  message,
  onRetry,
}: {
  message?: string | null;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-8 text-center">
      <AlertCircle className="text-error" size={22} />
      <p className="text-sm text-muted">{message ?? "Terjadi kesalahan."}</p>
      {onRetry ? (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Coba lagi
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyState({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-8 text-center text-muted">
      <Inbox size={20} className="text-faint" />
      <p className="text-sm">{message ?? "Belum ada data."}</p>
    </div>
  );
}

export function NoLocation() {
  return (
    <EmptyState message="Pilih lokasi terlebih dahulu dari menu di sidebar." />
  );
}

export function TableSkeleton({ rows = 6, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-3">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-9 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
