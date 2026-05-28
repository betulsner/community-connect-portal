import { CheckCircle2, Mail, MapPin, XCircle } from "lucide-react";
import type { RefurbishmentPoint } from "../types";

interface RefurbishmentCardProps {
  point: RefurbishmentPoint;
  onFindOnMap?: (locationId: string) => void;
}

export default function RefurbishmentCard({ point, onFindOnMap }: RefurbishmentCardProps) {
  const directionsUrl = point.address
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(point.address)}`
    : null;

  return (
    <article className="hc-panel govuk-panel p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-ink">{point.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-600">
            <MapPin size={14} aria-hidden="true" />
            {point.area}
          </p>
        </div>
        {/* Device availability badge */}
        {point.devicesAvailable !== undefined && (
          <span
            className={`flex items-center gap-1 self-start px-3 py-1 text-xs font-bold ${
              point.devicesAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-50 text-red-700"
            }`}
          >
            {point.devicesAvailable ? (
              <><CheckCircle2 size={12} aria-hidden="true" /> Devices available</>
            ) : (
              <><XCircle size={12} aria-hidden="true" /> Currently unavailable</>
            )}
          </span>
        )}
      </div>

      {/* Address */}
      {point.address && (
        <p className="text-sm text-slate-700">
          <span className="font-bold">Address: </span>{point.address}
        </p>
      )}

      {/* Contact */}
      <p className="text-sm font-semibold text-slate-700">{point.contact}</p>
      {point.email && (
        <a
          href={`mailto:${point.email}`}
          className="flex items-center gap-2 text-sm font-bold text-lagoon-700"
        >
          <Mail size={14} aria-hidden="true" />
          {point.email}
        </a>
      )}

      {/* What they offer */}
      <div className="flex flex-wrap gap-2">
        {point.offers.map((offer) => (
          <span key={offer} className="govuk-tag px-3 py-1 text-xs">
            {offer}
          </span>
        ))}
      </div>

      {/* Eligibility */}
      {point.eligibility && point.eligibility.length > 0 && (
        <div>
          <p className="text-sm font-extrabold text-ink">Eligibility criteria:</p>
          <ul className="mt-2 space-y-1">
            {point.eligibility.map((criterion) => (
              <li key={criterion} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-700" aria-hidden="true" />
                {criterion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Accessibility */}
      <p className="text-sm text-slate-600">{point.accessibility}</p>

      {/* Action buttons */}
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {point.mapLocationId && onFindOnMap && (
          <button
            type="button"
            onClick={() => onFindOnMap(point.mapLocationId!)}
            className="govuk-button govuk-button--secondary flex items-center gap-1 px-4 py-2 text-sm"
          >
            <MapPin size={14} aria-hidden="true" />
            Find on map
          </button>
        )}
        {directionsUrl && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="govuk-button flex items-center gap-1 px-4 py-2 text-sm"
          >
            Get directions
          </a>
        )}
      </div>
    </article>
  );
}
