import { BatteryCharging, CheckCircle2, Network, PoundSterling, Smartphone, Wifi } from "lucide-react";
import RefurbishmentCard from "../components/RefurbishmentCard";
import { refurbishmentPoints } from "../data/refurbishment";
import { useI18n } from "../i18n";

const stepKeys = ["refurb.step1", "refurb.step2", "refurb.step3", "refurb.step4", "refurb.step5"];

const supportNotes = [
  {
    icon: Wifi,
    titleKey: "refurb.internet.title",
    textKey: "refurb.internet.text"
  },
  {
    icon: PoundSterling,
    titleKey: "refurb.tariff.title",
    textKey: "refurb.tariff.text"
  },
  {
    icon: Smartphone,
    titleKey: "refurb.data.title",
    textKey: "refurb.data.text"
  }
];

export default function Refurbishment() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">{t("refurb.eyebrow")}</p>
          <h1 className="mt-2 text-4xl font-black text-ink">{t("refurb.title")}</h1>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-700">
            {t("refurb.subtitle")}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4 md:grid-cols-2">
            {refurbishmentPoints.map((point) => (
              <RefurbishmentCard key={point.id} point={point} />
            ))}
          </div>

          <aside className="space-y-5">
            <div className="hc-panel govuk-panel bg-lagoon-50 p-5">
              <div className="flex h-12 w-12 items-center justify-center bg-ink text-white">
                <BatteryCharging size={24} aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-2xl font-black text-ink">{t("refurb.needDevice")}</h2>
              <ol className="mt-5 space-y-3">
                {stepKeys.map((stepKey, index) => (
                  <li key={stepKey} className="flex gap-3 text-sm font-bold text-slate-700">
                    <span className="flex h-7 w-7 min-w-7 items-center justify-center bg-ink text-white">
                      {index + 1}
                    </span>
                    {t(stepKey)}
                  </li>
                ))}
              </ol>
            </div>

            {supportNotes.map((note) => {
              const Icon = note.icon;
              return (
                <article key={note.titleKey} className="hc-panel govuk-panel p-5">
                  <p className="flex items-center gap-2 text-sm font-extrabold text-lagoon-700">
                    <Icon size={18} aria-hidden="true" />
                    {t(note.titleKey)}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">{t(note.textKey)}</p>
                </article>
              );
            })}

            <div className="border-2 border-ink bg-ink p-5 text-white">
              <p className="flex items-center gap-2 text-sm font-extrabold text-sun-100">
                <Network size={18} aria-hidden="true" />
                {t("refurb.donations.title")}
              </p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-white">
                {t("refurb.donations.text")}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 size={18} aria-hidden="true" />
                {t("refurb.donations.safe")}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
