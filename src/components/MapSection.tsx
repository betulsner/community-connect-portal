import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bell, BellOff, Building2, CalendarDays, Check, Clock, Hand,
  MapPin, Navigation, Route, Stamp, Wifi, Laptop
} from "lucide-react";
import { events } from "../data/events";
import { locations } from "../data/locations";
import { useI18n } from "../i18n";
import type { CommunityEvent, LocationTag, MapLocation, PortalUser } from "../types";
import LocationCard from "./LocationCard";
import Modal from "./Modal";

const LeafletMap = lazy(() => import("./LeafletMap"));
const CURRENT_BENCH_ID = "ladywood-bench-central";

// ── Filter definitions ───────────────────────────────────────────────────────
const typeFilters: Array<{ tag: LocationTag | "events"; label: string; icon: React.ElementType }> = [
  { tag: "bench",             label: "Benches",                  icon: MapPin },
  { tag: "drop-in",           label: "Drop-in places",           icon: Hand },
  { tag: "digital-inclusion", label: "Digital inclusion centres",icon: Building2 },
  { tag: "events",            label: "Events",                   icon: CalendarDays },
];

const featureFilters: Array<{ tag: LocationTag; label: string; icon: React.ElementType }> = [
  { tag: "stamps-offered",   label: "Stamps offered",   icon: Stamp },
  { tag: "walking-distance", label: "Walking distance", icon: Route },
  { tag: "wifi",             label: "Free Wi-Fi",       icon: Wifi },
  { tag: "open-today",       label: "Open today",       icon: Check },
];

const categoryColour: Record<string, string> = {
  "Digital help":     "bg-lagoon-50 text-lagoon-700",
  "Digital skills":   "bg-lagoon-50 text-lagoon-700",
  "Jobs":             "bg-sun-100 text-ink",
  "Connection":       "bg-green-50 text-green-800",
  "Community":        "bg-green-50 text-green-800",
  "Device support":   "bg-red-50 text-red-800",
  "Volunteering":     "bg-purple-50 text-purple-800",
  "Language support": "bg-orange-50 text-orange-800"
};

