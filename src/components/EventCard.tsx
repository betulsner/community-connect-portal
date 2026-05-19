import { Bell, CalendarDays, MapPin } from "lucide-react";
import type { CommunityEvent, PageId } from "../types";

interface EventCardProps {
  event: CommunityEvent;
  onNavigate: (page: PageId) => void;
  onReminder: (eventName: string) => void;
}

export default function EventCard({ event, onNavigate, onReminder }: EventCardProps) {
  return (
    <article className="hc-panel rounded-lg border border-slate-200 bg-white p-5 shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold text-lagoon-700">{event.category}</p>
          <h3 className="mt-1 text-xl font-black text-ink">{event.name}</h3>
        </div>
        <span className="rounded-lg bg-emerald-50 px-3 py-1 text-sm font-extrabold text-emerald-700">{event.price}</span>
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
          <span className="font-extrabold text-ink">For: </span>
          {event.audience}
        </p>
        <p>{event.summary}</p>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onReminder(event.name)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-sun-500 px-4 py-3 text-sm font-extrabold text-white hover:bg-sun-600 focus:outline-none focus:ring-2 focus:ring-ink"
        >
          <Bell size={16} aria-hidden="true" />
          Add reminder
        </button>
        <button
          type="button"
          onClick={() => onNavigate("connect")}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-ink hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sun-500"
        >
          <MapPin size={16} aria-hidden="true" />
          Show on map
        </button>
      </div>
    </article>
  );
}
