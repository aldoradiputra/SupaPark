"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

export interface MapLocation {
  id: string;
  name: string;
  city: string | null;
  address: string | null;
  latitude: number;
  longitude: number;
}

// Amber teardrop pin — avoids Leaflet's broken default marker assets entirely.
const pinIcon = L.divIcon({
  className: "supapark-pin",
  html: `<svg width="28" height="28" viewBox="0 0 24 24" fill="#F5A623" stroke="#0A0A0A" stroke-width="1.5" stroke-linejoin="round">
    <path d="M12 22s-7-6-7-12a7 7 0 1 1 14 0c0 6-7 12-7 12z"/>
    <circle cx="12" cy="10" r="2.4" fill="#0A0A0A" stroke="none"/>
  </svg>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -26],
});

// Center of Indonesia — used when there are no markers yet.
const INDONESIA: [number, number] = [-2.5, 118];

function FitToMarkers({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      map.fitBounds(points, { padding: [48, 48], maxZoom: 13 });
    }
  }, [map, points]);
  return null;
}

export default function LeafletMap({
  locations,
}: {
  locations: MapLocation[];
}) {
  const points = locations.map(
    (l) => [l.latitude, l.longitude] as [number, number],
  );

  return (
    <MapContainer
      center={points[0] ?? INDONESIA}
      zoom={points.length ? 11 : 5}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", background: "#0A0A0A" }}
    >
      <TileLayer
        url="https://{s}.basemap.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {locations.map((l) => (
        <Marker key={l.id} position={[l.latitude, l.longitude]} icon={pinIcon}>
          <Popup>
            <strong>{l.name}</strong>
            {l.city ? <div>{l.city}</div> : null}
            {l.address ? <div>{l.address}</div> : null}
          </Popup>
        </Marker>
      ))}
      {points.length > 1 ? <FitToMarkers points={points} /> : null}
    </MapContainer>
  );
}
