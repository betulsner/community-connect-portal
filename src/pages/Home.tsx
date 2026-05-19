import { BatteryCharging, CalendarDays, Coffee, HeartHandshake, MapPin, Trophy, Wifi, Wrench } from "lucide-react";
import Hero from "../components/Hero";
import RewardCard from "../components/RewardCard";
import { partners } from "../data/partners";
import { rewards } from "../data/rewards";
import type { PageId } from "../types";

interface HomeProps {
  onNavigate: (page: PageId) => void;
  onLogin: () => void;
}

const quickLinks: Array<{ title: string; text: string; page: PageId; icon: React.ElementType }> = [
  {
    title: "Local map",
    text: "Benches, Wi-Fi, charging, support centres, events, cafes, and device help.",
    page: "connect",
    icon: MapPin
  },
  {
    title: "Digital confidence",
    text: "Email, CVs, benefits, NHS services, printing, passwords, and online safety.",
    page: "digital",
    icon: HeartHandshake
  },
  {
    title: "Devices and data",
    text: "Refurbished laptops, repairs, donation points, social tariff guidance, and mobile data support.",
    page: "refurbishment",
    icon: Wrench
  },
  {
    title: "Events nearby",
    text: "Coffee meetups, beginner computer sessions, repair events, volunteering, and language support.",
    page: "events",
    icon: CalendarDays
  }
];

const earningWays = [
  "Attending digital help sessions",
  "Joining local events",
  "Completing beginner digital guides",
  "Visiting partner cafes",
  "Joining repair or refurbishment events"
];

export default function Home({ onNavigate, onLogin }: HomeProps) {
  return (
    <>
      <Hero onNavigate={onNavigate} onLogin={onLogin} />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <article key={link.title} className="hc-panel rounded-lg border border-slate-200 bg-white p-5 shadow-lift">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-lagoon-50 text-lagoon-700">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-xl font-black text-ink">{link.title}</h2>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">{link.text}</p>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.page)}
                    className="mt-5 rounded-lg bg-ink px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sun-500"
                  >
                    Open
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-lagoon-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-extrabold uppercase text-lagoon-700">Cafes and Community Partners</p>
            <h2 className="mt-2 text-3xl font-black text-ink">Friendly places linked to the bench network.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {partners.map((partner) => (
              <article key={partner.id} className="hc-panel rounded-lg border border-slate-200 bg-white p-5 shadow-lift">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-extrabold text-lagoon-700">
                      <Coffee size={17} aria-hidden="true" />
                      Community partner
                    </p>
                    <h3 className="mt-2 text-xl font-black text-ink">{partner.name}</h3>
                  </div>
                  <span className="rounded-lg bg-sun-100 px-3 py-1 text-xs font-extrabold text-sun-600">
                    {partner.reward}
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                  <p className="flex gap-2">
                    <Wifi size={18} className={partner.wifi ? "text-lagoon-700" : "text-slate-400"} aria-hidden="true" />
                    Wi-Fi {partner.wifi ? "available" : "not listed"}
                  </p>
                  <p className="flex gap-2">
                    <BatteryCharging size={18} className={partner.charging ? "text-lagoon-700" : "text-slate-400"} aria-hidden="true" />
                    Charging {partner.charging ? "available" : "not listed"}
                  </p>
                  <p>
                    <span className="font-extrabold text-ink">Digital help: </span>
                    {partner.digitalHelpHours}
                  </p>
                  <p>
                    <span className="font-extrabold text-ink">Address: </span>
                    {partner.address}
                  </p>
                  <p>
                    <span className="font-extrabold text-ink">Opening hours: </span>
                    {partner.openingHours}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-extrabold uppercase text-lagoon-700">Rewards</p>
            <h2 className="mt-2 text-3xl font-black text-ink">Small rewards for building connection.</h2>
            <div className="mt-5 rounded-lg bg-lagoon-50 p-5">
              <p className="flex items-center gap-2 text-sm font-extrabold text-lagoon-700">
                <Trophy size={18} aria-hidden="true" />
                Earn points by
              </p>
              <ul className="mt-4 space-y-2 text-sm font-bold text-slate-700">
                {earningWays.map((way) => (
                  <li key={way}>{way}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {rewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
