"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState, ErrorState } from "@/components/dashboard/states";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjectById, updateProjectStatus } from "@/lib/queries";
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

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [actionError, setActionError] = useState<string | null>(null);

  const { data, loading, error, reload } = useAsync(
    () => getProjectById(createClient(), params.id),
    [params.id],
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

  const project = data;

  return (
    <>
      <Link
        href="/projects"
        className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft size={15} />
        Projects
      </Link>

      {error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : loading ? (
        <Skeleton className="h-64 w-full" />
      ) : !project ? (
        <EmptyState message="Proyek tidak ditemukan." />
      ) : (
        <>
          <PageHeader
            title={project.facility_name ?? "Proyek"}
            description={project.city ?? undefined}
            action={
              <Select
                value={project.status}
                onChange={(e) =>
                  onStatus(project, e.target.value as ProjectStatus)
                }
                className="h-9 w-auto capitalize"
              >
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

          <Card>
            <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
              <Detail label="Kontak" value={project.contact_name} />
              <Detail label="Email" value={project.contact_email} />
              <Detail label="No. HP" value={project.contact_phone} />
              <Detail label="Kota" value={project.city} />
              <Detail label="Alamat" value={project.address} full />
              <Detail label="Jalur Masuk" value={numOrNull(project.entry_lanes)} />
              <Detail label="Jalur Keluar" value={numOrNull(project.exit_lanes)} />
              <Detail
                label="Mulai"
                value={project.start_date ? formatDateTime(project.start_date) : null}
              />
              <Detail
                label="Target Live"
                value={project.target_live ? formatDateTime(project.target_live) : null}
              />
              <Detail
                label="Live Aktual"
                value={project.actual_live ? formatDateTime(project.actual_live) : null}
              />
              <Detail label="Catatan" value={project.notes} full />
              {project.lead_id ? (
                <div className="sm:col-span-2">
                  <Link
                    href={`/leads/${project.lead_id}`}
                    className="text-sm text-amber hover:underline"
                  >
                    ← Lihat lead asal
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
