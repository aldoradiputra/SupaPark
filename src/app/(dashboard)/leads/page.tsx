"use client";

import { useState } from "react";
import Link from "next/link";

import { PageHeader } from "@/components/dashboard/page-header";
import {
  EmptyState,
  ErrorState,
  TableSkeleton,
} from "@/components/dashboard/states";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { convertLead, listLeads, updateLeadStatus } from "@/lib/queries";
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

export default function LeadsPage() {
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "">("");
  const [actionError, setActionError] = useState<string | null>(null);

  const { data, loading, error, reload } = useAsync(
    () => listLeads(createClient(), { status: statusFilter || undefined }),
    [statusFilter],
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

  const leads = data ?? [];

  return (
    <>
      <PageHeader
        title="Leads"
        description="Funnel onboarding masuk."
        action={
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "")}
            className="w-auto"
          >
            <option value="">Semua status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </Select>
        }
      />

      {actionError ? (
        <p className="mb-3 text-sm text-error">{actionError}</p>
      ) : null}

      <Card className="p-3">
        {error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : loading ? (
          <TableSkeleton cols={6} />
        ) : !leads.length ? (
          <EmptyState message="Belum ada lead." />
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Fasilitas</TH>
                <TH>Kontak</TH>
                <TH>Sumber</TH>
                <TH>Masuk</TH>
                <TH>Status</TH>
                <TH className="text-right">Aksi</TH>
              </TR>
            </THead>
            <TBody>
              {leads.map((lead) => (
                <TR key={lead.id}>
                  <TD className="font-medium text-foreground">
                    <Link href={`/leads/${lead.id}`} className="hover:text-amber">
                      {lead.facility_name ?? "—"}
                    </Link>
                    {lead.city ? (
                      <span className="block text-xs text-faint">
                        {lead.city}
                      </span>
                    ) : null}
                  </TD>
                  <TD className="text-muted">
                    {lead.name ?? "—"}
                    {lead.email ? (
                      <span className="block text-xs text-faint">
                        {lead.email}
                      </span>
                    ) : null}
                  </TD>
                  <TD className="capitalize text-muted">{lead.source}</TD>
                  <TD className="text-muted">{formatDateTime(lead.created_at)}</TD>
                  <TD>
                    <Select
                      value={lead.status}
                      onChange={(e) =>
                        onStatus(lead, e.target.value as LeadStatus)
                      }
                      className="h-8 w-auto capitalize"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="capitalize">
                          {s}
                        </option>
                      ))}
                    </Select>
                  </TD>
                  <TD className="text-right">
                    <Button
                      size="sm"
                      disabled={lead.status === "converted" || !!lead.project_id}
                      onClick={() => onConvert(lead)}
                    >
                      {lead.project_id ? "Terkonversi" : "Konversi"}
                    </Button>
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
