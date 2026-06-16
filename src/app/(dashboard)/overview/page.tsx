"use client";

import { Activity, Car, DollarSign, Gauge } from "lucide-react";

import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import {
  EmptyState,
  ErrorState,
  NoLocation,
  TableSkeleton,
} from "@/components/dashboard/states";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Card } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { getLocationById, getOverview } from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import { useAsync } from "@/lib/use-async";
import { useRealtime } from "@/lib/use-realtime";
import { formatDateTime, formatDuration, formatRupiah } from "@/lib/utils";
import { useAppStore } from "@/store";

export default function OverviewPage() {
  const locationId = useAppStore((s) => s.selectedLocationId);

  const { data, loading, error, reload } = useAsync(async () => {
    if (!locationId) return null;
    const supabase = createClient();
    const [stats, location] = await Promise.all([
      getOverview(supabase, locationId),
      getLocationById(supabase, locationId),
    ]);
    return { stats, location };
  }, [locationId]);

  // Live updates: refetch on any session change at this location.
  useRealtime({
    table: "parking_sessions",
    filter: locationId ? `location_id=eq.${locationId}` : undefined,
    enabled: !!locationId,
    onChange: () => reload(),
  });

  if (!locationId) {
    return (
      <>
        <PageHeader title="Overview" />
        <NoLocation />
      </>
    );
  }

  const stats = data?.stats;
  const capacity =
    (data?.location?.capacity_car ?? 0) + (data?.location?.capacity_moto ?? 0);
  const occupancyPct =
    capacity > 0 && stats ? Math.round((stats.activeCount / capacity) * 100) : 0;

  return (
    <>
      <PageHeader
        title="Overview"
        description="Ringkasan langsung okupansi, pendapatan, dan sesi."
      />

      {error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Sesi Aktif"
              value={stats?.activeCount ?? 0}
              icon={Activity}
              loading={loading}
            />
            <MetricCard
              label="Pendapatan Hari Ini"
              value={formatRupiah(stats?.todayRevenue ?? 0)}
              icon={DollarSign}
              loading={loading}
            />
            <MetricCard
              label="Sesi Hari Ini"
              value={stats?.todaySessions ?? 0}
              icon={Car}
              loading={loading}
            />
            <MetricCard
              label="Okupansi"
              value={`${occupancyPct}%`}
              sub={capacity > 0 ? `${stats?.activeCount ?? 0} / ${capacity}` : "—"}
              icon={Gauge}
              loading={loading}
            />
          </div>

          <Card className="mt-6 p-0">
            <div className="border-b border-border px-5 py-3 text-[11px] font-semibold uppercase tracking-label text-faint">
              Sesi Terbaru
            </div>
            <div className="p-3">
              {loading ? (
                <TableSkeleton cols={5} />
              ) : !stats?.recent.length ? (
                <EmptyState message="Belum ada sesi." />
              ) : (
                <Table>
                  <THead>
                    <TR>
                      <TH>Plat</TH>
                      <TH>Jenis</TH>
                      <TH>Masuk</TH>
                      <TH>Durasi</TH>
                      <TH>Status</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {stats.recent.map((s) => (
                      <TR key={s.id}>
                        <TD className="plate text-sm">{s.plate}</TD>
                        <TD className="capitalize text-muted">
                          {s.vehicle_type ?? "—"}
                        </TD>
                        <TD className="text-muted">
                          {formatDateTime(s.entry_time)}
                        </TD>
                        <TD className="text-muted">
                          {formatDuration(s.duration_min)}
                        </TD>
                        <TD>
                          <StatusBadge value={s.session_status} />
                        </TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              )}
            </div>
          </Card>
        </>
      )}
    </>
  );
}
