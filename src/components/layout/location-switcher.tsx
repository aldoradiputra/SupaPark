"use client";

import { useEffect } from "react";
import { MapPin } from "lucide-react";

import { listMyOrgLocations } from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import { useAsync } from "@/lib/use-async";
import { useAppStore } from "@/store";

export function LocationSwitcher() {
  const selected = useAppStore((s) => s.selectedLocationId);
  const setSelected = useAppStore((s) => s.setSelectedLocationId);

  const { data: locations, loading } = useAsync(
    () => listMyOrgLocations(createClient()),
    [],
  );

  // Default to the first location once loaded (or if the saved one is gone).
  useEffect(() => {
    if (!locations || locations.length === 0) return;
    const stillValid = selected && locations.some((l) => l.id === selected);
    if (!stillValid) setSelected(locations[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-overlay px-3">
      <MapPin size={15} className="shrink-0 text-amber" />
      <select
        value={selected ?? ""}
        onChange={(e) => setSelected(e.target.value || null)}
        disabled={loading || !locations?.length}
        className="h-9 w-full bg-transparent text-[13px] text-foreground focus:outline-none disabled:opacity-60"
        aria-label="Pilih lokasi"
      >
        {loading ? <option value="">Memuat…</option> : null}
        {!loading && !locations?.length ? (
          <option value="">Belum ada lokasi</option>
        ) : null}
        {locations?.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
