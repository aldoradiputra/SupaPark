"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import {
  EmptyState,
  ErrorState,
  NoLocation,
  TableSkeleton,
} from "@/components/dashboard/states";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { createMember, listMembers, setMemberActive } from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import { useAsync } from "@/lib/use-async";
import { formatDateTime } from "@/lib/utils";
import { useAppStore } from "@/store";
import type { Member, VehicleType } from "@/types";

const EMPTY = {
  plate: "",
  name: "",
  phone: "",
  vehicle_type: "car" as VehicleType,
  valid_from: "",
  valid_until: "",
};

export default function MembersPage() {
  const locationId = useAppStore((s) => s.selectedLocationId);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { data, loading, error, reload } = useAsync(async () => {
    if (!locationId) return null;
    return listMembers(createClient(), { locationId });
  }, [locationId]);

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!locationId) return;
    setSaving(true);
    setFormError(null);
    try {
      await createMember(createClient(), {
        location_id: locationId,
        plate: form.plate,
        name: form.name || null,
        phone: form.phone || null,
        vehicle_type: form.vehicle_type,
        valid_from: form.valid_from || null,
        valid_until: form.valid_until || null,
        active: true,
      });
      setForm(EMPTY);
      setShowForm(false);
      reload();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Gagal menyimpan member.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(m: Member) {
    await setMemberActive(createClient(), m.id, !m.active);
    reload();
  }

  if (!locationId) {
    return (
      <>
        <PageHeader title="Members" />
        <NoLocation />
      </>
    );
  }

  const members = data ?? [];

  return (
    <>
      <PageHeader
        title="Members"
        description="Keanggotaan per lokasi."
        action={
          <Button onClick={() => setShowForm((v) => !v)} size="sm">
            <Plus size={16} />
            Tambah Member
          </Button>
        }
      />

      {showForm ? (
        <Card className="mb-4 p-4">
          <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" onSubmit={onAdd}>
            <Input
              required
              placeholder="Plat (cth. B 1234 ABC)"
              value={form.plate}
              onChange={(e) => setForm({ ...form, plate: e.target.value })}
            />
            <Input
              placeholder="Nama"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="No. HP"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Select
              value={form.vehicle_type}
              onChange={(e) =>
                setForm({ ...form, vehicle_type: e.target.value as VehicleType })
              }
            >
              <option value="car">Mobil</option>
              <option value="motorcycle">Motor</option>
            </Select>
            <Input
              type="date"
              value={form.valid_from}
              onChange={(e) => setForm({ ...form, valid_from: e.target.value })}
              aria-label="Berlaku dari"
            />
            <Input
              type="date"
              value={form.valid_until}
              onChange={(e) => setForm({ ...form, valid_until: e.target.value })}
              aria-label="Berlaku sampai"
            />
            {formError ? (
              <p className="text-sm text-error sm:col-span-2 lg:col-span-3">
                {formError}
              </p>
            ) : null}
            <div className="flex gap-2 sm:col-span-2 lg:col-span-3">
              <Button type="submit" size="sm" disabled={saving}>
                {saving ? "Menyimpan…" : "Simpan"}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setShowForm(false)}
              >
                Batal
              </Button>
            </div>
          </form>
        </Card>
      ) : null}

      <Card className="p-3">
        {error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : loading ? (
          <TableSkeleton cols={5} />
        ) : !members.length ? (
          <EmptyState message="Belum ada member." />
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Plat</TH>
                <TH>Nama</TH>
                <TH>No. HP</TH>
                <TH>Berlaku s/d</TH>
                <TH>Status</TH>
                <TH className="text-right">Aksi</TH>
              </TR>
            </THead>
            <TBody>
              {members.map((m) => (
                <TR key={m.id}>
                  <TD className="plate text-sm">{m.plate}</TD>
                  <TD className="text-muted">{m.name ?? "—"}</TD>
                  <TD className="text-muted">{m.phone ?? "—"}</TD>
                  <TD className="text-muted">
                    {m.valid_until ? formatDateTime(m.valid_until) : "—"}
                  </TD>
                  <TD>
                    <StatusBadge value={m.active ? "active" : "disabled"} />
                  </TD>
                  <TD className="text-right">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => toggleActive(m)}
                    >
                      {m.active ? "Nonaktifkan" : "Aktifkan"}
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
