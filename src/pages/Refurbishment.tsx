import { CheckCircle2, ExternalLink, Laptop, Mail, MapPin } from "lucide-react";
import RefurbishmentCard from "../components/RefurbishmentCard";
import { refurbishmentPoints } from "../data/refurbishment";
import type { PageId } from "../types";

interface RefurbishmentProps {
  onNavigate: (page: PageId) => void;
  onNavigateToMap?: (locationId: string) => void;
}

const nationalDatabankStatus = {
  label: "National Devicebank",
  status: "Active — devices being distributed",
  statusGood: true,
  url: "https://www.devicebank.org.uk/",
  note: "The National Devicebank collects and redistributes refurbished laptops and tablets to people who need them most. Contact one of the hubs below to check your eligibility and request a device."
};

const eligibilityLinks = [
  {
    name: "Good Things Foundation — Device Access",
    url: "https://www.goodthingsfoundation.org/our-work/device-access/",
    note: "Refurbished device access for low-income households across the UK."
  },
  {
    name: "AbilityNet Free Device Scheme",
    url: "https://abilitynet.org.uk/free-tech",
    note: "Free or low-cost tech for disabled and older people."
  },
  {
    name: "Digital NNS",
    url: "https://www.digitalnns.com/",
    note: "Refurbished devices for people on low incomes or benefits."
  }
];

export default function Refurbishment({ onNavigate, onNavigateToMap }: RefurbishmentProps) {
  const handleFindOnMap = (locationId: string) => {
    if (onNavigateToMap) {
      onNavigateToMap(locationId);
    } else {
      onNavigate("connect");
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">

        {/* Page header */}
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">Refurbishment and Device Support</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Need a free or low-cost device?</h1>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-700">
            Local hubs can help you access a refurbished laptop or tablet through the National Devicebank. Follow the steps below.
          </p>
        </div>

        {/* Step-by-step flow */}
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-black text-ink mb-5">How to get a device</h2>
          <ol className="space-y-4">
            {[
              { step: 1, title: "Check availability at the listed hubs", desc: "Look at the hubs below to see which ones currently have devices available." },
              { step: 2, title: "Check your eligibility", desc: "Most hubs require you to be on qualifying benefits or have low household income with no working device at home." },
              { step: 3, title: "Contact a hub using their email", desc: "Email the hub directly — they will guide you through the next steps." },
              { step: 4, title: "Join a digital skills event", desc: "Once you receive a device, attend a local event to learn the basics and earn stamps." },
            ].map(({ step, title, desc }) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-9 w-9 min-w-9 items-center justify-center bg-ink text-white font-black text-lg">
                  {step}
                </span>
                <div>
                  <p className="font-extrabold text-ink">{title}</p>
                  <p className="mt-0.5 text-sm text-slate-600">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* National Devicebank status */}
        <div className="mb-8 max-w-2xl govuk-panel bg-lagoon-50 p-5">
          <div className="flex items-start gap-3">
            <Laptop size={22} className="shrink-0 text-lagoon-700 mt-1" aria-hidden="true" />
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-black text-ink">{nationalDatabankStatus.label}</h2>
                <span className={`px-3 py-1 text-xs font-bold ${nationalDatabankStatus.statusGood ? "bg-green-100 text-green-800" : "bg-red-50 text-red-700"}`}>
                  {nationalDatabankStatus.statusGood ? <CheckCircle2 className="inline mr-1" size={12} /> : null}
                  {nationalDatabankStatus.status}
                </span>
              </div>
              <p className="mt-2 text-base text-slate-700">{nationalDatabankStatus.note}</p>
              <a
                href={nationalDatabankStatus.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 flex items-center gap-1 text-sm font-bold text-lagoon-700"
              >
                Visit the National Devicebank website
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">

            {/* Hub locations */}
            <div>
              <h2 className="text-2xl font-black text-ink mb-2">Local device hubs</h2>
              <p className="text-base text-slate-700 mb-5">
                These hubs are Ladywood-area National Devicebank partners. Contact them by email to check your eligibility and request a device.
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                {refurbishmentPoints.map((point) => (
                  <RefurbishmentCard key={point.id} point={point} onFindOnMap={handleFindOnMap} />
                ))}
              </div>
            </div>

            {/* Additional eligibility resources */}
            <div className="govuk-panel p-5">
              <h2 className="text-xl font-black text-ink">Other national schemes</h2>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Additional organisations also provide free or low-cost devices to eligible residents.
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

            {/* Need data too */}
            <div className="govuk-panel border-2 border-lagoon-700 p-5">
              <h2 className="text-xl font-black text-ink">Need internet access or a SIM too?</h2>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Free SIM cards, mobile data, and affordable broadband deals are available on the Access Data page.
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

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Back to map */}
            <div className="govuk-panel bg-lagoon-50 p-5">
              <MapPin size={22} className="text-lagoon-700" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black text-ink">Find hubs on the map</h3>
              <p className="mt-2 text-sm text-slate-700">
                See all device hubs, digital inclusion centres, and drop-in places on the Connect with the City map.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("connect")}
                className="govuk-button govuk-button--secondary mt-4 w-full px-4 py-3 text-sm"
              >
                <MapPin size={14} aria-hidden="true" />
                Go to Connect with the City
              </button>
            </div>

            {/* Contact email reminder */}
            <div className="border-2 border-ink bg-ink p-5 text-white">
              <Mail size={20} className="text-sun-100" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black">Contact a hub directly</h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed">
                Email any of the hubs above. Tell them your postcode, the type of device you need, and which benefits you receive.
              </p>
              <ul className="mt-4 space-y-2">
                {refurbishmentPoints.map((p) => (
                  <li key={p.id} className="text-sm">
                    <span className="font-bold text-sun-100">{p.name}</span>
                    <br />
                    <a href={`mailto:${p.email}`} className="text-white underline">{p.email}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Donate a device */}
            <div className="govuk-panel p-5">
              <h3 className="text-lg font-black text-ink">Have a spare device?</h3>
              <p className="mt-2 text-sm text-slate-700">
                Donate a working laptop or phone and help a local resident get online.
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
