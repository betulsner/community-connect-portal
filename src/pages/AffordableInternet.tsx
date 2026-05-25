import { CheckCircle2, ExternalLink, MapPin, Wifi } from "lucide-react";
import type { PageId } from "../types";

interface AffordableInternetProps {
  onNavigate: (page: PageId) => void;
}

const eligibilityBenefits = [
  "Universal Credit",
  "Pension Credit",
  "Employment and Support Allowance (ESA)",
  "Job Seekers Allowance (JSA)",
  "Personal Independence Payment (PIP)",
  "Child Tax Credit (income under threshold)",
  "Housing Benefit",
  "Income Support"
];

const providers = [
  { name: "Virgin Media Essential", price: "£20/month", speed: "Up to 15 Mbps", note: "For those on qualifying benefits. No setup fee.", url: "https://www.virginmedia.com/broadband/essential" },
  { name: "Vodafone Together", price: "From £12/month", speed: "Up to 35 Mbps", note: "Broadband and calls bundle for low-income households.", url: "https://www.vodafone.co.uk/broadband/together" },
  { name: "BT Basic", price: "£15/month", speed: "Up to 10 Mbps", note: "Available to those on qualifying benefits.", url: "https://www.bt.com/broadbandproducts/bt-basic" },
  { name: "Sky Broadband Basics", price: "From £20/month", speed: "Up to 11 Mbps", note: "For Universal Credit and housing benefit claimants.", url: "https://www.sky.com/shop/broadband/basic" },
  { name: "NOW Broadband", price: "From £18/month", speed: "Up to 11 Mbps", note: "Flexible no-contract options for low-income households.", url: "https://www.nowtv.com/broadband" },
  { name: "EE Social Tariff", price: "£15/month", speed: "Up to 36 Mbps", note: "Requires benefits verification.", url: "https://ee.co.uk/broadband" },
  { name: "O2 Social Tariff", price: "£10/month", speed: "Mobile data", note: "Free or low-cost mobile data for eligible customers.", url: "https://www.o2.co.uk/" },
  { name: "SMARTY (Three)", price: "From £5/month", speed: "4G/5G mobile", note: "SIM-only plans, no contract. Free data can be donated.", url: "https://smarty.co.uk/" },
  { name: "VOXI (Vodafone)", price: "From £10/month", speed: "4G/5G mobile", note: "Unlimited social media data on some plans.", url: "https://www.voxi.co.uk/" }
];

export default function AffordableInternet({ onNavigate }: AffordableInternetProps) {
  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">Connectivity support</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Affordable Internet Options</h1>
          <p className="mt-4 text-xl font-semibold leading-relaxed text-slate-700">
            If you are on certain benefits, you may qualify for broadband or mobile data from as little as £10–£20 per month — sometimes even free.
          </p>
        </div>

        <div className="space-y-8">

          {/* What are social tariffs */}
          <div className="govuk-panel bg-lagoon-50 p-5 max-w-3xl">
            <h2 className="text-2xl font-black text-ink">What are social tariffs?</h2>
            <p className="mt-3 text-base text-slate-700">
              Social tariffs are discounted broadband and mobile deals offered by major providers to households on qualifying benefits. They are not widely advertised, but you have the right to ask your current provider or switch to one that offers them.
            </p>
            <p className="mt-3 text-base text-slate-700">
              OFCOM publishes a full list of all current social tariff providers.
            </p>
            <a
              href="https://www.ofcom.org.uk/phones-and-broadband/saving-money/social-tariffs"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 flex items-center gap-1 font-bold text-lagoon-700"
            >
              OFCOM Social Tariffs Guide
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Eligibility */}
          <div className="govuk-panel p-5 max-w-3xl">
            <h2 className="text-2xl font-black text-ink">Who can apply?</h2>
            <p className="mt-3 text-base text-slate-700">
              You may qualify if your household receives any of the following:
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
              Each provider has slightly different eligibility criteria. Staff at local support points can help you check and apply.
            </p>
          </div>

          {/* Provider table */}
          <div>
            <h2 className="text-2xl font-black text-ink">Providers offering social tariffs</h2>
            <p className="mt-2 text-base text-slate-700">Prices shown are approximate — check each provider for current offers.</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {providers.map((provider) => (
                <article key={provider.name} className="govuk-panel flex flex-col p-5">
                  <h3 className="text-lg font-black text-ink">{provider.name}</h3>
                  <p className="mt-1 text-2xl font-black text-lagoon-700">{provider.price}</p>
                  <p className="mt-1 text-sm font-bold text-slate-600">{provider.speed}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{provider.note}</p>
                  <a
                    href={provider.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 flex items-center gap-1 text-sm font-bold text-lagoon-700"
                  >
                    Visit website
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>

          {/* Free mobile data */}
          <div className="govuk-panel bg-lagoon-50 p-5 max-w-3xl">
            <Wifi size={24} className="text-lagoon-700" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-black text-ink">Need mobile data right now?</h2>
            <p className="mt-2 text-base text-slate-700">
              If you cannot afford mobile data at all, you may be able to get a free SIM with data through the National Databank — distributed by local charities in Ladywood.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("free-sim")}
              className="govuk-button mt-4 px-5 py-3"
            >
              Find out about free SIM cards
            </button>
          </div>

          {/* Local support */}
          <div className="govuk-panel p-5 max-w-3xl">
            <h2 className="text-xl font-black text-ink">Get help applying in Ladywood</h2>
            <p className="mt-2 text-base text-slate-700">
              Staff at local support points can help you check eligibility, compare providers, and contact your current provider to ask about switching to a social tariff.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("connect")}
              className="govuk-button govuk-button--secondary mt-4 px-5 py-3"
            >
              <MapPin size={16} aria-hidden="true" />
              Find local help on the map
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
