import { memo, useEffect, useMemo } from "react";
import L, { type LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useI18n } from "../i18n";
import type { MapLocation } from "../types";

const LADYWOOD_CENTER: LatLngExpression = [52.476, -1.918];

interface LeafletMapProps {
  visibleLocations: MapLocation[];
  selectedLocation: MapLocation;
  onSelect: (location: MapLocation) => void;
  onMoreInfo: (location: MapLocation) => void;
}

function markerClass(type: MapLocation["type"]) {
  if (type === "Community Connect Bench") return "gov-map-marker gov-map-marker--bench";
  if (type === "Partner Cafe") return "gov-map-marker gov-map-marker--cafe";
  if (type === "Refurbishment Point") return "gov-map-marker gov-map-marker--device";
  if (type === "Local Event") return "gov-map-marker gov-map-marker--event";
  return "gov-map-marker";
}

function markerLabel(type: MapLocation["type"]) {
  if (type === "Community Connect Bench") return "B";
  if (type === "Partner Cafe") return "C";
  if (type === "Refurbishment Point") return "D";
  if (type === "Local Event") return "E";
  if (type === "Free Wi-Fi Point") return "W";
  return "S";
}

function createMarkerIcon(location: MapLocation) {
  return L.divIcon({
    html: `<span aria-hidden="true">${markerLabel(location.type)}</span>`,
    className: markerClass(location.type),
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16]
  });
}

function locationPosition(location: MapLocation): LatLngExpression {
  if (location.coordinatesLatLng) {
    return [location.coordinatesLatLng.lat, location.coordinatesLatLng.lng];
  }
  const lat = 52.476 + (50 - location.coordinates.y) * 0.00055;
  const lng = -1.918 + (location.coordinates.x - 50) * 0.00075;
  return [lat, lng];
}

function MapSelectionSync({ location }: { location: MapLocation }) {
  const map = useMap();

  useEffect(() => {
    map.panTo(locationPosition(location), { animate: true, duration: 0.35 });
  }, [location, map]);

  return null;
}

function LeafletMap({
  visibleLocations,
  selectedLocation,
  onSelect,
  onMoreInfo
}: LeafletMapProps) {
  const { t } = useI18n();
  const markerData = useMemo(
    () =>
      visibleLocations.map((location) => ({
        location,
        position: locationPosition(location),
        icon: createMarkerIcon(location)
      })),
    [visibleLocations]
  );

  return (
    <MapContainer
      center={LADYWOOD_CENTER}
      zoom={15}
      minZoom={12}
      scrollWheelZoom
      className="h-full w-full"
      aria-label="Interactive map centered on Ladywood, Birmingham"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapSelectionSync location={selectedLocation} />
      {markerData.map(({ location, position, icon }) => (
        <Marker
          key={location.id}
          position={position}
          icon={icon}
          eventHandlers={{
            click: () => onSelect(location)
          }}
        >
          <Popup>
            <div className="max-w-[240px] text-sm text-ink">
              <p className="mb-1 font-bold">{location.name}</p>
              <p className="mb-2">{location.type}</p>
              <p className="mb-2">
                <strong>{t("common.distance")}:</strong> {location.distance}
              </p>
              <button type="button" onClick={() => onMoreInfo(location)} className="govuk-link-button">
                {t("common.moreInfo")}
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default memo(LeafletMap);