function googleDirectionsUrl(location: MapLocation) {
  const destination = location.coordinatesLatLng
    ? `${location.coordinatesLatLng.lat},${location.coordinatesLatLng.lng}`
    : location.address;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

interface MapSectionProps {
  onAddReminder: (event: CommunityEvent) => void;
  onRemoveReminder: (eventId: string) => void;
  reminders: CommunityEvent[];
  user?: PortalUser | null;
  preselectId?: string | null;
  onPreselectConsumed?: () => void;
}

export default function MapSection({
  onAddReminder, onRemoveReminder, reminders, user, preselectId, onPreselectConsumed
}: MapSectionProps) {
  const { t } = useI18n();
  const mapRef = useRef<HTMLDivElement>(null);
  const allLocations = useMemo(() => locations, []);
  const currentBench = useMemo(() => allLocations.find((l) => l.id === CURRENT_BENCH_ID) ?? null, [allLocations]);

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [debouncedFilters, setDebouncedFilters] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState(CURRENT_BENCH_ID);
  const [notice, setNotice] = useState("");
  const [detailsLocation, setDetailsLocation] = useState<MapLocation | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [sidebarEvent, setSidebarEvent] = useState<CommunityEvent | null>(null);
  const [mapZoom, setMapZoom] = useState(15);
  const [viewRequest, setViewRequest] = useState<{ lat: number; lng: number; zoom: number } | null>(null);

  // Apply preselect from other pages
  useEffect(() => {
    if (preselectId) {
      setSelectedId(preselectId);
      setNotice(`Showing location on map.`);
      onPreselectConsumed?.();
    }
  }, [preselectId, onPreselectConsumed]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedFilters(activeFilters), 150);
    return () => window.clearTimeout(timer);
  }, [activeFilters]);

  // Split active filters into type vs feature groups
  const activeTypeFilters = useMemo(
    () => debouncedFilters.filter((f) => typeFilters.map((t) => t.tag as string).includes(f)),
    [debouncedFilters]
  );
  const activeFeatureFilters = useMemo(
    () => debouncedFilters.filter((f) => featureFilters.map((t) => t.tag as string).includes(f)) as LocationTag[],
    [debouncedFilters]
  );

  const locationTypeFilters = useMemo(
    () => activeTypeFilters.filter((f) => f !== "events") as LocationTag[],
    [activeTypeFilters]
  );
  const showEventMarkers = activeTypeFilters.length === 0 || activeTypeFilters.includes("events");

  const visibleLocations = useMemo(() => {
    // If only "events" type is selected, hide all location markers (except bench)
    if (activeTypeFilters.length > 0 && !locationTypeFilters.length) return [];
    return allLocations.filter((loc) => {
      if (locationTypeFilters.length > 0 && !locationTypeFilters.some((t) => loc.tags.includes(t))) return false;
      if (activeFeatureFilters.length > 0 && !activeFeatureFilters.every((f) => loc.tags.includes(f))) return false;
      return true;
    });
  }, [allLocations, locationTypeFilters, activeTypeFilters, activeFeatureFilters]);

  const visibleEvents = useMemo(() => (showEventMarkers ? events : []), [showEventMarkers]);

  const selectedLocation =
    visibleLocations.find((l) => l.id === selectedId) ?? visibleLocations[0] ?? allLocations[0];

  useEffect(() => {
    if (visibleLocations.length > 0 && !visibleLocations.some((l) => l.id === selectedId)) {
      setSelectedId((visibleLocations[0] ?? allLocations[0]).id);
    }
  }, [allLocations, selectedId, visibleLocations]);

  const toggleFilter = (tag: string) => {
    setActiveFilters((cur) => (cur.includes(tag) ? cur.filter((f) => f !== tag) : [...cur, tag]));
  };

  const handleSelect = useCallback(
    (location: MapLocation) => {
      setSelectedId(location.id);
      setSidebarEvent(null);
      setNotice(`${location.name} ${t("connect.selectedSuffix")}`);
    },
    [t]
  );

  const handleDirections = useCallback((location: MapLocation) => {
    setSelectedId(location.id);
    setNotice(
      `${location.name}: ${location.travelTime ?? location.distance}. ${location.nearestBusStop ? `Nearest bus stop: ${location.nearestBusStop}.` : ""} ${location.accessibility}`
    );
    window.open(googleDirectionsUrl(location), "_blank", "noopener,noreferrer");
  }, []);

  const handleMoreInfo = useCallback((location: MapLocation) => {
    setSelectedId(location.id);
    setNotice(`${location.name} — ${location.services.join(", ").toLowerCase()}.`);
    setDetailsLocation(location);
  }, []);

  const handleEventSelect = useCallback((event: CommunityEvent) => {
    setSidebarEvent(event);
    // Pan map to event's host location
    if (event.locationId) {
      const loc = allLocations.find((l) => l.id === event.locationId);
      if (loc) setSelectedId(loc.id);
    }
    setNotice(`${event.name} — ${event.dateTime}`);
  }, [allLocations]);

  // Scroll to map and select a location from a card below
  const focusOnLocation = useCallback((location: MapLocation) => {
    setSelectedId(location.id);
    setNotice(`${location.name} ${t("connect.selectedSuffix")}`);
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [t]);

  const focusOnEvent = useCallback((event: CommunityEvent) => {
    handleEventSelect(event);
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [handleEventSelect]);

  const hasReminder = (event: CommunityEvent) => reminders.some((r) => r.id === event.id);
  const isLoggedIn = user?.mode === "demo";

  const showReturnToBench = selectedId !== CURRENT_BENCH_ID || mapZoom < 14;

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        {/* Header */}
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">{t("connect.eyebrow")}</p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-ink">{t("connect.title")}</h1>
          <p className="mt-4 text-xl leading-relaxed text-slate-800">
            In this map you can see useful locations to get digital help. Click one of the filters below to filter out locations based on your preferences.
          </p>
        </div>

        {/* You are here banner */}
        <div className="mb-5 flex flex-wrap items-center gap-3 border-2 border-ink bg-lagoon-100 px-4 py-3">
          <MapPin size={20} className="shrink-0 text-ink" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <p className="font-black text-ink">You are here — Ladywood Community Connect Bench</p>
            <p className="text-sm font-semibold text-slate-700">Near St Vincent Street West</p>
          </div>
          {showReturnToBench && (
            <button
              type="button"
              onClick={() => {
                setSelectedId(CURRENT_BENCH_ID);
                setSidebarEvent(null);
                setNotice("Returned to the current bench — Ladywood Community Connect Bench.");
                if (currentBench?.coordinatesLatLng) {
                  setViewRequest({
                    lat: currentBench.coordinatesLatLng.lat,
                    lng: currentBench.coordinatesLatLng.lng,
                    zoom: 16
                  });
                }
              }}
              className="govuk-button govuk-button--secondary shrink-0 px-3 py-2 text-sm"
            >
              <Navigation size={14} aria-hidden="true" />
              Return to bench
            </button>
          )}
        </div>

        {/* Filters — two rows */}
        <div className="mb-6 space-y-3">
          {/* Row 1: Type filters */}
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">Show</p>
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((f) => {
                const Icon = f.icon;
                const isActive = activeFilters.includes(f.tag);
                return (
                  <button
                    key={f.tag}
                    type="button"
                    onClick={() => toggleFilter(f.tag)}
                    className={`flex min-h-11 items-center gap-2 border-2 border-ink px-3 py-2 text-sm font-bold ${
                      isActive ? "bg-ink text-white" : "bg-white text-ink hover:bg-lagoon-50"
                    }`}
                    aria-pressed={isActive}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Feature filters */}
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">Filter by</p>
            <div className="flex flex-wrap gap-2">
              {featureFilters.map((f) => {
                const Icon = f.icon;
                const isActive = activeFilters.includes(f.tag);
                return (
                  <button
                    key={f.tag}
                    type="button"
                    onClick={() => toggleFilter(f.tag)}
                    className={`flex min-h-11 items-center gap-2 border-2 border-ink px-3 py-2 text-sm font-bold ${
                      isActive ? "bg-ink text-white" : "bg-white text-ink hover:bg-lagoon-50"
                    }`}
                    aria-pressed={isActive}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {f.label}
                  </button>
                );
              })}
              {activeFilters.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveFilters([])}
                  className="min-h-11 border-2 border-ink bg-white px-3 py-2 text-sm font-bold text-ink hover:bg-lagoon-50"
                >
                  {t("connect.clearFilters")}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Map + side card */}
        <div ref={mapRef} className="relative z-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className={`hc-panel ladywood-map ${detailsLocation ? "map-disabled" : ""}`}>
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center p-6 text-center text-lg font-bold text-ink">
                  {t("connect.loading")}
                </div>
              }
            >
              <LeafletMap
                visibleLocations={visibleLocations}
                visibleEvents={visibleEvents}
                allLocations={allLocations}
                selectedLocation={selectedLocation}
                onSelect={handleSelect}
                onMoreInfo={handleMoreInfo}
                onEventSelect={handleEventSelect}
                currentBench={currentBench}
                onZoomChange={setMapZoom}
                viewRequest={viewRequest}
                onViewRequestConsumed={() => setViewRequest(null)}
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="govuk-inset p-4 text-base font-bold text-ink">{notice || t("connect.selectMarker")}</div>

            {/* Show event card when an event is selected, otherwise show location card */}
            {sidebarEvent ? (
              <SidebarEventCard
                event={sidebarEvent}
                hasReminder={reminders.some((r) => r.id === sidebarEvent.id)}
                onAddReminder={onAddReminder}
                onRemoveReminder={onRemoveReminder}
                onMoreInfo={() => setSelectedEvent(sidebarEvent)}
                onClose={() => setSidebarEvent(null)}
                categoryColour={categoryColour}
                showStamps={isLoggedIn}
              />
            ) : (
              selectedLocation && (
                <LocationCard location={selectedLocation} onDirections={handleDirections} onMoreInfo={handleMoreInfo} />
              )
            )}
          </div>
        </div>

        {/* Location cards grid */}
        {visibleLocations.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-black text-ink">Locations</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleLocations.map((location) => (
                <div
                  key={location.id}
                  className="cursor-pointer"
                  onClick={() => focusOnLocation(location)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") focusOnLocation(location); }}
                  aria-label={`Show ${location.name} on map`}
                >
                  <LocationCard
                    location={location}
                    onDirections={handleDirections}
                    onMoreInfo={handleMoreInfo}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events section */}
        <div className="mt-12">
          <div className="mb-4">
            <h2 className="text-3xl font-black text-ink">Upcoming Events</h2>
            <p className="mt-2 text-lg text-slate-700">
              Free community events in Ladywood. Events are shown as markers on the map above. Click a card to jump to its location.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => {
              const saved = hasReminder(event);
              const colourClass = categoryColour[event.category] ?? "bg-slate-100 text-slate-700";
              return (
                <article
                  key={event.id}
                  className="govuk-panel flex flex-col p-5 cursor-pointer hover:border-lagoon-700 transition-colors"
                  onClick={() => focusOnEvent(event)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") focusOnEvent(event); }}
                  aria-label={`Show ${event.name} on map`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`inline-block self-start px-2 py-1 text-xs font-bold ${colourClass}`}>
                      {event.category}
                    </span>
                    {isLoggedIn && event.stampsOffered && (
                      <span className="flex items-center gap-1 bg-sun-100 px-2 py-1 text-xs font-bold text-ink">
                        <Stamp size={12} aria-hidden="true" />
                        {event.stampsCount ?? 5} stamps
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-lg font-black text-ink">{event.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-700">
                    <CalendarDays size={14} aria-hidden="true" />
                    {event.dateTime}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-700">
                    <MapPin size={14} aria-hidden="true" />
                    {event.location}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-bold text-green-700">
                    <Clock size={14} aria-hidden="true" />
                    {event.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{event.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}
                      className="govuk-button govuk-button--secondary px-4 py-2 text-sm"
                    >
                      More info
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (saved) onRemoveReminder(event.id); else onAddReminder(event);
                      }}
                      className={`flex items-center gap-2 border-2 px-4 py-2 text-sm font-bold ${
                        saved
                          ? "border-green-600 bg-green-50 text-green-700 hover:bg-red-50 hover:border-red-600 hover:text-red-700"
                          : "govuk-button"
                      }`}
                    >
                      {saved ? <BellOff size={14} aria-hidden="true" /> : <Bell size={14} aria-hidden="true" />}
                      {saved ? "Remove reminder" : "Add reminder"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Location details modal */}
      {detailsLocation && (
        <Modal labelledBy="location-details-title" onClose={() => setDetailsLocation(null)}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-base font-bold text-slate-700">{detailsLocation.providerName}</p>
              <h2 id="location-details-title" className="mt-1 text-3xl font-black">
                {detailsLocation.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setDetailsLocation(null)}
              className="min-h-11 border-2 border-ink bg-white px-4 py-2 text-lg font-bold"
            >
              {t("common.close")}
            </button>
          </div>

          <dl className="mt-5 grid gap-4 text-lg">
            <InfoRow label={t("connect.modal.type")} value={detailsLocation.type} />
            <InfoRow label={t("common.helpProvided")} value={detailsLocation.services.join(", ")} />
            <InfoRow label={t("common.whoFor")} value={detailsLocation.whoFor ?? t("common.anyoneLocal")} />
            <InfoRow label={t("common.cost")} value={detailsLocation.cost ?? t("common.freeOrLowCost")} />
            <InfoRow label={t("common.hours")} value={detailsLocation.openingHours} />
            <InfoRow label={t("common.address")} value={detailsLocation.address} />
            <InfoRow label={t("common.accessibility")} value={detailsLocation.accessibility} />
            <InfoRow label={t("common.contact")} value={detailsLocation.contact ?? t("common.askAtLocation")} />
            {detailsLocation.travelTime && (
              <InfoRow
                label={t("common.accessibleDirections")}
                value={`${detailsLocation.travelTime}. ${detailsLocation.nearestBusStop ? `Nearest bus stop: ${detailsLocation.nearestBusStop}.` : ""} Seating: ${detailsLocation.hasSeating ? "yes" : "not confirmed"}.`}
              />
            )}
          </dl>

          <div className="mt-5 flex flex-wrap gap-4 text-lg font-bold">
            {detailsLocation.socialLinks?.website && (
              <a href={detailsLocation.socialLinks.website} target="_blank" rel="noreferrer" className="text-lagoon-700">
                Website ↗
              </a>
            )}
            {detailsLocation.socialLinks?.instagram && (
              <a href={detailsLocation.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>
            )}
            {detailsLocation.socialLinks?.facebook && (
              <a href={detailsLocation.socialLinks.facebook} target="_blank" rel="noreferrer">Facebook</a>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => { setSelectedId(detailsLocation.id); setDetailsLocation(null); }}
              className="govuk-button govuk-button--secondary flex-1 px-5 py-3"
            >
              {t("common.showMap")}
            </button>
            <button type="button" onClick={() => handleDirections(detailsLocation)} className="govuk-button flex-1 px-5 py-3">
              {t("common.getDirections")}
            </button>
          </div>
        </Modal>
      )}

      {/* Event details modal */}
      {selectedEvent && (
        <Modal labelledBy="event-details-title" onClose={() => setSelectedEvent(null)}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-block px-2 py-1 text-xs font-bold ${categoryColour[selectedEvent.category] ?? "bg-slate-100 text-slate-700"}`}>
                  {selectedEvent.category}
                </span>
                {isLoggedIn && selectedEvent.stampsOffered && (
                  <span className="flex items-center gap-1 bg-sun-100 px-2 py-1 text-xs font-bold text-ink">
                    <Stamp size={12} aria-hidden="true" />
                    {selectedEvent.stampsCount ?? 5} stamps offered
                  </span>
                )}
              </div>
              <h2 id="event-details-title" className="mt-2 text-3xl font-black">
                {selectedEvent.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="min-h-11 border-2 border-ink bg-white px-4 py-2 text-lg font-bold"
            >
              {t("common.close")}
            </button>
          </div>

          <dl className="mt-5 grid gap-4 text-lg">
            <InfoRow label="Date and time" value={selectedEvent.dateTime} />
            <InfoRow label="Location" value={selectedEvent.location} />
            <InfoRow label="Cost" value={selectedEvent.price} />
            <InfoRow label="Who is this for" value={selectedEvent.audience} />
            <InfoRow label="Help offered" value={selectedEvent.helpOffered} />
            <InfoRow label="Accessibility" value={selectedEvent.accessibility} />
            {selectedEvent.contact && <InfoRow label="Contact" value={selectedEvent.contact} />}
            {selectedEvent.transportNote && <InfoRow label="Getting there" value={selectedEvent.transportNote} />}
            {selectedEvent.sourceNote && <InfoRow label="Organised by" value={selectedEvent.sourceNote} />}
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {hasReminder(selectedEvent) ? (
              <button
                type="button"
                onClick={() => { onRemoveReminder(selectedEvent.id); setSelectedEvent(null); }}
                className="govuk-button govuk-button--secondary flex-1 px-5 py-3"
              >
                <BellOff size={16} aria-hidden="true" />
                Remove reminder
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { onAddReminder(selectedEvent); setSelectedEvent(null); }}
                className="govuk-button flex-1 px-5 py-3"
              >
                <Bell size={16} aria-hidden="true" />
                Add reminder
              </button>
            )}
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="govuk-button govuk-button--secondary flex-1 px-5 py-3"
            >
              {t("common.close")}
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}

// ── Sidebar event card ────────────────────────────────────────────────────────
interface SidebarEventCardProps {
  event: CommunityEvent;
  hasReminder: boolean;
  onAddReminder: (e: CommunityEvent) => void;
  onRemoveReminder: (id: string) => void;
  onMoreInfo: () => void;
  onClose: () => void;
  categoryColour: Record<string, string>;
  showStamps: boolean;
}

function SidebarEventCard({
  event, hasReminder, onAddReminder, onRemoveReminder, onMoreInfo, onClose, categoryColour, showStamps
}: SidebarEventCardProps) {
  const colourClass = categoryColour[event.category] ?? "bg-slate-100 text-slate-700";
  return (
    <article className="hc-panel govuk-panel p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-1 text-xs font-bold ${colourClass}`}>{event.category}</span>
          {showStamps && event.stampsOffered && (
            <span className="flex items-center gap-1 bg-sun-100 px-2 py-1 text-xs font-bold text-ink">
              <Stamp size={11} aria-hidden="true" />
              {event.stampsCount ?? 5} stamps
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-sm font-bold text-slate-500 hover:text-ink"
          aria-label="Close event card"
        >
          ✕
        </button>
      </div>

      <h3 className="mt-3 text-xl font-black text-ink">{event.name}</h3>

      <div className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
        <p className="flex items-center gap-2">
          <CalendarDays size={14} className="shrink-0 text-lagoon-700" aria-hidden="true" />
          {event.dateTime}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={14} className="shrink-0 text-lagoon-700" aria-hidden="true" />
          {event.location}
        </p>
        <p className="flex items-center gap-2">
          <Clock size={14} className="shrink-0 text-green-700" aria-hidden="true" />
          {event.price}
        </p>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-700">{event.summary}</p>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={onMoreInfo}
          className="govuk-button govuk-button--secondary w-full px-4 py-2 text-sm"
        >
          Full details
        </button>
        <button
          type="button"
          onClick={() => { if (hasReminder) onRemoveReminder(event.id); else onAddReminder(event); }}
          className={`flex w-full items-center justify-center gap-2 border-2 px-4 py-2 text-sm font-bold ${
            hasReminder
              ? "border-green-600 bg-green-50 text-green-700 hover:bg-red-50 hover:border-red-600 hover:text-red-700"
              : "govuk-button"
          }`}
        >
          {hasReminder ? <BellOff size={14} aria-hidden="true" /> : <Bell size={14} aria-hidden="true" />}
          {hasReminder ? "Remove reminder" : "Add reminder"}
        </button>
      </div>
    </article>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-slate-300 pt-3">
      <dt className="font-bold">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
