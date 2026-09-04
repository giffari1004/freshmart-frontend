"use client";

// import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet icon assets in Next.js
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LocationPickerProps {
  latitude: number | null;
  longitude: number | null;
  onChange: (lat: number, lng: number) => void;
}

function MapClickHandler({
  onChange,
}: {
  onChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LocationPicker({
  latitude,
  longitude,
  onChange,
}: LocationPickerProps) {
  const defaultCenter: [number, number] = [-6.2088, 106.8456];
  const center: [number, number] =
    latitude && longitude ? [latitude, longitude] : defaultCenter;

  const hasCoordinates = latitude !== null && longitude !== null;

  return (
    <div className="relative h-60 w-full overflow-hidden rounded-lg border">
      <MapContainer
        center={center}
        zoom={12}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onChange={onChange} />
        {hasCoordinates && <Marker position={[latitude, longitude]} />}
      </MapContainer>

      {!hasCoordinates && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="flex flex-col items-center rounded-xl bg-background/90 px-6 py-4 shadow-lg backdrop-blur">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <p className="text-sm font-bold text-foreground">
              Set Location Pin
            </p>
            <p className="text-xs text-muted-foreground">
              Click on the map to set the store exact location
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
