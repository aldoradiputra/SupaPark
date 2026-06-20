"use client";

import { useState } from "react";

import { PageHeader } from "@/components/dashboard/page-header";
import { ErrorState, NoLocation } from "@/components/dashboard/states";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import {
  getLocationById,
  getMyProfile,
  getOrgById,
  listOrgUsers,
  updateLocation,
} from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import { useAsync } from "@/lib/use-async";
import { formatRupiah } from "@/lib/utils";
import { useAppStore } from "@/store";
import type { Json } from "@/types/database.types";
import type { Location, TariffConfig, TariffTier } from "@/types";

const DEFAULT_TARIFF: TariffConfig = {
  car: { first_hour: 5000, next_hour: 3000, max_daily: 50000, grace_min: 15 },
  motorcycle: { first_hour: 2000, next_hour: 1000, max_daily: 20000, grace_min: 15 },
};

const TIER_FIELDS: { key: keyof TariffTier; label: string }[] = [
  { key: "first_hour", label: "Jam pertama" },
  { key: "next_hour", label: "Jam berikutnya" },
  { key: "max_daily", label: "Maks harian" },
  { key: "grace_min", label: "Grace (menit)" },
];

export default function SettingsPage() {
  const locationId = useAppStore((s) => s.selectedLocationId);

  const { data, loading, error, reload } = useAsync(async () => {
    const supabase = createClient();
    const profile = await getMyProfile(supabase);
    const orgId = profile?.org_id ?? null;
    const [org, users, location] = await Promise.all([
      orgId ? getOrgById(supabase, orgId) : Promise.resolve(null),
      orgId ? listOrgUsers(supabase, orgId) : Promise.resolve([]),
      locationId ? getLocationById(supabase, locationId) : Promise.resolve(null),
    ]);
    return { profile, org, users, location };
  }, [locationId]);

  if (error) {
    return (
      <>
        <PageHeader title="Settings" />
        <ErrorState message={error} onRetry={reload} />
      </>
    );
  }

  const isAdmin = data?.profile?.role === "admin";

  return (
    <>
      <PageHeader
        title="Settings"
        description="Organisasi, lokasi, tarif, dan tim."
      />

      <div className="grid gap-6">
        {/* Organization */}
        <Card>
          <CardHeader>
            <CardTitle>Organisasi</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {loading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <>
                <Field label="Nama" value={data?.org?.name} />
                <Field label="Slug" value={data?.org?.slug} mono />
              </>
            )}
          </CardContent>
        </Card>

        {/* Location + tariff */}
        <Card>
          <CardHeader>
            <CardTitle>Lokasi &amp; Tarif</CardTitle>
            <CardDescription>
              {isAdmin
                ? "Sunting detail lokasi terpilih dan tarif parkir."
                : "Hanya admin yang dapat menyunting."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-40 w-full" />
            ) : !locationId || !data?.location ? (
              <NoLocation />
            ) : isAdmin ? (
              <LocationForm
                key={data.location.id}
                location={data.location}
                onSaved={reload}
              />
            ) : (
              <LocationReadOnly location={data.location} />
            )}
          </CardContent>
        </Card>

        {/* Team */}
        <Card>
          <CardHeader>
            <CardTitle>Tim</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-3">
              {loading ? (
                <Skeleton className="h-20 w-full" />
              ) : (
                <Table>
                  <THead>
                    <TR>
                      <TH>Nama</TH>
                      <TH>Email</TH>
                      <TH>Peran</TH>
                      <TH>Status</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {(data?.users ?? []).map((u) => (
                      <TR key={u.id}>
                        <TD className="text-foreground">{u.name ?? "—"}</TD>
                        <TD className="text-muted">{u.email ?? "—"}</TD>
                        <TD className="capitalize text-muted">{u.role}</TD>
                        <TD>
                          <StatusBadge value={u.active ? "active" : "disabled"} />
                        </TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value?: string | null;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="text-xs font-medium text-faint">{label}</div>
      <div className={`text-sm text-foreground ${mono ? "font-mono" : ""}`}>
        {value ?? "—"}
      </div>
    </div>
  );
}

function LocationReadOnly({ location }: { location: Location }) {
  const tariff =
    (location.tariff_config as unknown as TariffConfig) ?? DEFAULT_TARIFF;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Nama" value={location.name} />
      <Field label="Kota" value={location.city} />
      <Field label="Kapasitas Mobil" value={String(location.capacity_car)} />
      <Field label="Kapasitas Motor" value={String(location.capacity_moto)} />
      <Field
        label="Tarif Mobil (jam pertama)"
        value={formatRupiah(tariff.car?.first_hour)}
      />
      <Field
        label="Tarif Motor (jam pertama)"
        value={formatRupiah(tariff.motorcycle?.first_hour)}
      />
    </div>
  );
}

function LocationForm({
  location,
  onSaved,
}: {
  location: Location;
  onSaved: () => void;
}) {
  const initialTariff =
    (location.tariff_config as unknown as TariffConfig) ?? DEFAULT_TARIFF;
  const [name, setName] = useState(location.name);
  const [address, setAddress] = useState(location.address ?? "");
  const [city, setCity] = useState(location.city ?? "");
  const [capCar, setCapCar] = useState(location.capacity_car);
  const [capMoto, setCapMoto] = useState(location.capacity_moto);
  const [tariff, setTariff] = useState<TariffConfig>({
    car: { ...DEFAULT_TARIFF.car, ...initialTariff.car },
    motorcycle: { ...DEFAULT_TARIFF.motorcycle, ...initialTariff.motorcycle },
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function setTier(type: keyof TariffConfig, key: keyof TariffTier, value: number) {
    setTariff((t) => ({ ...t, [type]: { ...t[type], [key]: value } }));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await updateLocation(createClient(), location.id, {
        name,
        address: address || null,
        city: city || null,
        capacity_car: capCar,
        capacity_moto: capMoto,
        tariff_config: tariff as unknown as Json,
      });
      setMsg({ ok: true, text: "Tersimpan." });
      onSaved();
    } catch (err) {
      setMsg({
        ok: false,
        text: err instanceof Error ? err.message : "Gagal menyimpan.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSave}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Labeled label="Nama">
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </Labeled>
        <Labeled label="Kota">
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </Labeled>
        <Labeled label="Alamat" full>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </Labeled>
        <Labeled label="Kapasitas Mobil">
          <Input
            type="number"
            value={capCar}
            onChange={(e) => setCapCar(Number(e.target.value))}
          />
        </Labeled>
        <Labeled label="Kapasitas Motor">
          <Input
            type="number"
            value={capMoto}
            onChange={(e) => setCapMoto(Number(e.target.value))}
          />
        </Labeled>
      </div>

      {(["car", "motorcycle"] as const).map((type) => (
        <div key={type}>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-label text-faint">
            Tarif {type === "car" ? "Mobil" : "Motor"} (IDR)
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {TIER_FIELDS.map((f) => (
              <Labeled key={f.key} label={f.label}>
                <Input
                  type="number"
                  value={tariff[type][f.key]}
                  onChange={(e) => setTier(type, f.key, Number(e.target.value))}
                />
              </Labeled>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3">
        <Button type="submit" size="sm" disabled={saving}>
          {saving ? "Menyimpan…" : "Simpan Perubahan"}
        </Button>
        {msg ? (
          <span className={`text-sm ${msg.ok ? "text-success" : "text-error"}`}>
            {msg.text}
          </span>
        ) : null}
      </div>
    </form>
  );
}

function Labeled({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <label className="text-xs font-medium text-muted">{label}</label>
      {children}
    </div>
  );
}
