import { useState } from "react";
import EventCard from "../components/EventCard";
import { events } from "../data/events";
import type { PageId } from "../types";

interface EventsProps {
  onNavigate: (page: PageId) => void;
}

export default function Events({ onNavigate }: EventsProps) {
  const [notice, setNotice] = useState("Choose an event to add a local reminder preview.");

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase text-lagoon-700">Events</p>
            <h1 className="mt-2 text-4xl font-black text-ink">Local sessions for support and connection.</h1>
            <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-700">
              Browse digital help hours, community meetups, beginner sessions, repair events, volunteering, and language support.
            </p>
          </div>
          <div className="rounded-lg bg-lagoon-50 px-4 py-3 text-sm font-bold text-lagoon-900">{notice}</div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onNavigate={onNavigate}
              onReminder={(eventName) => setNotice(`Reminder preview added for ${eventName}.`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
