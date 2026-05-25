import { CheckCircle2, ExternalLink, MapPin, Smartphone, Wifi } from "lucide-react";
import type { PageId } from "../types";

interface FreeSimProps {
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

const localOrgs = [
  {
    name: "A Father's Child Services CIC",
    area: "Ladywood and Newtown",
    contact: "Contact via local community boards or ask at the bench.",
    note: "Referrals for families and individuals without mobile data."
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
    note: "Data support for families with children in need."
  },
  {
    name: "British Red Cross",
    area: "West Midlands",
    contact: "Ask at Spring Hill Library Hub",
    note: "Emergency connectivity support including SIM cards."
  },
  {
    name: "Ladywood Digital Drop-in",
    area: "Ladywood Health and Community Centre",
    contact: "Ask at reception — Mon, Wed, Fri 10:00-15:00",
    note: "Referrals to National Databank and local SIM distribution."
  }
];

export default function FreeSim({ onNavigate }: FreeSimProps) {
  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">Connectivity support</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Free SIM Cards and Mobile Data</h1>
          <p className="mt-4 text-xl font-semibold leading-relaxed text-slate-700">
            If you cannot afford mobile data, you may be able to get a free SIM card with data through the National Databank or local organisations in Ladywood.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">

            {/* What is the National Databank */}
            <div className="govuk-panel bg-lagoon-50 p-5">
              <div className="flex items-start gap-3">
                <Wifi size={24} className="shrink-0 text-lagoon-700 mt-1" aria-hidden="true" />
                <div>
                  <h2 className="text-2xl font-black text-ink">What is the National Databank?</h2>
                  <p className="mt-3 text-base text-slate-700">
                    The National Databank is run by Good Things Foundation and provides free SIM cards with mobile data to people who cannot afford to stay connected. It works like a food bank — but for data.
                  </p>
                  <p className="mt-3 text-base text-slate-700">
                    Eligible people can receive a free SIM with 20GB of data, 1000 minutes of calls, and unlimited texts per month. SIMs are distributed through local charities and community organisations.
                  </p>
                  <a
                    href="https://www.vodafone.co.uk/foundation/connecting-for-good/national-databank/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 flex items-center gap-1 font-bold text-lagoon-700"
                  >
                    Learn more about the National Databank
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Eligibility */}
            <div className="govuk-panel p-5">
              <h2 className="text-2xl font-black text-ink">Who is eligible?</h2>
              <p className="mt-3 text-base text-slate-700">
                You may qualify for a free SIM if you are on one or more of the following benefits:
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {eligibilityBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={15} className="shrink-0 text-green-700" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Not sure if you qualify? Ask at any local support point — staff can help check eligibility without any pressure.
              </p>
            </div>

            {/* Local organisations */}
            <div className="govuk-panel p-5">
              <h2 className="text-2xl font-black text-ink">Where to get a free SIM in Ladywood</h2>
              <p className="mt-3 text-base text-slate-700">
                These local organisations can help you get connected with a free SIM or mobile data referral.
              </p>
              <div className="mt-4 space-y-4">
                {localOrgs.map((org) => (
                  <div key={org.name} className="border-t border-slate-200 pt-4">
                    <h3 className="font-black text-ink">{org.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-lagoon-700">{org.area}</p>
                    <p className="mt-1 text-sm text-slate-600">{org.note}</p>
                    <p className="mt-1 text-sm font-bold text-slate-700">Contact: {org.contact}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button type="button" onClick={() => onNavigate("connect")} className="govuk-button px-5 py-3">
                <MapPin size={16} aria-hidden="true" />
                Find SIM support on the map
              </button>
              <button type="button" onClick={() => onNavigate("affordable-internet")} className="govuk-button govuk-button--secondary px-5 py-3">
                See affordable internet options
              </button>
            </div>
          </div>

          {/* Aside */}
          <aside className="space-y-4">
            <div className="hc-panel govuk-panel bg-lagoon-50 p-5">
              <Smartphone size={24} className="text-lagoon-700" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-black text-ink">Already have a phone?</h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
                If you have a working smartphone but no data, a free SIM from the National Databank can get you connected within days.
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-700">
                Need a device too? Visit the Refurbishment page to find out about free and low-cost laptops and phones.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("refurbishment")}
                className="govuk-button govuk-button--secondary mt-4 w-full px-4 py-3 text-sm"
              >
                Refurbished devices
              </button>
            </div>

            <div className="govuk-panel p-5">
              <h3 className="text-lg font-black text-ink">At the bench now?</h3>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                You can use the free Wi-Fi at any Community Connect Bench to look up these services without using your data.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("connect")}
                className="govuk-button govuk-button--secondary mt-4 w-full px-4 py-3 text-sm"
              >
                <Wifi size={14} aria-hidden="true" />
                Find a bench
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
