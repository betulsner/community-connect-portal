import { CalendarDays, Laptop, MapPin, Trophy, User } from "lucide-react";
import { locations } from "../data/locations";
import { mockUser } from "../data/user";
import { useI18n } from "../i18n";
import type { CommunityEvent, PageId, PortalUser } from "../types";

interface DashboardProps {
  user: PortalUser | null;
  reminders: CommunityEvent[];
  onNavigate: (page: PageId) => void;
}

export default function Dashboard({ user, reminders, onNavigate }: DashboardProps) {
  const { t } = useI18n();
  const displayName = user?.mode === "demo" ? mockUser.name : t("dashboard.guest");
  const savedLocations = locations.slice(0, 2);

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">{t("dashboard.eyebrow")}</p>
          <h1 className="mt-2 text-4xl font-black text-ink">
            {t("dashboard.hello")}, {displayName}
          </h1>
          <p className="mt-4 text-xl text-ink">{t("dashboard.subtitle")}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="govuk-panel p-5">
            <h2 className="flex items-center gap-2 text-2xl font-black text-ink">
              <CalendarDays size={26} aria-hidden="true" />
              {t("dashboard.reminders")}
            </h2>
            {reminders.length === 0 ? (
              <div className="mt-4">
                <p className="text-lg text-ink">{t("dashboard.noReminders")}</p>
                <button type="button" onClick={() => onNavigate("connect")} className="govuk-button mt-4 px-5 py-3">
                  {t("dashboard.findEvents")}
                </button>
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {reminders.map((event) => (
                  <li key={event.id} className="border-t border-slate-300 pt-3">
                    <strong className="block text-lg text-ink">{event.name}</strong>
                    <span className="block text-base text-ink">{event.dateTime}</span>
                    <span className="block text-base text-ink">{event.location}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="govuk-panel p-5">
            <h2 className="flex items-center gap-2 text-2xl font-black text-ink">
              <MapPin size={26} aria-hidden="true" />
              {t("dashboard.savedLocations")}
            </h2>
            <ul className="mt-4 space-y-3">
              {savedLocations.map((location) => (
                <li key={location.id} className="border-t border-slate-300 pt-3">
                  <strong className="block text-lg text-ink">{location.name}</strong>
                  <span className="block text-base text-ink">{location.address}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="govuk-panel p-5">
            <h2 className="flex items-center gap-2 text-2xl font-black text-ink">
              <Laptop size={26} aria-hidden="true" />
              {t("dashboard.device")}
            </h2>
            <p className="mt-4 text-lg font-bold text-ink">
              {mockUser.hasRefurbishedDevice ? t("dashboard.deviceYes") : t("dashboard.deviceNo")}
            </p>
            <p className="mt-2 text-base text-ink">
              {mockUser.deviceType} {t("dashboard.receivedOn")} {mockUser.deviceReceivedDate}.
            </p>
            <button type="button" onClick={() => onNavigate("refurbishment")} className="govuk-button govuk-button--secondary mt-4 px-5 py-3">
              {t("dashboard.deviceSupport")}
            </button>
          </section>

          <section className="govuk-panel p-5">
            <h2 className="flex items-center gap-2 text-2xl font-black text-ink">
              <Trophy size={26} aria-hidden="true" />
              {t("dashboard.progress")}
            </h2>
            <p className="mt-4 text-lg text-ink">{mockUser.digitalHelpProgress}</p>
            <p className="mt-2 text-lg text-ink">{mockUser.rewardPoints} {t("dashboard.rewardPoints")}</p>
            <button type="button" onClick={() => onNavigate("digital")} className="govuk-button govuk-button--secondary mt-4 px-5 py-3">
              {t("dashboard.findDigital")}
            </button>
          </section>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button type="button" onClick={() => onNavigate("stamps")} className="govuk-button govuk-button--secondary px-5 py-3">
            <Trophy size={16} aria-hidden="true" />
            View my stamps
          </button>
          <button type="button" onClick={() => onNavigate("login")} className="govuk-link-button inline-flex items-center gap-2 text-lg">
            <User size={20} aria-hidden="true" />
            {t("dashboard.changeUser")}
          </button>
        </div>
      </div>
    </section>
  );
}
