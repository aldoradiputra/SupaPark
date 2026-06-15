"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import type { Location } from "@/types";
import type { MapLocation } from "./leaflet-map";

type LocationRow = Pick<
  Location,
  "id" | "name" | "city" | "address" | "latitude" | "longitude"
>;

// Leaflet touches `window`, so it must never render on the server.
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface-overlay text-sm text-faint">
      Memuat peta…
    </div>
  );
}

/**
 * Public map of active SupaPark locations. Reads from Supabase on the client
 * (RLS allows anon to read active locations), so the landing page stays static.
 */
export function LocationMap() {
  const [locations, setLocations] = useState<MapLocation[] | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("locations")
        .select("id, name, city, address, latitude, longitude")
        .eq("active", true)
        .returns<LocationRow[]>();

      if (!active) return;
      if (error) {
        setLocations([]);
        return;
      }
      setLocations(
        (data ?? [])
          .filter((l) => l.latitude != null && l.longitude != null)
          .map((l) => ({
            id: l.id,
            name: l.name,
            city: l.city,
            address: l.address,
            latitude: l.latitude as number,
            longitude: l.longitude as number,
          })),
      );
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-border">
      {locations === null ? <MapSkeleton /> : <LeafletMap locations={locations} />}
      {locations !== null && locations.length === 0 ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-border bg-surface/90 px-3 py-2 text-xs text-muted backdrop-blur">
          <MapPin size={14} className="text-amber" />
          Belum ada lokasi terdaftar — jadilah yang pertama.
        </div>
      ) : null}
    </div>
  );
}
