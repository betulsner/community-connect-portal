import { useState } from "react";
import EventCard from "../components/EventCard";
import Modal from "../components/Modal";
import { events } from "../data/events";
import { useI18n } from "../i18n";
import type { CommunityEvent, PageId } from "../types";

interface EventsProps {
  onNavigate: (page: PageId) => void;
  onAddReminder: (event: CommunityEvent) => void;
  reminders: CommunityEvent[];
}

export default function Events({ onNavigate, onAddReminder, reminders }: EventsProps) {
  const { t } = useI18n();
  const [notice, setNotice] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);

  const addReminder = (event: CommunityEvent) => {
    onAddReminder(event);
    setNotice(`${t("events.savedPrefix")} ${event.name}. ${t("events.savedSuffix")}`);
  };

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-base font-bold text-slate-700">{t("events.eyebrow")}</p>
            <h1 className="mt-2 text-4xl font-black text-ink">{t("events.title")}</h1>
            <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-700">
              {t("events.subtitle")}
            </p>
          </div>
          <div className="govuk-inset px-4 py-3 text-sm font-bold text-ink">{notice || t("events.notice")}</div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onNavigate={onNavigate}
              onReminder={addReminder}
              onMoreInfo={setSelectedEvent}
            />
          ))}
        </div>
      </div>

      {selectedEvent && (
        <Modal labelledBy="event-details-title" onClose={() => setSelectedEvent(null)}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-bold text-slate-700">{selectedEvent.category}</p>
                <h2 id="event-details-title" className="mt-1 text-3xl font-black">
                  {selectedEvent.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="border-2 border-ink bg-white px-4 py-2 text-lg font-bold"
              >
                {t("common.close")}
              </button>
            </div>
            <div className="mt-5 space-y-4 text-lg">
              <p><strong>{t("events.date")}:</strong> {selectedEvent.dateTime}</p>
              <p><strong>{t("events.location")}:</strong> {selectedEvent.location}</p>
              <p><strong>{t("events.helpOffered")}:</strong> {selectedEvent.helpOffered}</p>
              <p><strong>{t("common.cost")}:</strong> {selectedEvent.price}</p>
              <p><strong>{t("common.access")}:</strong> {selectedEvent.accessibility}</p>
              <p><strong>{t("common.contact")}:</strong> {selectedEvent.contact ?? t("common.askAtLocation")}</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <button type="button" onClick={() => addReminder(selectedEvent)} className="govuk-button px-5 py-3">
                {t("common.addReminder")}
              </button>
              <button type="button" onClick={() => onNavigate("connect")} className="govuk-button govuk-button--secondary px-5 py-3">
                {t("common.showMap")}
              </button>
              <button type="button" onClick={() => setSelectedEvent(null)} className="govuk-button govuk-button--secondary px-5 py-3">
                {t("common.close")}
              </button>
            </div>
        </Modal>
      )}
    </section>
  );
}
