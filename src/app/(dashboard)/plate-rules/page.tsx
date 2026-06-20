"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

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
import { createPlateRule, deletePlateRule, listPlateRules } from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import { useAsync } from "@/lib/use-async";
import { formatDateTime } from "@/lib/utils";
import { useAppStore } from "@/store";
import type { PlateRule, PlateRuleType } from "@/types";

const RULE_TYPES: PlateRuleType[] = ["whitelist", "blacklist", "vip"];
const EMPTY = { plate: "", rule_type: "vip" as PlateRuleType, reason: "" };

export default function PlateRulesPage() {
  const locationId = useAppStore((s) => s.selectedLocationId);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { data, loading, error, reload } = useAsync(async () => {
    if (!locationId) return null;
    return listPlateRules(createClient(), locationId);
  }, [locationId]);

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!locationId) return;
    setSaving(true);
    setFormError(null);
    try {
      await createPlateRule(createClient(), {
        location_id: locationId,
        plate: form.plate,
        rule_type: form.rule_type,
        reason: form.reason || null,
      });
      setForm(EMPTY);
      setShowForm(false);
      reload();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(rule: PlateRule) {
    await deletePlateRule(createClient(), rule.id);
    reload();
  }

  if (!locationId) {
    return (
      <>
        <PageHeader title="Plate Rules" />
        <NoLocation />
      </>
    );
  }

  const rules = data ?? [];

  return (
    <>
      <PageHeader
        title="Plate Rules"
        description="Whitelist, blacklist, dan VIP per lokasi."
        action={
          <Button size="sm" onClick={() => setShowForm((v) => !v)}>
            <Plus size={16} />
            Tambah Aturan
          </Button>
        }
      />

      {showForm ? (
        <Card className="mb-4 p-4">
          <form className="grid gap-3 sm:grid-cols-3" onSubmit={onAdd}>
            <Input
              required
              placeholder="Plat (cth. B 1 SUPA)"
              value={form.plate}
              onChange={(e) => setForm({ ...form, plate: e.target.value })}
            />
            <Select
              value={form.rule_type}
              onChange={(e) =>
                setForm({ ...form, rule_type: e.target.value as PlateRuleType })
              }
            >
              {RULE_TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">
                  {t}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Alasan (opsional)"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
            />
            {formError ? (
              <p className="text-sm text-error sm:col-span-3">{formError}</p>
            ) : null}
            <div className="flex gap-2 sm:col-span-3">
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
          <TableSkeleton cols={4} />
        ) : !rules.length ? (
          <EmptyState message="Belum ada aturan plat." />
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Plat</TH>
                <TH>Tipe</TH>
                <TH>Alasan</TH>
                <TH>Dibuat</TH>
                <TH className="text-right">Aksi</TH>
              </TR>
            </THead>
            <TBody>
              {rules.map((r) => (
                <TR key={r.id}>
                  <TD className="plate text-sm">{r.plate}</TD>
                  <TD>
                    <StatusBadge value={r.rule_type} />
                  </TD>
                  <TD className="text-muted">{r.reason ?? "—"}</TD>
                  <TD className="text-muted">{formatDateTime(r.created_at)}</TD>
                  <TD className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(r)}
                      aria-label="Hapus"
                    >
                      <Trash2 size={15} className="text-error" />
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
