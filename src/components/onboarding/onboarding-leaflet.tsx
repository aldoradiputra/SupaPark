"use client";

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

export interface ExistingLoc {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const INDONESIA: [number, number] = [-2.5, 118];

function pin(color: string, size: number) {
  return L.divIcon({
    className: "supapark-pin",
    html: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="#0A0A0A" stroke-width="1.5" stroke-linejoin="round">
      <path d="M12 22s-7-6-7-12a7 7 0 1 1 14 0c0 6-7 12-7 12z"/>
      <circle cx="12" cy="10" r="2.4" fill="#0A0A0A" stroke="none"/>
    </svg>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 2],
  });
}

const blueIcon = pin("#3B82F6", 24);
const amberIcon = pin("#F5A623", 30);

function ClickCapture({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function OnboardingLeaflet({
  existing,
  selected,
  onMapClick,
}: {
  existing: ExistingLoc[];
  selected: { lat: number; lng: number } | null;
  onMapClick: (lat: number, lng: number) => void;
}) {
  return (
    <MapContainer
      center={selected ? [selected.lat, selected.lng] : INDONESIA}
      zoom={selected ? 14 : 5}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", background: "#0A0A0A" }}
    >
      <TileLayer
        url="https://{s}.basemap.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {existing.map((l) => (
        <Marker key={l.id} position={[l.latitude, l.longitude]} icon={blueIcon}>
          <Popup>{l.name}</Popup>
        </Marker>
      ))}
      {selected ? (
        <Marker position={[selected.lat, selected.lng]} icon={amberIcon} />
      ) : null}
      <ClickCapture onMapClick={onMapClick} />
    </MapContainer>
  );
}
