import { ArrowRight, CalendarDays, Laptop, MapPin, UserCircle, Users } from "lucide-react";
import { useI18n } from "../i18n";
import type { PageId } from "../types";

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

const cards: Array<{ titleKey: string; textKey: string; buttonKey: string; page: PageId; icon: React.ElementType }> = [
  {
    titleKey: "home.card.services.title",
    textKey: "home.card.services.text",
    buttonKey: "common.viewDetails",
    page: "connect",
    icon: MapPin
  },
  {
    titleKey: "home.card.events.title",
    textKey: "home.card.events.text",
    buttonKey: "common.viewDetails",
    page: "events",
    icon: CalendarDays
  },
  {
    titleKey: "home.card.devices.title",
    textKey: "home.card.devices.text",
    buttonKey: "common.viewDetails",
    page: "refurbishment",
    icon: Laptop
  },
  {
    titleKey: "home.card.dashboard.title",
    textKey: "home.card.dashboard.text",
    buttonKey: "common.openDashboard",
    page: "dashboard",
    icon: UserCircle
  }
];

export default function Home({ onNavigate }: HomeProps) {
  const { t } = useI18n();

  return (
    <>
      <section className="home-hero-real">
        <div className="home-hero-real__overlay" aria-hidden="true" />
        <div className="govuk-width-container home-hero-real__content">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black leading-tight tracking-normal text-white md:text-6xl lg:text-7xl">
              {t("home.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-semibold leading-relaxed text-white md:text-2xl">
              {t("home.subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button type="button" onClick={() => onNavigate("connect")} className="cc-hero-button cc-hero-button--blue">
                <MapPin size={24} aria-hidden="true" />
                {t("home.openMap")}
              </button>
              <button type="button" onClick={() => onNavigate("digital")} className="cc-hero-button cc-hero-button--green">
                <Users size={24} aria-hidden="true" />
                {t("home.findDigital")}
              </button>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("refurbishment")}
              className="mt-7 inline-flex min-h-11 items-center gap-3 text-lg font-bold text-white underline decoration-2 underline-offset-4 hover:text-yellow-200"
            >
              {t("home.refurbLink")}
              <ArrowRight size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16" aria-labelledby="home-needs-heading">
        <div className="govuk-width-container">
          <h2 id="home-needs-heading" className="text-4xl font-black leading-tight text-ink md:text-5xl">
            {t("home.needTitle")}
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.titleKey} className="need-card">
                  <Icon size={42} className="mx-auto text-green-700" aria-hidden="true" />
                  <h3 className="mt-5 text-center text-xl font-black leading-snug text-ink">{t(card.titleKey)}</h3>
                  <p className="mt-4 text-center text-base font-semibold leading-relaxed text-slate-700">{t(card.textKey)}</p>
                  <button
                    type="button"
                    onClick={() => onNavigate(card.page)}
                    className="govuk-button govuk-button--secondary mt-auto w-full px-5 py-3 text-base"
                  >
                    {t(card.buttonKey)}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
