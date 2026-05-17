"use client";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const guessIcon = L.divIcon({
  html: `<div class="map-pin-guess"><div class="map-pin-pulse"></div><div class="map-pin-dot map-pin-dot--amber"></div></div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  className: "",
});

const correctIcon = L.divIcon({
  html: `<div class="map-pin-correct"><div class="map-pin-dot map-pin-dot--green"></div></div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  className: "",
});

function MapRefCapture({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) {
  mapRef.current = useMap();
  return null;
}

function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({ click: (e) => onMapClick(e.latlng.lat, e.latlng.lng) });
  return null;
}

function CursorMode({ active }: { active: boolean }) {
  const map = useMap();
  useEffect(() => {
    map.getContainer().classList.toggle("map-crosshair", active);
  }, [map, active]);
  return null;
}

function FitReveal({ guessLat, guessLng, correctLat, correctLng }: {
  guessLat: number; guessLng: number; correctLat: number; correctLng: number;
}) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(
      [[guessLat, guessLng], [correctLat, correctLng]]
    );
    map.flyToBounds(bounds, {
      paddingTopLeft: [48, 96],
      paddingBottomRight: [48, 280],
      maxZoom: 6,
      duration: 1.4,
      easeLinearity: 0.2,
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
  const mapRef = useRef<L.Map | null>(null);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={[20, 15]}
        zoom={2}
        minZoom={2}
        maxZoom={7}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        scrollWheelZoom
        doubleClickZoom
        worldCopyJump
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MapRefCapture mapRef={mapRef} />
        <CursorMode active={!!onMapClick} />
        {onMapClick && <ClickHandler onMapClick={onMapClick} />}
        {guessPin && <Marker position={[guessPin.lat, guessPin.lng]} icon={guessIcon} />}
        {revealPin && <Marker position={[revealPin.lat, revealPin.lng]} icon={correctIcon} />}
        {guessPin && revealPin && (
          <>
            <Polyline
              positions={[[guessPin.lat, guessPin.lng], [revealPin.lat, revealPin.lng]]}
              pathOptions={{ color: "#a78bfa", weight: 2, dashArray: "5 8", opacity: 0.8 }}
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

      {/* Zoom controls */}
      <div className="absolute bottom-20 right-3 z-[1000] flex flex-col gap-1">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          aria-label="Zoom in"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-950/90 backdrop-blur-md border border-white/10 text-white text-lg leading-none hover:bg-white/10 active:scale-95 transition-all shadow-xl"
        >
          +
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          aria-label="Zoom out"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-950/90 backdrop-blur-md border border-white/10 text-white text-lg leading-none hover:bg-white/10 active:scale-95 transition-all shadow-xl"
        >
          −
        </button>
      </div>
    </div>
  );
}
