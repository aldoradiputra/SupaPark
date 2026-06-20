"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState, ErrorState } from "@/components/dashboard/states";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { convertLead, getLeadById, updateLeadStatus } from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import { useAsync } from "@/lib/use-async";
import { formatDateTime } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/types";

const STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "lost",
];

export default function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [actionError, setActionError] = useState<string | null>(null);

  const { data, loading, error, reload } = useAsync(
    () => getLeadById(createClient(), params.id),
    [params.id],
  );

  async function onStatus(lead: Lead, status: LeadStatus) {
    setActionError(null);
    try {
      await updateLeadStatus(createClient(), lead.id, status);
      reload();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Gagal memperbarui.");
    }
  }

  async function onConvert(lead: Lead) {
    setActionError(null);
    try {
      await convertLead(createClient(), lead);
      reload();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Gagal konversi.");
    }
  }

  const lead = data;

  return (
    <>
      <Link
        href="/leads"
        className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft size={15} />
        Leads
      </Link>

      {error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : loading ? (
        <Skeleton className="h-64 w-full" />
      ) : !lead ? (
        <EmptyState message="Lead tidak ditemukan." />
      ) : (
        <>
          <PageHeader
            title={lead.facility_name ?? "Lead"}
            description={lead.city ?? undefined}
            action={
              <div className="flex items-center gap-2">
                <Select
                  value={lead.status}
                  onChange={(e) => onStatus(lead, e.target.value as LeadStatus)}
                  className="h-9 w-auto capitalize"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s} className="capitalize">
                      {s}
                    </option>
                  ))}
                </Select>
                <Button
                  size="sm"
                  disabled={lead.status === "converted" || !!lead.project_id}
                  onClick={() => onConvert(lead)}
                >
                  {lead.project_id ? "Terkonversi" : "Konversi"}
                </Button>
              </div>
            }
          />

          {actionError ? (
            <p className="mb-3 text-sm text-error">{actionError}</p>
          ) : null}

          <Card>
            <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
              <Detail label="Nama Kontak" value={lead.name} />
              <Detail label="Email" value={lead.email} />
              <Detail label="No. HP" value={lead.phone} />
              <Detail label="Sumber" value={lead.source} />
              <Detail label="Alamat" value={lead.address} full />
              <Detail label="Jalur Masuk" value={numOrNull(lead.entry_lanes)} />
              <Detail label="Jalur Keluar" value={numOrNull(lead.exit_lanes)} />
              <Detail label="Sistem Saat Ini" value={lead.current_system} />
              <Detail label="Volume Harian" value={numOrNull(lead.daily_volume)} />
              <Detail
                label="Tanggal Demo"
                value={lead.preferred_date ?? null}
              />
              <Detail
                label="Onboarded"
                value={lead.onboarded_at ? formatDateTime(lead.onboarded_at) : null}
              />
              <Detail
                label="Converted"
                value={lead.converted_at ? formatDateTime(lead.converted_at) : null}
              />
              <Detail label="Catatan" value={lead.notes} full />
              {lead.project_id ? (
                <div className="sm:col-span-2">
                  <Link
                    href={`/projects/${lead.project_id}`}
                    className="text-sm text-amber hover:underline"
                  >
                    Lihat proyek →
                  </Link>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}

function numOrNull(n: number | null): string | null {
  return n == null ? null : String(n);
}

function Detail({
  label,
  value,
  full,
}: {
  label: string;
  value: string | null | undefined;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <div className="text-xs font-medium text-faint">{label}</div>
      <div className="text-sm text-foreground">{value ?? "—"}</div>
    </div>
  );
}
