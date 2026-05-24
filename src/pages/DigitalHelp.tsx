import { useState } from "react";
import { BookOpen, LifeBuoy, MapPin } from "lucide-react";
import Modal from "../components/Modal";
import { digitalHelpTopics } from "../data/digitalHelp";
import { events } from "../data/events";
import { locations } from "../data/locations";
import { useI18n } from "../i18n";
import type { DigitalHelpTopic, PageId } from "../types";

interface DigitalHelpProps {
  onNavigate: (page: PageId) => void;
}

export default function DigitalHelp({ onNavigate }: DigitalHelpProps) {
  const { t } = useI18n();
  const [selectedGuide, setSelectedGuide] = useState<DigitalHelpTopic>(digitalHelpTopics[0]);
  const [selectedHelp, setSelectedHelp] = useState<DigitalHelpTopic | null>(null);

  const recommendedEvent = selectedHelp?.recommendedEventId
    ? events.find((event) => event.id === selectedHelp.recommendedEventId)
    : undefined;
  const recommendedLocation = selectedHelp?.recommendedLocationId
    ? locations.find((location) => location.id === selectedHelp.recommendedLocationId)
    : undefined;

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">{t("digital.eyebrow")}</p>
          <h1 className="mt-2 text-4xl font-black text-ink">{t("digital.title")}</h1>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-700">
            {t("digital.subtitle")}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4 md:grid-cols-2">
            {digitalHelpTopics.map((topic) => (
              <article key={topic.id} className="hc-panel govuk-panel p-5">
                <div className="flex h-11 w-11 items-center justify-center border-2 border-ink bg-lagoon-50 text-ink">
                  <LifeBuoy size={22} aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-xl font-black text-ink">{t(`digital.topic.${topic.id}.title`, topic.title)}</h2>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
                  {t(`digital.topic.${topic.id}.text`, topic.explanation)}
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setSelectedHelp(topic)}
                    className="govuk-button govuk-button--blue flex-1 px-4 py-3 text-sm"
                  >
                    <MapPin size={16} aria-hidden="true" />
                    {t("digital.findNearby")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedGuide(topic)}
                    className="govuk-button govuk-button--secondary flex-1 px-4 py-3 text-sm"
                  >
                    <BookOpen size={16} aria-hidden="true" />
                    {t("digital.beginnerGuide")}
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="hc-panel govuk-panel h-fit bg-lagoon-50 p-5">
            <p className="text-sm font-bold text-slate-700">{t("digital.beginnerGuide")}</p>
            <h2 className="mt-2 text-2xl font-black text-ink">
              {t(`digital.topic.${selectedGuide.id}.title`, selectedGuide.title)}
            </h2>
            <ol className="mt-5 space-y-3">
              {selectedGuide.guideSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm font-bold text-slate-700">
                  <span className="flex h-7 w-7 min-w-7 items-center justify-center bg-ink text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>

      {selectedHelp && (
        <Modal labelledBy="digital-help-modal-title" onClose={() => setSelectedHelp(null)}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-bold text-slate-700">{t("digital.nearbyHelp")}</p>
                <h2 id="digital-help-modal-title" className="mt-1 text-3xl font-black">
                  {t(`digital.topic.${selectedHelp.id}.title`, selectedHelp.title)}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedHelp(null)}
                className="border-2 border-ink bg-white px-4 py-2 text-lg font-bold"
              >
                {t("common.close")}
              </button>
            </div>

            <div className="mt-5 space-y-5 text-lg">
              {recommendedEvent && (
                <section className="border-t border-slate-300 pt-4">
                  <h3 className="text-2xl font-black">{t("digital.goEvent")}</h3>
                  <p className="mt-2"><strong>{recommendedEvent.name}</strong></p>
                  <p>{recommendedEvent.dateTime}</p>
                  <p>{recommendedEvent.location}</p>
                  <p>{recommendedEvent.helpOffered}</p>
                </section>
              )}
              {recommendedLocation && (
                <section className="border-t border-slate-300 pt-4">
                  <h3 className="text-2xl font-black">{t("digital.visitPlace")}</h3>
                  <p className="mt-2"><strong>{recommendedLocation.name}</strong></p>
                  <p>{recommendedLocation.address}</p>
                  <p>{recommendedLocation.openingHours}</p>
                  <p>{recommendedLocation.accessibility}</p>
                </section>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => onNavigate("connect")} className="govuk-button flex-1 px-5 py-3">
                {t("common.openEvents")}
              </button>
              <button type="button" onClick={() => onNavigate("connect")} className="govuk-button govuk-button--secondary flex-1 px-5 py-3">
                {t("common.showMap")}
              </button>
            </div>
        </Modal>
      )}
    </section>
  );
}
