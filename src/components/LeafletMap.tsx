import { memo, useEffect, useMemo } from "react";
import L, { type LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useI18n } from "../i18n";
import type { MapLocation } from "../types";

const LADYWOOD_CENTER: LatLngExpression = [52.476, -1.918];
export const CURRENT_BENCH_ID = "ladywood-bench-central";

const SVG_ATTRS = 'xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"';
const SVG_WHITE = 'xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"';

function markerIconHtml(type: MapLocation["type"]): string {
  switch (type) {
    case "Community Connect Bench":
      return `<svg ${SVG_WHITE}><rect x="3" y="9" width="18" height="3" rx="1"/><path d="M5 12v6"/><path d="M19 12v6"/><rect x="5" y="4" width="14" height="6" rx="1"/></svg>`;
    case "Partner Cafe":
      return `<svg ${SVG_WHITE}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><line x1="6" y1="2" x2="6" y2="5"/><line x1="10" y1="2" x2="10" y2="5"/><line x1="14" y1="2" x2="14" y2="5"/></svg>`;
    case "Refurbishment Point":
      return `<svg ${SVG_WHITE}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
    case "Local Event":
      return `<svg ${SVG_WHITE}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    case "Free Wi-Fi Point":
      return `<svg ${SVG_WHITE}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`;
    default:
      return `<svg ${SVG_WHITE}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;
  }
}

// Special "You are here" icon for the current bench
const YOU_ARE_HERE_ICON_HTML = `
  <div style="position:relative;width:34px;height:34px;display:grid;place-items:center;">
    <svg ${SVG_ATTRS}><rect x="3" y="9" width="18" height="3" rx="1"/><path d="M5 12v6"/><path d="M19 12v6"/><rect x="5" y="4" width="14" height="6" rx="1"/></svg>
  </div>
`;

function markerClass(type: MapLocation["type"]) {
  if (type === "Community Connect Bench") return "gov-map-marker gov-map-marker--bench";
  if (type === "Partner Cafe") return "gov-map-marker gov-map-marker--cafe";
  if (type === "Refurbishment Point") return "gov-map-marker gov-map-marker--device";
  if (type === "Local Event") return "gov-map-marker gov-map-marker--event";
  return "gov-map-marker";
}

function createMarkerIcon(location: MapLocation) {
  if (location.id === CURRENT_BENCH_ID) {
    return L.divIcon({
      html: YOU_ARE_HERE_ICON_HTML,
      className: "gov-map-marker gov-map-marker--current",
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -20]
    });
  }
  return L.divIcon({
    html: markerIconHtml(location.type),
    className: markerClass(location.type),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
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

interface LeafletMapProps {
  visibleLocations: MapLocation[];
  selectedLocation: MapLocation;
  onSelect: (location: MapLocation) => void;
  onMoreInfo: (location: MapLocation) => void;
  currentBench: MapLocation | null;
}

function LeafletMap({
  visibleLocations,
  selectedLocation,
  onSelect,
  onMoreInfo,
  currentBench
}: LeafletMapProps) {
  const { t } = useI18n();

  // Merge currentBench into the visible list (always show it even when filtered out)
  const allVisible = useMemo(() => {
    if (!currentBench) return visibleLocations;
    const alreadyIncluded = visibleLocations.some((l) => l.id === currentBench.id);
    return alreadyIncluded ? visibleLocations : [currentBench, ...visibleLocations];
  }, [visibleLocations, currentBench]);

  const markerData = useMemo(
    () =>
      allVisible.map((location) => ({
        location,
        position: locationPosition(location),
        icon: createMarkerIcon(location)
      })),
    [allVisible]
  );

  return (
    <MapContainer
      center={LADYWOOD_CENTER}
      zoom={15}
      minZoom={12}
      scrollWheelZoom
      zoomControl={true}
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
              {location.id === CURRENT_BENCH_ID && (
                <p className="mb-1 font-black text-amber-700">📍 You are here</p>
              )}
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
