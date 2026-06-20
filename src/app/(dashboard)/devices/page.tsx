"use client";

import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

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
import { listLanes } from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import { useAsync } from "@/lib/use-async";
import { useRealtime } from "@/lib/use-realtime";
import { formatDateTime } from "@/lib/utils";
import { useAppStore } from "@/store";

// A lane is "stale" if we haven't heard from it in 2 minutes.
const STALE_MS = 2 * 60 * 1000;

function liveness(lastHeartbeat: string | null): string {
  if (!lastHeartbeat) return "offline";
  return Date.now() - new Date(lastHeartbeat).getTime() < STALE_MS
    ? "online"
    : "offline";
}

export default function DevicesPage() {
  const locationId = useAppStore((s) => s.selectedLocationId);

  const { data, loading, error, reload } = useAsync(async () => {
    if (!locationId) return null;
    return listLanes(createClient(), locationId);
  }, [locationId]);

  useRealtime({
    table: "lanes",
    filter: locationId ? `location_id=eq.${locationId}` : undefined,
    enabled: !!locationId,
    onChange: () => reload(),
  });

  if (!locationId) {
    return (
      <>
        <PageHeader title="Devices" />
        <NoLocation />
      </>
    );
  }

  const lanes = data ?? [];

  return (
    <>
      <PageHeader
        title="Devices"
        description="Status perangkat jalur dan heartbeat."
      />

      <Card className="p-3">
        {error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : loading ? (
          <TableSkeleton cols={4} />
        ) : !lanes.length ? (
          <EmptyState message="Belum ada jalur terdaftar." />
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Jalur</TH>
                <TH>Tipe</TH>
                <TH>Status</TH>
                <TH>Liveness</TH>
                <TH>Heartbeat Terakhir</TH>
              </TR>
            </THead>
            <TBody>
              {lanes.map((lane) => (
                <TR key={lane.id}>
                  <TD className="font-medium text-foreground">{lane.name}</TD>
                  <TD className="text-muted">
                    <span className="inline-flex items-center gap-1.5 capitalize">
                      {lane.lane_type === "exit" ? (
                        <ArrowUpFromLine size={14} className="text-faint" />
                      ) : (
                        <ArrowDownToLine size={14} className="text-faint" />
                      )}
                      {lane.lane_type}
                    </span>
                  </TD>
                  <TD>
                    <StatusBadge value={lane.status} />
                  </TD>
                  <TD>
                    <StatusBadge value={liveness(lane.last_heartbeat)} />
                  </TD>
                  <TD className="text-muted">
                    {formatDateTime(lane.last_heartbeat)}
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </Card>
    </>
  );
}
