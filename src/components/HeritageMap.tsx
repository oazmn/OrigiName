"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { OriginPin } from "@/types";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FitBounds({ pins }: { pins: OriginPin[] }) {
  const map = useMap();
  useEffect(() => {
    if (pins.length === 0) return;
    const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, pins]);
  return null;
}

export default function HeritageMap({ pins }: { pins: OriginPin[] }) {
  return (
    <MapContainer
      center={[20, 10]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
      className="rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <FitBounds pins={pins} />
      {pins.map((pin, i) => (
        <Marker key={i} position={[pin.lat, pin.lng]}>
          <Popup>
            <strong>{pin.label}</strong>
            <br />
            <span className="text-xs text-slate-500">
              {pin.associatedComponents.join(" & ")} name
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
