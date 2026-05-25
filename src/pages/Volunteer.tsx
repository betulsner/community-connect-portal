import { CheckCircle2, Clock, Heart, MapPin, Users } from "lucide-react";
import type { PageId } from "../types";

interface VolunteerProps {
  onNavigate: (page: PageId) => void;
}

const tasks = [
  "Sit with a resident and help them set up an email account or use the NHS app.",
  "Help someone write or upload their CV at a library session.",
  "Show a neighbour how to video call family on a smartphone or tablet.",
  "Help people get started at a digital drop-in session.",
  "Explain how to stay safe online and recognise scams.",
  "Support people at repair and refurbishment events.",
  "Be a friendly face at community café meetups."
];

const whoCanVolunteer = [
  "You are 16 or over.",
  "You can use a smartphone, tablet, or laptop for everyday tasks.",
  "You are patient and friendly — no teaching experience needed.",
  "You can spare 2–3 hours per month."
];

const benefits = [
  { icon: Heart, text: "Make a real difference to neighbours who feel isolated or left behind online." },
  { icon: Users, text: "Meet other volunteers and become part of the Ladywood community network." },
  { icon: Clock, text: "Flexible — choose sessions that fit your schedule." },
  { icon: CheckCircle2, text: "Receive free training and ongoing support from our Digital Inclusion team." }
];

export default function Volunteer({ onNavigate }: VolunteerProps) {
  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">Volunteering</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Become a Digital Champion</h1>
          <p className="mt-4 text-xl font-semibold leading-relaxed text-slate-700">
            Help neighbours in Ladywood get online, build confidence, and access the services they need — one conversation at a time.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">

            {/* What you will do */}
            <div className="govuk-panel p-5">
              <h2 className="text-2xl font-black text-ink">What you will do</h2>
              <p className="mt-3 text-base text-slate-700">
                Digital Champions are friendly volunteers who sit alongside residents and help with everyday digital tasks. No formal teaching is required — just patience and a willingness to help.
              </p>
              <ul className="mt-4 space-y-2">
                {tasks.map((task) => (
                  <li key={task} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-700" aria-hidden="true" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            {/* Who can volunteer */}
            <div className="govuk-panel p-5">
              <h2 className="text-2xl font-black text-ink">Who can volunteer</h2>
              <p className="mt-3 text-base text-slate-700">You may be a great Digital Champion if:</p>
              <ul className="mt-4 space-y-2">
                {whoCanVolunteer.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-lagoon-700" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                We welcome volunteers from all backgrounds and experiences. Community languages are a huge asset.
              </p>
            </div>

            {/* Sign up */}
            <div className="govuk-panel bg-lagoon-50 p-5">
              <h2 className="text-2xl font-black text-ink">Ready to sign up?</h2>
              <p className="mt-3 text-base text-slate-700">
                Get in touch with our team and we will match you to sessions near you. Training is provided and you can choose how often you volunteer.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onNavigate("about")}
                  className="govuk-button flex-1 px-5 py-3"
                >
                  Contact us to sign up
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("connect")}
                  className="govuk-button govuk-button--secondary flex-1 px-5 py-3"
                >
                  <MapPin size={16} aria-hidden="true" />
                  See volunteer events
                </button>
              </div>
            </div>
          </div>

          {/* Aside — benefits */}
          <aside className="space-y-4">
            <div className="hc-panel govuk-panel bg-lagoon-50 p-5">
              <h2 className="text-xl font-black text-ink">Why volunteer?</h2>
              <div className="mt-4 space-y-4">
                {benefits.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <Icon size={20} className="mt-0.5 shrink-0 text-lagoon-700" aria-hidden="true" />
                    <p className="text-sm font-semibold text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="govuk-panel p-5">
              <h3 className="text-lg font-black text-ink">Sessions near you</h3>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Volunteer sessions run weekly across Ladywood — at libraries, health centres, cafes, and community rooms.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("connect")}
                className="govuk-button govuk-button--secondary mt-4 w-full px-4 py-3 text-sm"
              >
                <MapPin size={14} aria-hidden="true" />
                Open the map
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
