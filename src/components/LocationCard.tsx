import { ArrowRight, Info, Navigation, MapPin } from "lucide-react";
import { useI18n } from "../i18n";
import type { MapLocation } from "../types";

interface LocationCardProps {
  location: MapLocation;
  onDirections?: (location: MapLocation) => void;
  onMoreInfo?: (location: MapLocation) => void;
}

export default function LocationCard({ location, onDirections, onMoreInfo }: LocationCardProps) {
  const { t } = useI18n();

  return (
    <article className="hc-panel govuk-panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-700">{location.type}</p>
          <h3 className="mt-1 text-xl font-black text-ink">{location.name}</h3>
          <p className="mt-1 text-sm font-bold text-slate-700">
            {t("common.provider")}: {location.providerName}
          </p>
        </div>
        <span className="govuk-tag px-3 py-1 text-sm">{location.distance}</span>
      </div>

      <div className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
        <p className="flex gap-2">
          <MapPin size={18} className="mt-0.5 min-w-4 text-lagoon-700" aria-hidden="true" />
          {location.address}
        </p>
        <p>
          <span className="font-extrabold text-ink">{t("common.hours")}: </span>
          {location.openingHours}
        </p>
        <p>
          <span className="font-extrabold text-ink">{t("common.accessibility")}: </span>
          {location.accessibility}
        </p>
      </div>

      {location.socialLinks && (
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
          {location.socialLinks.instagram && (
            <a href={location.socialLinks.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          )}
          {location.socialLinks.facebook && (
            <a href={location.socialLinks.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          )}
          {location.socialLinks.website && (
            <a href={location.socialLinks.website} target="_blank" rel="noreferrer">
              Website
            </a>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {location.services.map((service) => (
          <span key={service} className="govuk-tag px-3 py-1 text-xs">
            {service}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onDirections?.(location)}
          className="govuk-button govuk-button--blue flex-1 px-4 py-3 text-sm"
        >
          <Navigation size={16} aria-hidden="true" />
          {t("common.getDirections")}
          <ArrowRight size={15} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onMoreInfo?.(location)}
          className="govuk-button govuk-button--secondary flex-1 px-4 py-3 text-sm"
        >
          <Info size={16} aria-hidden="true" />
          {t("common.moreInfo")}
        </button>
      </div>
    </article>
  );
}
