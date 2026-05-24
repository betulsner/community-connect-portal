import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { BatteryCharging, Bell, BellOff, CalendarDays, Check, Clock, Hand, MapPin, Route, Wrench, Wifi } from "lucide-react";
import { events } from "../data/events";
import { locations } from "../data/locations";
import { useI18n } from "../i18n";
import type { CommunityEvent, LocationTag, MapLocation } from "../types";
import LocationCard from "./LocationCard";
import Modal from "./Modal";

const LeafletMap = lazy(() => import("./LeafletMap"));

const filters: Array<{ tag: LocationTag; labelKey: string; icon: React.ElementType }> = [
  { tag: "wifi", labelKey: "connect.filter.wifi", icon: Wifi },
  { tag: "charging", labelKey: "connect.filter.charging", icon: BatteryCharging },
  { tag: "digital-help", labelKey: "connect.filter.digital", icon: Hand },
  { tag: "refurbished-devices", labelKey: "connect.filter.devices", icon: Wrench },
  { tag: "events", labelKey: "connect.filter.events", icon: CalendarDays },
  { tag: "accessible", labelKey: "connect.filter.accessible", icon: Check },
  { tag: "open-today", labelKey: "connect.filter.open", icon: Route }
];

const categoryColour: Record<string, string> = {
  "Digital help": "bg-lagoon-50 text-lagoon-700",
  "Digital skills": "bg-lagoon-50 text-lagoon-700",
  "Jobs": "bg-sun-100 text-ink",
  "Connection": "bg-green-50 text-green-800",
  "Community": "bg-green-50 text-green-800",
  "Device support": "bg-red-50 text-red-800",
  "Volunteering": "bg-purple-50 text-purple-800",
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
  reminders: CommunityEvent[];
}

