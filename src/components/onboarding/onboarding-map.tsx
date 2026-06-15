"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { createClient } from "@/lib/supabase/client";
import type { Location } from "@/types";
import type { ExistingLoc } from "./onboarding-leaflet";

function MapSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface-overlay text-sm text-faint">
      Memuat peta…
    </div>
  );
}

const OnboardingLeaflet = dynamic(() => import("./onboarding-leaflet"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

type LocationRow = Pick<Location, "id" | "name" | "latitude" | "longitude">;

export interface PickedPoint {
  lat: number;
  lng: number;
  address?: string;
}

/**
 * Interactive map: existing SupaPark locations (blue), click to drop an amber
 * pin (captures lat/lng) and reverse-geocode the address via Nominatim.
 */
export function OnboardingMap({
  value,
  onPick,
}: {
  value: { lat: number; lng: number } | null;
  onPick: (point: PickedPoint) => void;
}) {
  const [existing, setExisting] = useState<ExistingLoc[]>([]);
  const [geocoding, setGeocoding] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("locations")
        .select("id, name, latitude, longitude")
        .eq("active", true)
        .returns<LocationRow[]>();
      if (!active || !data) return;
      setExisting(
        data
          .filter((l) => l.latitude != null && l.longitude != null)
          .map((l) => ({
            id: l.id,
            name: l.name,
            latitude: l.latitude as number,
            longitude: l.longitude as number,
          })),
      );
    })();
    return () => {
      active = false;
    };
  }, []);

  async function handleClick(lat: number, lng: number) {
    onPick({ lat, lng }); // drop the pin immediately
    setGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=id`,
        { headers: { Accept: "application/json" } },
      );
      if (res.ok) {
        const json: { display_name?: string } = await res.json();
        onPick({ lat, lng, address: json.display_name });
      }
    } catch {
      // reverse geocode is best-effort; the pin coords are already captured
    } finally {
      setGeocoding(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="h-[320px] w-full overflow-hidden rounded-xl border border-border">
        <OnboardingLeaflet
          existing={existing}
          selected={value}
          onMapClick={handleClick}
        />
      </div>
      <p className="text-xs text-faint">
        {geocoding
          ? "Mencari alamat…"
          : "Klik peta untuk menandai lokasi fasilitas Anda."}
      </p>
    </div>
  );
}
