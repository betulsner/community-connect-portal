import { useMemo, useState } from "react";
import { BatteryCharging, CalendarDays, Check, Hand, MapPin, Route, Wrench, Wifi } from "lucide-react";
import { locations } from "../data/locations";
import type { LocationTag, MapLocation } from "../types";
import LocationCard from "./LocationCard";

const filters: Array<{ tag: LocationTag; label: string; icon: React.ElementType }> = [
  { tag: "wifi", label: "Wi-Fi", icon: Wifi },
  { tag: "charging", label: "Charging", icon: BatteryCharging },
  { tag: "digital-help", label: "Digital help", icon: Hand },
  { tag: "refurbished-devices", label: "Refurbished devices", icon: Wrench },
  { tag: "events", label: "Events", icon: CalendarDays },
  { tag: "accessible", label: "Accessible location", icon: Check },
  { tag: "open-today", label: "Open today", icon: Route }
];

function markerColor(type: MapLocation["type"]) {
  if (type === "Community Connect Bench") return "bg-sun-500";
  if (type === "Partner Cafe") return "bg-rose-500";
  if (type === "Refurbishment Point") return "bg-indigo-600";
  if (type === "Local Event") return "bg-emerald-600";
  return "bg-lagoon-700";
}

export default function MapSection() {
  const [activeFilters, setActiveFilters] = useState<LocationTag[]>([]);
  const [selectedId, setSelectedId] = useState(locations[0].id);
  const [notice, setNotice] = useState("Select a marker or card to preview local support.");

  const visibleLocations = useMemo(() => {
    if (activeFilters.length === 0) return locations;
    return locations.filter((location) => activeFilters.every((tag) => location.tags.includes(tag)));
  }, [activeFilters]);

  const selectedLocation =
    visibleLocations.find((location) => location.id === selectedId) ?? visibleLocations[0] ?? locations[0];

  const toggleFilter = (tag: LocationTag) => {
    setActiveFilters((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  };

  const handleDirections = (location: MapLocation) => {
    setSelectedId(location.id);
    setNotice(`Directions preview: start at the nearest Community Connect Bench, then follow local walking routes to ${location.name}.`);
  };

  const handleMoreInfo = (location: MapLocation) => {
    setSelectedId(location.id);
    setNotice(`${location.name} offers ${location.services.join(", ").toLowerCase()}. ${location.accessibility}`);
  };

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-extrabold uppercase text-lagoon-700">Connect with the City</p>
          <h2 className="mt-2 text-4xl font-black text-ink">Find benches, support, Wi-Fi, cafes, and events.</h2>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-700">
            The map uses local mock data for Ladywood prototype testing. Filters help residents find practical support fast.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" aria-label="Map filters">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilters.includes(filter.tag);
            return (
              <button
                key={filter.tag}
                type="button"
                onClick={() => toggleFilter(filter.tag)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-extrabold transition focus:outline-none focus:ring-2 focus:ring-sun-500 ${
                  isActive ? "bg-lagoon-700 text-white" : "bg-lagoon-50 text-lagoon-700 hover:bg-lagoon-100"
                }`}
                aria-pressed={isActive}
              >
                <Icon size={16} aria-hidden="true" />
                {filter.label}
              </button>
            );
          })}
          {activeFilters.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters([])}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-extrabold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sun-500"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="hc-panel relative min-h-[520px] overflow-hidden rounded-lg border border-slate-200 bg-[#dff8f5] shadow-lift">
            <div className="absolute inset-0 map-grid" aria-hidden="true" />
            <div className="absolute left-0 top-[46%] h-16 w-full -rotate-6 bg-slate-300/70" aria-hidden="true" />
            <div className="absolute left-[-10%] top-[57%] h-20 w-[120%] rotate-3 bg-sun-100/80" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-lagoon-300/55 to-transparent" aria-hidden="true" />
            <div className="absolute left-8 top-8 rounded-lg bg-white/90 px-4 py-3 shadow-sm">
              <p className="text-sm font-extrabold text-ink">{visibleLocations.length} places shown</p>
              <p className="text-xs font-bold text-slate-600">Prototype illustrated map</p>
            </div>

            {visibleLocations.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => {
                  setSelectedId(location.id);
                  setNotice(`${location.name} selected. Use the card for directions or details.`);
                }}
                className={`absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white text-white shadow-lg transition hover:scale-110 focus:outline-none focus:ring-4 focus:ring-sun-400 ${markerColor(
                  location.type
                )}`}
                style={{ left: `${location.coordinates.x}%`, top: `${location.coordinates.y}%` }}
                aria-label={`Show ${location.name}`}
              >
                <MapPin size={22} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-lagoon-200 bg-lagoon-50 p-4 text-sm font-bold text-lagoon-900">
              {notice}
            </div>
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
      </div>
    </section>
  );
}
