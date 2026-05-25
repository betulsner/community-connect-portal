import { CheckCircle2, ExternalLink, MapPin, Smartphone, Wifi } from "lucide-react";
import type { PageId } from "../types";

interface AccessDataProps {
  onNavigate: (page: PageId) => void;
}

const eligibilityBenefits = [
  "Universal Credit",
  "Personal Independence Payment (PIP)",
  "Employment and Support Allowance (ESA)",
  "Job Seekers Allowance (JSA)",
  "Pension Credit",
  "Housing Benefit",
  "Income Support",
  "Child Tax Credit (below income threshold)"
];

const freeSimOrgs: Array<{
  name: string;
  area: string;
  contact: string;
  note: string;
  mapLabel?: string;
}> = [
  {
    name: "A Father's Child Services CIC",
    area: "Ladywood and Newtown",
    contact: "Contact via local community boards or ask at the bench.",
    note: "Referrals for families and individuals without mobile data.",
    mapLabel: "Ladywood Community Connect Bench"
  },
  {
    name: "Age UK Birmingham",
    area: "Across Birmingham",
    contact: "0121 437 0033",
    note: "Free SIM and data support for older adults."
  },
  {
    name: "Action for Children",
    area: "Birmingham",
    contact: "Ask at Ladywood Digital Drop-in",
    note: "Data support for families with children in need.",
    mapLabel: "Ladywood Digital Drop-in"
  },
  {
    name: "British Red Cross",
    area: "West Midlands",
    contact: "Ask at Spring Hill Library Hub",
    note: "Emergency connectivity support including SIM cards.",
    mapLabel: "Spring Hill Library Hub"
  },
  {
    name: "Ladywood Digital Drop-in",
    area: "Ladywood Health and Community Centre",
    contact: "Ask at reception — Mon, Wed, Fri 10:00-15:00",
    note: "Referrals to National Databank and local SIM distribution.",
    mapLabel: "Ladywood Digital Drop-in"
  }
];

const providers = [
  { name: "Virgin Media Essential", price: "£20/month", speed: "Up to 15 Mbps", note: "For those on qualifying benefits. No setup fee.", url: "https://www.virginmedia.com/broadband/essential" },
  { name: "Vodafone Together", price: "From £12/month", speed: "Up to 35 Mbps", note: "Broadband and calls bundle for low-income households.", url: "https://www.vodafone.co.uk/broadband/together" },
  { name: "BT Basic", price: "£15/month", speed: "Up to 10 Mbps", note: "Available to those on qualifying benefits.", url: "https://www.bt.com/broadbandproducts/bt-basic" },
  { name: "Sky Broadband Basics", price: "From £20/month", speed: "Up to 11 Mbps", note: "For Universal Credit and housing benefit claimants.", url: "https://www.sky.com/shop/broadband/basic" },
  { name: "EE Social Tariff", price: "£15/month", speed: "Up to 36 Mbps", note: "Requires benefits verification.", url: "https://ee.co.uk/broadband" },
  { name: "O2 Social Tariff", price: "£10/month", speed: "Mobile data", note: "Low-cost mobile data for eligible customers.", url: "https://www.o2.co.uk/" },
  { name: "SMARTY (Three)", price: "From £5/month", speed: "4G/5G mobile", note: "SIM-only, no contract.", url: "https://smarty.co.uk/" },
  { name: "VOXI (Vodafone)", price: "From £10/month", speed: "4G/5G mobile", note: "Unlimited social media data on some plans.", url: "https://www.voxi.co.uk/" }
];

