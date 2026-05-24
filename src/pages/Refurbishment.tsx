import { BatteryCharging, CheckCircle2, ExternalLink, Network, PoundSterling, Smartphone, Wifi } from "lucide-react";
import RefurbishmentCard from "../components/RefurbishmentCard";
import { refurbishmentPoints } from "../data/refurbishment";
import { useI18n } from "../i18n";

const stepKeys = ["refurb.step1", "refurb.step2", "refurb.step3", "refurb.step4", "refurb.step5"];

const socialTariffLinks = [
  { name: "BT Basic Broadband", url: "https://www.bt.com/broadbandproducts/bt-basic", note: "£15/month for eligible customers" },
  { name: "Sky Broadband Basics", url: "https://www.sky.com/shop/broadband/basic", note: "Low-cost broadband for Universal Credit claimants" },
  { name: "Virgin Media Essential", url: "https://www.virginmedia.com/broadband/essential", note: "£20/month for those on qualifying benefits" },
  { name: "Vodafone Together", url: "https://www.vodafone.co.uk/broadband/together", note: "Broadband + calls bundle for low-income households" },
  { name: "OFCOM Social Tariffs Guide", url: "https://www.ofcom.org.uk/phones-and-broadband/saving-money/social-tariffs", note: "Full list of all social tariff providers" }
];

const refurbLinks = [
  { name: "AbilityNet Free Device Scheme", url: "https://abilitynet.org.uk/free-tech", note: "Free/low-cost tech for disabled and older people" },
  { name: "Good Things Foundation", url: "https://www.goodthingsfoundation.org/our-work/device-access/", note: "Refurbished device access for low-income households" },
  { name: "Connecting Families (Vodafone)", url: "https://www.vodafone.co.uk/foundation/connecting-for-good/", note: "Free SIM and data for eligible families" }
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
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {refurbishmentPoints.map((point) => (
                <RefurbishmentCard key={point.id} point={point} />
              ))}
            </div>

            {/* Eligibility links */}
            <div className="govuk-panel p-5">
              <h2 className="text-xl font-black text-ink">Check your eligibility for a free or cheap device</h2>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                These national schemes may be able to help you get a device or affordable broadband. Staff at any local support point can help you apply.
              </p>
              <ul className="mt-4 space-y-3">
                {refurbLinks.map((link) => (
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

            {/* Social tariff links */}
            <div className="govuk-panel p-5">
              <h2 className="text-xl font-black text-ink">Cheap broadband — social tariffs</h2>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                If you receive Universal Credit, Pension Credit, or other qualifying benefits, you may be entitled to broadband from as little as £15/month.
              </p>
              <ul className="mt-4 space-y-3">
                {socialTariffLinks.map((link) => (
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

            <article className="hc-panel govuk-panel p-5">
              <p className="flex items-center gap-2 text-sm font-extrabold text-lagoon-700">
                <Wifi size={18} aria-hidden="true" />
                {t("refurb.internet.title")}
              </p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">{t("refurb.internet.text")}</p>
            </article>

            <article className="hc-panel govuk-panel p-5">
              <p className="flex items-center gap-2 text-sm font-extrabold text-lagoon-700">
                <PoundSterling size={18} aria-hidden="true" />
                {t("refurb.tariff.title")}
              </p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">{t("refurb.tariff.text")}</p>
            </article>

            <article className="hc-panel govuk-panel p-5">
              <p className="flex items-center gap-2 text-sm font-extrabold text-lagoon-700">
                <Smartphone size={18} aria-hidden="true" />
                {t("refurb.data.title")}
              </p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">{t("refurb.data.text")}</p>
            </article>

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
