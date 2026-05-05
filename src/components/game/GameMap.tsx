"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const guessIcon = L.divIcon({
  html: `<div style="width:18px;height:18px;background:#f59e0b;border-radius:50%;border:2.5px solid white;box-shadow:0 0 14px rgba(245,158,11,0.9);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  className: "",
});

const correctIcon = L.divIcon({
  html: `<div style="width:18px;height:18px;background:#10b981;border-radius:50%;border:2.5px solid white;box-shadow:0 0 14px rgba(16,185,129,0.9);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  className: "",
});

function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => onMapClick(e.latlng.lat, e.latlng.lng),
  });
  return null;
}

function FitReveal({
  guessLat,
  guessLng,
  correctLat,
  correctLng,
}: {
  guessLat: number;
  guessLng: number;
  correctLat: number;
  correctLng: number;
}) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds([
      [guessLat, guessLng],
      [correctLat, correctLng],
    ]);
    map.fitBounds(bounds, {
      paddingTopLeft: [60, 60],
      paddingBottomRight: [60, 260],
    });
  }, [map, guessLat, guessLng, correctLat, correctLng]);
  return null;
}

interface GameMapProps {
  guessPin: { lat: number; lng: number } | null;
  revealPin: { lat: number; lng: number } | null;
  onMapClick?: (lat: number, lng: number) => void;
}

export default function GameMap({ guessPin, revealPin, onMapClick }: GameMapProps) {
  return (
    <MapContainer
      center={[20, 10]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {onMapClick && <ClickHandler onMapClick={onMapClick} />}
      {guessPin && <Marker position={[guessPin.lat, guessPin.lng]} icon={guessIcon} />}
      {revealPin && <Marker position={[revealPin.lat, revealPin.lng]} icon={correctIcon} />}
      {guessPin && revealPin && (
        <>
          <Polyline
            positions={[
              [guessPin.lat, guessPin.lng],
              [revealPin.lat, revealPin.lng],
            ]}
            pathOptions={{ color: "#818cf8", weight: 2, dashArray: "6 6", opacity: 0.7 }}
          />
          <FitReveal
            guessLat={guessPin.lat}
            guessLng={guessPin.lng}
            correctLat={revealPin.lat}
            correctLng={revealPin.lng}
          />
        </>
      )}
    </MapContainer>
  );
}
