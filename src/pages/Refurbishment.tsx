import { BatteryCharging, CheckCircle2, ExternalLink, Network } from "lucide-react";
import RefurbishmentCard from "../components/RefurbishmentCard";
import { refurbishmentPoints } from "../data/refurbishment";
import { useI18n } from "../i18n";
import type { PageId } from "../types";

interface RefurbishmentProps {
  onNavigate: (page: PageId) => void;
}

const stepKeys = ["refurb.step1", "refurb.step2", "refurb.step3", "refurb.step4", "refurb.step5"];

const eligibilityLinks = [
  {
    name: "AbilityNet Free Device Scheme",
    url: "https://abilitynet.org.uk/free-tech",
    note: "Free or low-cost tech for disabled and older people."
  },
  {
    name: "Good Things Foundation — Device Access",
    url: "https://www.goodthingsfoundation.org/our-work/device-access/",
    note: "Refurbished device access for low-income households across the UK."
  },
  {
    name: "Birmingham Device Bank",
    url: "https://www.birmingham.gov.uk/",
    note: "Local scheme for residents who cannot afford a device — ask at a support point."
  },
  {
    name: "Digital NNS",
    url: "https://www.digitalnns.com/",
    note: "Refurbished devices for people on low incomes or benefits."
  },
  {
    name: "A Father's Child Services",
    url: "https://www.afatherchild.co.uk/",
    note: "Local Ladywood organisation supporting families with device and data access."
  }
];

export default function Refurbishment({ onNavigate }: RefurbishmentProps) {
  const { t } = useI18n();

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">{t("refurb.eyebrow")}</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Refurbished Devices and Device Support</h1>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-700">
            Find free and low-cost laptops, phones, and device support in Ladywood. Local pickup points, repair events, and eligibility checks all in one place.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">

            {/* Looking for a device */}
            <div>
              <h2 className="text-2xl font-black text-ink">Looking for a free or low-cost device?</h2>
              <p className="mt-2 text-base text-slate-700">
                These local points offer refurbished laptops and phones, device checks, and setup help. All are free or very low cost.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {refurbishmentPoints.map((point) => (
                  <RefurbishmentCard key={point.id} point={point} />
                ))}
              </div>
            </div>

            {/* National eligibility schemes */}
            <div className="govuk-panel p-5">
              <h2 className="text-xl font-black text-ink">National schemes — check your eligibility</h2>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                These national organisations provide free or low-cost devices to eligible people. Staff at any local support point can help you apply.
              </p>
              <ul className="mt-4 space-y-3">
                {eligibilityLinks.map((link) => (
                  <li key={link.url} className="border-t border-slate-200 pt-3">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-1 font-bold text-lagoon-700"
                    >
                      {link.name}
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                    <span className="mt-1 block text-sm text-slate-600">{link.note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need data or internet access too */}
            <div className="govuk-panel border-2 border-lagoon-700 p-5">
              <h2 className="text-xl font-black text-ink">Need internet access or a SIM too?</h2>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Free SIM cards, mobile data, and affordable broadband deals are available separately on the Access Data page.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("access-data")}
                className="govuk-button mt-4 px-5 py-3"
              >
                Access data and affordable internet
              </button>
            </div>
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
              <button
                type="button"
                onClick={() => onNavigate("donate")}
                className="govuk-button mt-4 w-full px-4 py-3 text-sm"
              >
                Donate a device
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