export default function AccessData({ onNavigate }: AccessDataProps) {
  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">Connectivity support</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Access Data and Affordable Internet</h1>
          <p className="mt-4 text-xl font-semibold leading-relaxed text-slate-700">
            Help getting online — free SIM cards with mobile data, and low-cost broadband deals for people on qualifying benefits.
          </p>
        </div>

        <div className="space-y-10">

          {/* Section 1 — Free SIM / National Databank */}
          <div>
            <h2 className="text-2xl font-black text-ink">Free SIM cards and mobile data</h2>

            <div className="mt-5 govuk-panel bg-lagoon-50 p-5 max-w-3xl">
              <div className="flex items-start gap-3">
                <Wifi size={22} className="shrink-0 text-lagoon-700 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-black text-ink">What is the National Databank?</h3>
                  <p className="mt-2 text-base text-slate-700">
                    The National Databank provides free SIM cards with mobile data to people who cannot afford to stay connected. It works like a food bank — but for data. Eligible people can receive a free SIM with 20GB of data, 1000 minutes, and unlimited texts per month.
                  </p>
                  <a
                    href="https://www.vodafone.co.uk/foundation/connecting-for-good/national-databank/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-3 flex items-center gap-1 font-bold text-lagoon-700"
                  >
                    Learn more about the National Databank
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 govuk-panel p-5 max-w-3xl">
              <h3 className="text-xl font-black text-ink">Who is eligible?</h3>
              <p className="mt-2 text-base text-slate-700">You may qualify if your household receives any of these benefits:</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {eligibilityBenefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={14} className="shrink-0 text-green-700" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <h3 className="text-xl font-black text-ink">Where to get a free SIM in Ladywood</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {freeSimOrgs.map((org) => (
                  <article key={org.name} className="govuk-panel flex flex-col p-5">
                    <h4 className="font-black text-ink">{org.name}</h4>
                    <p className="mt-1 text-sm font-semibold text-lagoon-700">{org.area}</p>
                    <p className="mt-2 text-sm text-slate-600">{org.note}</p>
                    <p className="mt-2 text-sm font-bold text-slate-700">Contact: {org.contact}</p>
                    <button
                      type="button"
                      onClick={() => onNavigate("connect")}
                      className="govuk-button govuk-button--secondary mt-4 flex items-center gap-1 self-start px-3 py-2 text-sm"
                    >
                      <MapPin size={13} aria-hidden="true" />
                      {org.mapLabel ? `Find on map` : "Show on map"}
                    </button>
                    {org.mapLabel && (
                      <p className="mt-1 text-xs text-slate-500">Look for "{org.mapLabel}" on the map</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 — Social tariffs / affordable broadband */}
          <div>
            <h2 className="text-2xl font-black text-ink">Affordable broadband — social tariffs</h2>
            <p className="mt-3 text-base text-slate-700 max-w-3xl">
              Social tariffs are discounted broadband deals offered by major providers to households on qualifying benefits. They are not widely advertised — but you have the right to ask your current provider or switch to one that offers them. Staff at local support points can help you apply.
            </p>
            <a
              href="https://www.ofcom.org.uk/phones-and-broadband/saving-money/social-tariffs"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-1 font-bold text-lagoon-700"
            >
              OFCOM Social Tariffs Guide — full list of providers
              <ExternalLink size={13} aria-hidden="true" />
            </a>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {providers.map((provider) => (
                <article key={provider.name} className="govuk-panel flex flex-col p-5">
                  <h3 className="text-base font-black text-ink">{provider.name}</h3>
                  <p className="mt-1 text-2xl font-black text-lagoon-700">{provider.price}</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-600">{provider.speed}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{provider.note}</p>
                  <a
                    href={provider.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-3 flex items-center gap-1 text-sm font-bold text-lagoon-700"
                  >
                    Visit website <ExternalLink size={11} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>

          {/* Already have a phone */}
          <div className="govuk-panel bg-lagoon-50 p-5 max-w-3xl">
            <Smartphone size={22} className="text-lagoon-700" aria-hidden="true" />
            <h3 className="mt-3 text-xl font-black text-ink">Need a device too?</h3>
            <p className="mt-2 text-base text-slate-700">
              If you need a phone or laptop as well as data, the Refurbishment page lists local pickup points for free and low-cost devices.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => onNavigate("refurbishment")} className="govuk-button px-5 py-3">
                Find a refurbished device
              </button>
              <button type="button" onClick={() => onNavigate("connect")} className="govuk-button govuk-button--secondary px-5 py-3">
                <MapPin size={14} aria-hidden="true" />
                Find local support on the map
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
