import { ArrowRight, Info, Navigation, MapPin } from "lucide-react";
import type { MapLocation } from "../types";

interface LocationCardProps {
  location: MapLocation;
  onDirections?: (location: MapLocation) => void;
  onMoreInfo?: (location: MapLocation) => void;
}

export default function LocationCard({ location, onDirections, onMoreInfo }: LocationCardProps) {
  return (
    <article className="hc-panel rounded-lg border border-slate-200 bg-white p-5 shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold text-lagoon-700">{location.type}</p>
          <h3 className="mt-1 text-xl font-black text-ink">{location.name}</h3>
        </div>
        <span className="rounded-lg bg-sun-100 px-3 py-1 text-sm font-extrabold text-sun-600">{location.distance}</span>
      </div>

      <div className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
        <p className="flex gap-2">
          <MapPin size={18} className="mt-0.5 min-w-4 text-lagoon-700" aria-hidden="true" />
          {location.address}
        </p>
        <p>
          <span className="font-extrabold text-ink">Hours: </span>
          {location.openingHours}
        </p>
        <p>
          <span className="font-extrabold text-ink">Accessibility: </span>
          {location.accessibility}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {location.services.map((service) => (
          <span key={service} className="rounded-lg bg-lagoon-50 px-3 py-1 text-xs font-extrabold text-lagoon-700">
            {service}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onDirections?.(location)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sun-500"
        >
          <Navigation size={16} aria-hidden="true" />
          Get directions
          <ArrowRight size={15} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onMoreInfo?.(location)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-ink hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sun-500"
        >
          <Info size={16} aria-hidden="true" />
          More info
        </button>
      </div>
    </article>
  );
}
