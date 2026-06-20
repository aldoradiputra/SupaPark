"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { ErrorState, NoLocation } from "@/components/dashboard/states";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  revenueByMethod,
  revenueDaily,
  sessionsPeakHours,
} from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import { useAsync } from "@/lib/use-async";
import { formatRupiah } from "@/lib/utils";
import { useAppStore } from "@/store";

const AMBER = "#F5A623";

function ChartCard({
  title,
  children,
  loading,
}: {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <Card className="p-5">
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-label text-faint">
        {title}
      </div>
      {loading ? (
        <Skeleton className="h-[220px] w-full" />
      ) : (
        <div className="h-[220px] w-full">{children}</div>
      )}
    </Card>
  );
}

const tooltipStyle = {
  background: "#1A1A1A",
  border: "1px solid #2A2A2A",
  borderRadius: 8,
  fontSize: 12,
  color: "#F5F5F0",
};

export default function RevenuePage() {
  const locationId = useAppStore((s) => s.selectedLocationId);

  const { data, loading, error, reload } = useAsync(async () => {
    if (!locationId) return null;
    const supabase = createClient();
    const [daily, byMethod, peak] = await Promise.all([
      revenueDaily(supabase, locationId, 30),
      revenueByMethod(supabase, locationId, 30),
      sessionsPeakHours(supabase, locationId, 30),
    ]);
    return { daily, byMethod, peak };
  }, [locationId]);

  if (!locationId) {
    return (
      <>
        <PageHeader title="Revenue" />
        <NoLocation />
      </>
    );
  }

  const total = (data?.daily ?? []).reduce((sum, d) => sum + d.revenue, 0);
  const sessions = (data?.daily ?? []).reduce((sum, d) => sum + d.sessions, 0);
  const dailyData = (data?.daily ?? []).map((d) => ({
    label: d.day.slice(5).replace("-", "/"),
    revenue: d.revenue,
  }));
  const peakData = (data?.peak ?? []).map((p) => ({
    label: `${String(p.hour).padStart(2, "0")}`,
    sessions: p.sessions,
  }));

  return (
    <>
      <PageHeader
        title="Revenue"
        description="Pendapatan 30 hari terakhir."
      />

      {error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : (
        <>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <MetricCard
              label="Total Pendapatan (30h)"
              value={formatRupiah(total)}
              loading={loading}
            />
            <MetricCard
              label="Total Sesi Selesai (30h)"
              value={sessions}
              loading={loading}
            />
          </div>

          <div className="grid gap-4">
            <ChartCard title="Pendapatan Harian" loading={loading}>
              <ResponsiveContainer>
                <BarChart data={dailyData}>
                  <CartesianGrid stroke="#2A2A2A" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="#666660"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#666660"
                    fontSize={11}
                    tickLine={false}
                    width={48}
                    tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    cursor={{ fill: "rgba(245,166,35,0.08)" }}
                    formatter={(v: number) => [formatRupiah(v), "Pendapatan"]}
                  />
                  <Bar dataKey="revenue" fill={AMBER} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <div className="grid gap-4 lg:grid-cols-2">
              <ChartCard title="Per Metode Pembayaran" loading={loading}>
                <ResponsiveContainer>
                  <BarChart data={data?.byMethod ?? []} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="method"
                      stroke="#666660"
                      fontSize={11}
                      tickLine={false}
                      width={72}
                      className="capitalize"
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      cursor={{ fill: "rgba(245,166,35,0.08)" }}
                      formatter={(v: number) => [formatRupiah(v), "Pendapatan"]}
                    />
                    <Bar dataKey="revenue" fill={AMBER} radius={[0, 3, 3, 0]}>
                      {(data?.byMethod ?? []).map((_, i) => (
                        <Cell key={i} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Jam Sibuk" loading={loading}>
                <ResponsiveContainer>
                  <BarChart data={peakData}>
                    <CartesianGrid stroke="#2A2A2A" vertical={false} />
                    <XAxis
                      dataKey="label"
                      stroke="#666660"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#666660"
                      fontSize={11}
                      tickLine={false}
                      width={32}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      cursor={{ fill: "rgba(245,166,35,0.08)" }}
                      formatter={(v: number) => [v, "Sesi"]}
                      labelFormatter={(l) => `Jam ${l}:00`}
                    />
                    <Bar dataKey="sessions" fill={AMBER} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        </>
      )}
    </>
  );
}
