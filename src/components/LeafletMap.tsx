import { memo, useEffect, useMemo } from "react";
import L, { type LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useI18n } from "../i18n";
import type { CommunityEvent, MapLocation } from "../types";

const LADYWOOD_CENTER: LatLngExpression = [52.476, -1.918];
export const CURRENT_BENCH_ID = "ladywood-bench-central";

const SVG_WHITE = 'xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"';

function markerIconHtml(type: MapLocation["type"]): string {
  switch (type) {
    case "Community Connect Bench":
      return `<svg ${SVG_WHITE}><rect x="3" y="9" width="18" height="3" rx="1"/><path d="M5 12v6"/><path d="M19 12v6"/><rect x="5" y="4" width="14" height="6" rx="1"/></svg>`;
    case "Partner Cafe":
      return `<svg ${SVG_WHITE}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><line x1="6" y1="2" x2="6" y2="5"/><line x1="10" y1="2" x2="10" y2="5"/><line x1="14" y1="2" x2="14" y2="5"/></svg>`;
    case "Local Event":
      return `<svg ${SVG_WHITE}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    case "Free Wi-Fi Point":
      return `<svg ${SVG_WHITE}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`;
    case "Digital Inclusion Centre":
      return `<svg ${SVG_WHITE}><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>`;
    case "Device Hub":
      return `<svg ${SVG_WHITE}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;
    default:
      // drop-in / digital support centre
      return `<svg ${SVG_WHITE}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  }
}

function markerClass(type: MapLocation["type"]) {
  if (type === "Community Connect Bench") return "gov-map-marker gov-map-marker--bench";
  if (type === "Partner Cafe") return "gov-map-marker gov-map-marker--cafe";
  if (type === "Digital Inclusion Centre") return "gov-map-marker gov-map-marker--digital";
  if (type === "Device Hub") return "gov-map-marker gov-map-marker--device";
  if (type === "Local Event") return "gov-map-marker gov-map-marker--event";
  return "gov-map-marker";
}

// Google Maps–style blue pulsing dot for "You are here"
const YOU_ARE_HERE_ICON_HTML = `
  <div style="position:relative;width:28px;height:28px;display:grid;place-items:center;">
    <div style="position:absolute;width:28px;height:28px;border-radius:50%;background:rgba(66,133,244,0.22);"></div>
    <div style="position:absolute;width:14px;height:14px;border-radius:50%;background:#4285F4;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.38);"></div>
  </div>
`;

// Calendar icon for event markers
const EVENT_MARKER_HTML = `<svg ${SVG_WHITE}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

function createMarkerIcon(location: MapLocation) {
  if (location.id === CURRENT_BENCH_ID) {
    return L.divIcon({
      html: YOU_ARE_HERE_ICON_HTML,
      className: "gov-map-marker gov-map-marker--current",
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -18]
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

function createEventMarkerIcon() {
  return L.divIcon({
    html: EVENT_MARKER_HTML,
    className: "gov-map-marker gov-map-marker--event",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
}

function locationPosition(location: MapLocation): LatLngExpression {
  if (location.coordinatesLatLng) {
    return [location.coordinatesLatLng.lat, location.coordinatesLatLng.lng];
  }
  if (location.coordinates) {
    const lat = 52.476 + (50 - location.coordinates.y) * 0.00055;
    const lng = -1.918 + (location.coordinates.x - 50) * 0.00075;
    return [lat, lng];
  }
  return LADYWOOD_CENTER;
}

function eventPosition(event: CommunityEvent, allLocations: MapLocation[]): LatLngExpression {
  if (event.coordinatesLatLng) {
    return [event.coordinatesLatLng.lat, event.coordinatesLatLng.lng];
  }
  if (event.locationId) {
    const loc = allLocations.find((l) => l.id === event.locationId);
    if (loc) return locationPosition(loc);
  }
  return LADYWOOD_CENTER;
}

interface ViewRequest {
  lat: number;
  lng: number;
  zoom: number;
}

function MapSelectionSync({ location }: { location: MapLocation }) {
  const map = useMap();
  useEffect(() => {
    map.panTo(locationPosition(location), { animate: true, duration: 0.35 });
  }, [location, map]);
  return null;
}

function ViewRequestHandler({
  viewRequest,
  onConsumed
}: {
  viewRequest: ViewRequest | null;
  onConsumed: () => void;
}) {
  const map = useMap();
  useEffect(() => {
    if (!viewRequest) return;
    map.setView([viewRequest.lat, viewRequest.lng], viewRequest.zoom, { animate: true });
    onConsumed();
  }, [viewRequest, map, onConsumed]);
  return null;
}

function ZoomTracker({ onZoomChange }: { onZoomChange: (z: number) => void }) {
  const map = useMapEvents({
    zoomend: () => onZoomChange(map.getZoom())
  });
  useEffect(() => {
    onZoomChange(map.getZoom());
  }, [map, onZoomChange]);
  return null;
}

interface LeafletMapProps {
  visibleLocations: MapLocation[];
  visibleEvents: CommunityEvent[];
  allLocations: MapLocation[];
  selectedLocation: MapLocation;
  onSelect: (location: MapLocation) => void;
  onMoreInfo: (location: MapLocation) => void;
  onEventSelect: (event: CommunityEvent) => void;
  currentBench: MapLocation | null;
  onZoomChange: (zoom: number) => void;
  viewRequest?: ViewRequest | null;
  onViewRequestConsumed?: () => void;
}

function LeafletMap({
  visibleLocations,
  visibleEvents,
  allLocations,
  selectedLocation,
  onSelect,
  onMoreInfo,
  onEventSelect,
  currentBench,
  onZoomChange,
  viewRequest,
  onViewRequestConsumed
}: LeafletMapProps) {
  const { t } = useI18n();

  // Always show current bench even when filtered out
  const allVisible = useMemo(() => {
    if (!currentBench) return visibleLocations;
    const alreadyIncluded = visibleLocations.some((l) => l.id === currentBench.id);
    return alreadyIncluded ? visibleLocations : [currentBench, ...visibleLocations];
  }, [visibleLocations, currentBench]);

  const markerData = useMemo(
    () => allVisible.map((location) => ({ location, position: locationPosition(location), icon: createMarkerIcon(location) })),
    [allVisible]
  );

  const eventMarkerData = useMemo(
    () => visibleEvents.map((event) => ({ event, position: eventPosition(event, allLocations), icon: createEventMarkerIcon() })),
    [visibleEvents, allLocations]
  );

  return (
    <MapContainer
      center={LADYWOOD_CENTER}
      zoom={15}
      minZoom={12}
      scrollWheelZoom
      zoomControl={true}
      className="h-full w-full"
      aria-label="Interactive map of digital support locations in Ladywood, Birmingham"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapSelectionSync location={selectedLocation} />
      <ZoomTracker onZoomChange={onZoomChange} />
      {viewRequest && onViewRequestConsumed && (
        <ViewRequestHandler viewRequest={viewRequest} onConsumed={onViewRequestConsumed} />
      )}

      {/* Location markers */}
      {markerData.map(({ location, position, icon }) => (
        <Marker
          key={location.id}
          position={position}
          icon={icon}
          eventHandlers={{ click: () => onSelect(location) }}
        >
          <Popup>
            <div className="max-w-[240px] text-sm text-ink">
              {location.id === CURRENT_BENCH_ID && (
                <p className="mb-1 font-black text-blue-700">📍 You are here</p>
              )}
              <p className="mb-1 font-bold">{location.name}</p>
              <p className="mb-2 text-slate-600">{location.type}</p>
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

      {/* Event markers */}
      {eventMarkerData.map(({ event, position, icon }) => (
        <Marker
          key={event.id}
          position={position}
          icon={icon}
          eventHandlers={{ click: () => onEventSelect(event) }}
        >
          <Popup>
            <div className="max-w-[240px] text-sm text-ink">
              <p className="mb-1 text-xs font-bold text-lagoon-700">{event.category}</p>
              <p className="mb-1 font-bold">{event.name}</p>
              <p className="mb-1 text-slate-600">{event.dateTime}</p>
              {event.stampsOffered && (
                <p className="mb-2 font-bold text-amber-700">⭐ {event.stampsCount ?? 1} stamp{(event.stampsCount ?? 1) > 1 ? "s" : ""}</p>
              )}
              <button type="button" onClick={() => onEventSelect(event)} className="govuk-link-button">
                More info
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default memo(LeafletMap);
