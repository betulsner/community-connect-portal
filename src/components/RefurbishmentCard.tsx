import { MapPin, Phone, Wrench } from "lucide-react";
import { useI18n } from "../i18n";
import type { RefurbishmentPoint } from "../types";

interface RefurbishmentCardProps {
  point: RefurbishmentPoint;
}

export default function RefurbishmentCard({ point }: RefurbishmentCardProps) {
  const { t } = useI18n();

  return (
    <article className="hc-panel govuk-panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-extrabold text-lagoon-700">
            <MapPin size={16} aria-hidden="true" />
            {point.area}
          </p>
          <h3 className="mt-2 text-xl font-black text-ink">{point.name}</h3>
        </div>
        <span className="govuk-tag px-3 py-1 text-sm">{point.cost}</span>
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-700">
        <span className="font-extrabold text-ink">{t("refurb.open")}: </span>
        {point.openDays}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {point.offers.map((offer) => (
          <span key={offer} className="govuk-tag px-3 py-1 text-xs">
            {offer}
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
        <p className="flex gap-2">
          <Phone size={18} className="mt-0.5 min-w-4 text-sun-600" aria-hidden="true" />
          {point.contact}
        </p>
        <p className="flex gap-2">
          <Wrench size={18} className="mt-0.5 min-w-4 text-lagoon-700" aria-hidden="true" />
          {point.accessibility}
        </p>
      </div>
    </article>
  );
}
