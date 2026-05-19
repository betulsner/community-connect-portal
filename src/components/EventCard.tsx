import { Bell, CalendarDays, MapPin } from "lucide-react";
import { useI18n } from "../i18n";
import type { CommunityEvent, PageId } from "../types";

interface EventCardProps {
  event: CommunityEvent;
  onNavigate: (page: PageId) => void;
  onReminder: (event: CommunityEvent) => void;
  onMoreInfo: (event: CommunityEvent) => void;
}

export default function EventCard({ event, onNavigate, onReminder, onMoreInfo }: EventCardProps) {
  const { t } = useI18n();

  return (
    <article className="hc-panel govuk-panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold text-lagoon-700">{event.category}</p>
          <h3 className="mt-1 text-xl font-black text-ink">{event.name}</h3>
        </div>
        <span className="govuk-tag px-3 py-1 text-sm">{event.price}</span>
      </div>
      <div className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
        <p className="flex gap-2">
          <CalendarDays size={18} className="mt-0.5 min-w-4 text-sun-600" aria-hidden="true" />
          {event.dateTime}
        </p>
        <p className="flex gap-2">
          <MapPin size={18} className="mt-0.5 min-w-4 text-lagoon-700" aria-hidden="true" />
          {event.location}
        </p>
        <p>
          <span className="font-extrabold text-ink">{t("common.for")}: </span>
          {event.audience}
        </p>
        <p>
          <span className="font-extrabold text-ink">{t("common.help")}: </span>
          {event.helpOffered}
        </p>
        <p>
          <span className="font-extrabold text-ink">{t("common.access")}: </span>
          {event.accessibility}
        </p>
        <p>{event.summary}</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => onReminder(event)}
          className="govuk-button flex-1 px-4 py-3 text-sm"
        >
          <Bell size={16} aria-hidden="true" />
          {t("common.addReminder")}
        </button>
        <button
          type="button"
          onClick={() => onNavigate("connect")}
          className="govuk-button govuk-button--secondary flex-1 px-4 py-3 text-sm"
        >
          <MapPin size={16} aria-hidden="true" />
          {t("common.showMap")}
        </button>
        <button
          type="button"
          onClick={() => onMoreInfo(event)}
          className="govuk-button govuk-button--secondary flex-1 px-4 py-3 text-sm"
        >
          {t("common.moreInfo")}
        </button>
      </div>
    </article>
  );
}