export default function MapSection({ onAddReminder, reminders }: MapSectionProps) {
  const { t } = useI18n();
  const allLocations = useMemo(() => locations, []);
  const [activeFilters, setActiveFilters] = useState<LocationTag[]>([]);
  const [debouncedFilters, setDebouncedFilters] = useState<LocationTag[]>([]);
  const [selectedId, setSelectedId] = useState(allLocations[0].id);
  const [notice, setNotice] = useState("");
  const [detailsLocation, setDetailsLocation] = useState<MapLocation | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedFilters(activeFilters), 150);
    return () => window.clearTimeout(timer);
  }, [activeFilters]);

  const visibleLocations = useMemo(() => {
    if (debouncedFilters.length === 0) return allLocations;
    return allLocations.filter((location) => debouncedFilters.every((tag) => location.tags.includes(tag)));
  }, [allLocations, debouncedFilters]);

  const selectedLocation =
    visibleLocations.find((location) => location.id === selectedId) ?? visibleLocations[0] ?? allLocations[0];

  useEffect(() => {
    if (!visibleLocations.some((location) => location.id === selectedId)) {
      setSelectedId((visibleLocations[0] ?? allLocations[0]).id);
    }
  }, [allLocations, selectedId, visibleLocations]);

  const toggleFilter = (tag: LocationTag) => {
    setActiveFilters((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  };

  const handleSelect = useCallback(
    (location: MapLocation) => {
      setSelectedId(location.id);
      setNotice(`${location.name} ${t("connect.selectedSuffix")}`);
    },
    [t]
  );

  const handleDirections = useCallback((location: MapLocation) => {
    setSelectedId(location.id);
    setNotice(
      `${location.name}: ${location.travelTime ?? location.distance}. Nearest bus stop: ${
        location.nearestBusStop ?? "unknown"
      }. ${location.accessibility} Seating: ${location.hasSeating ? "yes" : "not confirmed"}.`
    );
    window.open(googleDirectionsUrl(location), "_blank", "noopener,noreferrer");
  }, []);

  const handleMoreInfo = useCallback(
    (location: MapLocation) => {
      setSelectedId(location.id);
      setNotice(`${location.name} offers ${location.services.join(", ").toLowerCase()}. ${location.accessibility}`);
      setDetailsLocation(location);
    },
    []
  );

  const hasReminder = (event: CommunityEvent) => reminders.some((r) => r.id === event.id);

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">{t("connect.eyebrow")}</p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-ink">{t("connect.title")}</h1>
          <p className="mt-4 text-xl leading-relaxed text-slate-800">{t("connect.subtitle")}</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" aria-label={t("connect.filters")}>
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilters.includes(filter.tag);
            return (
              <button
                key={filter.tag}
                type="button"
                onClick={() => toggleFilter(filter.tag)}
                className={`flex min-h-11 items-center gap-2 border-2 border-ink px-3 py-2 text-sm font-bold ${
                  isActive ? "bg-ink text-white" : "bg-white text-ink hover:bg-lagoon-50"
                }`}
                aria-pressed={isActive}
              >
                <Icon size={16} aria-hidden="true" />
                {t(filter.labelKey)}
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

        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
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
                selectedLocation={selectedLocation}
                onSelect={handleSelect}
                onMoreInfo={handleMoreInfo}
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="govuk-inset p-4 text-base font-bold text-ink">{notice || t("connect.selectMarker")}</div>
            <LocationCard location={selectedLocation} onDirections={handleDirections} onMoreInfo={handleMoreInfo} />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleLocations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onDirections={handleDirections}
              onMoreInfo={handleMoreInfo}
            />
          ))}
        </div>

        {/* Events section */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-3xl font-black text-ink">Upcoming Events</h2>
            <p className="mt-2 text-lg text-slate-700">Free community events in Ladywood this month. Save a reminder to your dashboard.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => {
              const saved = hasReminder(event);
              const colourClass = categoryColour[event.category] ?? "bg-slate-100 text-slate-700";
              return (
                <article key={event.id} className="govuk-panel flex flex-col p-5">
                  <span className={`inline-block self-start px-2 py-1 text-xs font-bold ${colourClass}`}>
                    {event.category}
                  </span>
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
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="govuk-button govuk-button--secondary px-4 py-2 text-sm"
                    >
                      More info
                    </button>
                    <button
                      type="button"
                      onClick={() => { if (!saved) onAddReminder(event); }}
                      disabled={saved}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 ${
                        saved
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "govuk-button"
                      }`}
                    >
                      {saved ? <BellOff size={14} aria-hidden="true" /> : <Bell size={14} aria-hidden="true" />}
                      {saved ? "Reminder saved" : "Add reminder"}
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
            <InfoRow
              label={t("common.accessibleDirections")}
              value={`${detailsLocation.travelTime ?? detailsLocation.distance}. Nearest bus stop: ${
                detailsLocation.nearestBusStop ?? "unknown"
              }. Seating: ${detailsLocation.hasSeating ? "yes" : "not confirmed"}.`}
            />
          </dl>

          <div className="mt-5 flex flex-wrap gap-4 text-lg font-bold">
            {detailsLocation.socialLinks?.instagram && (
              <a href={detailsLocation.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>
            )}
            {detailsLocation.socialLinks?.facebook && (
              <a href={detailsLocation.socialLinks.facebook} target="_blank" rel="noreferrer">Facebook</a>
            )}
            {detailsLocation.socialLinks?.website && (
              <a href={detailsLocation.socialLinks.website} target="_blank" rel="noreferrer">Website</a>
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
              <span className={`inline-block px-2 py-1 text-xs font-bold ${categoryColour[selectedEvent.category] ?? "bg-slate-100 text-slate-700"}`}>
                {selectedEvent.category}
              </span>
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
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {hasReminder(selectedEvent) ? (
              <div className="flex items-center gap-2 font-bold text-green-700">
                <BellOff size={18} aria-hidden="true" />
                Reminder already saved
              </div>
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-slate-300 pt-3">
      <dt className="font-bold">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
