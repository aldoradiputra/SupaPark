"use client";

import { useState } from "react";

import { PageHeader } from "@/components/dashboard/page-header";
import {
  EmptyState,
  ErrorState,
  TableSkeleton,
} from "@/components/dashboard/states";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listProjects, updateProjectStatus } from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import { useAsync } from "@/lib/use-async";
import { formatDateTime } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types";

const STATUSES: ProjectStatus[] = [
  "planning",
  "procurement",
  "installation",
  "testing",
  "live",
  "maintenance",
  "cancelled",
];

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "">("");
  const [actionError, setActionError] = useState<string | null>(null);

  const { data, loading, error, reload } = useAsync(
    () => listProjects(createClient(), { status: statusFilter || undefined }),
    [statusFilter],
  );

  async function onStatus(project: Project, status: ProjectStatus) {
    setActionError(null);
    try {
      await updateProjectStatus(createClient(), project.id, status);
      reload();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Gagal memperbarui.");
    }
  }

  const projects = data ?? [];

  return (
    <>
      <PageHeader
        title="Projects"
        description="Pipeline deployment dari lead hingga live."
        action={
          <Select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ProjectStatus | "")
            }
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
          <TableSkeleton cols={5} />
        ) : !projects.length ? (
          <EmptyState message="Belum ada proyek." />
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Fasilitas</TH>
                <TH>Kontak</TH>
                <TH>Kota</TH>
                <TH>Target Live</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {projects.map((p) => (
                <TR key={p.id}>
                  <TD className="font-medium text-foreground">
                    {p.facility_name ?? "—"}
                  </TD>
                  <TD className="text-muted">{p.contact_name ?? "—"}</TD>
                  <TD className="text-muted">{p.city ?? "—"}</TD>
                  <TD className="text-muted">
                    {p.target_live ? formatDateTime(p.target_live) : "—"}
                  </TD>
                  <TD>
                    <Select
                      value={p.status}
                      onChange={(e) =>
                        onStatus(p, e.target.value as ProjectStatus)
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
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </Card>
    </>
  );
}
