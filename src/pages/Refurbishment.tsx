import { BatteryCharging, CheckCircle2, Network, PoundSterling, Smartphone, Wifi } from "lucide-react";
import RefurbishmentCard from "../components/RefurbishmentCard";
import { refurbishmentPoints } from "../data/refurbishment";

const steps = [
  "Find a nearby support point",
  "Check eligibility",
  "Attend a device session",
  "Receive setup help",
  "Learn basic digital skills"
];

const supportNotes = [
  {
    icon: Wifi,
    title: "Free or cheap internet support",
    text: "Local workers can explain free Wi-Fi spots, low-cost broadband routes, and safe ways to use shared computers."
  },
  {
    icon: PoundSterling,
    title: "Social tariff guidance",
    text: "Residents can ask for help checking eligibility and preparing the details needed before contacting providers."
  },
  {
    icon: Smartphone,
    title: "Mobile data support",
    text: "National Databank-style referrals can help eligible residents access mobile data and device setup support."
  }
];

export default function Refurbishment() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-extrabold uppercase text-lagoon-700">Refurbishment and Device Support</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Find devices, repairs, donations, and data help.</h1>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-700">
            Local support points can help with refurbished device pickup, laptop donation, repairs, device support applications, and affordable internet routes.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4 md:grid-cols-2">
            {refurbishmentPoints.map((point) => (
              <RefurbishmentCard key={point.id} point={point} />
            ))}
          </div>

          <aside className="space-y-5">
            <div className="hc-panel rounded-lg border border-lagoon-200 bg-lagoon-50 p-5 shadow-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-lagoon-700 text-white">
                <BatteryCharging size={24} aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-2xl font-black text-ink">Need a device?</h2>
              <ol className="mt-5 space-y-3">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm font-bold text-slate-700">
                    <span className="flex h-7 w-7 min-w-7 items-center justify-center rounded-lg bg-sun-500 text-white">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {supportNotes.map((note) => {
              const Icon = note.icon;
              return (
                <article key={note.title} className="hc-panel rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="flex items-center gap-2 text-sm font-extrabold text-lagoon-700">
                    <Icon size={18} aria-hidden="true" />
                    {note.title}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">{note.text}</p>
                </article>
              );
            })}

            <div className="rounded-lg bg-ink p-5 text-white">
              <p className="flex items-center gap-2 text-sm font-extrabold text-sun-100">
                <Network size={18} aria-hidden="true" />
                Donations and pickup
              </p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-white/85">
                Donation points accept usable laptops, chargers, and phones for local refurbishment partners.
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 size={18} aria-hidden="true" />
                Data is wiped before reuse in this prototype journey.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
