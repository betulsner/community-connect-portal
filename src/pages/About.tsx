import { useState } from "react";
import { Mail, MapPinned, Phone, Send, ShieldCheck, Users, Wifi } from "lucide-react";
import { useI18n } from "../i18n";

const team = [
  {
    name: "Sarah Mitchell",
    role: "Project Lead",
    email: "sarah.mitchell@communityconnect.ladywood.gov.uk",
    bio: "Sarah has worked in digital inclusion across Birmingham for over 10 years, focusing on connecting underserved communities with free technology and support."
  },
  {
    name: "Raj Patel",
    role: "Digital Inclusion Officer",
    email: "raj.patel@communityconnect.ladywood.gov.uk",
    bio: "Raj manages the network of digital drop-in sessions across Ladywood and trains volunteer tech buddies to support residents."
  },
  {
    name: "Aisha Osei",
    role: "Community Engagement Coordinator",
    email: "aisha.osei@communityconnect.ladywood.gov.uk",
    bio: "Aisha coordinates outreach in community languages and ensures the programme is accessible to all residents, including recent arrivals."
  },
  {
    name: "Tom Farrell",
    role: "Tech Support Volunteer Lead",
    email: "tech@communityconnect.ladywood.gov.uk",
    bio: "Tom coordinates the refurbishment programme, device donation drives, and Saturday repair events across Ladywood."
  }
];

export default function About() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container space-y-12">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-base font-bold text-slate-700">{t("about.eyebrow")}</p>
          <h1 className="mt-2 text-4xl font-black text-ink">{t("about.title")}</h1>
          <p className="mt-5 text-lg font-semibold leading-relaxed text-slate-700">
            {t("about.text1")}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-slate-700">
            {t("about.text2")}
          </p>
        </div>

        {/* What is Community Connect */}
        <div className="govuk-panel bg-lagoon-50 p-6 max-w-3xl">
          <h2 className="text-2xl font-black text-ink">What is Community Connect?</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Community Connect is a free digital inclusion programme run in partnership with Birmingham City Council, local libraries, and community organisations in Ladywood. Our goal is simple: make sure every resident can access the internet, get digital help, and feel confident online — without barriers of cost, language, or experience.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            We run smart benches with free Wi-Fi and USB charging, weekly digital drop-in sessions, device refurbishment and repair events, and a partner café network. Everything is free or very low cost, and we speak your language.
          </p>
        </div>

        {/* Concept tiles */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ConceptTile icon={Wifi} title={t("about.free.title")} text={t("about.free.text")} />
          <ConceptTile icon={Users} title={t("about.human.title")} text={t("about.human.text")} />
          <ConceptTile icon={ShieldCheck} title={t("about.confidence.title")} text={t("about.confidence.text")} />
          <ConceptTile icon={MapPinned} title={t("about.routes.title")} text={t("about.routes.text")} />
        </div>

        {/* Team section */}
        <div>
          <h2 className="text-3xl font-black text-ink">Meet the team</h2>
          <p className="mt-3 text-lg text-slate-700">We are a small, dedicated team of council staff and volunteers based in Ladywood.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article key={member.email} className="govuk-panel p-5">
                <div className="flex h-12 w-12 items-center justify-center bg-lagoon-700 text-white font-black text-xl">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="mt-3 text-base font-black text-ink">{member.name}</h3>
                <p className="text-sm font-bold text-lagoon-700">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                <a href={`mailto:${member.email}`} className="mt-3 flex items-center gap-1 text-xs text-lagoon-700 break-all">
                  <Mail size={12} aria-hidden="true" />
                  {member.email}
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* Contact and bench request */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-black text-ink">Get in touch</h2>
            <p className="mt-3 text-base text-slate-700">
              Have a question, want to volunteer, or looking to partner with us? We would love to hear from you.
            </p>
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-lagoon-700" aria-hidden="true" />
                <a href="mailto:hello@communityconnect.ladywood.gov.uk" className="font-bold text-lagoon-700">
                  hello@communityconnect.ladywood.gov.uk
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-lagoon-700" aria-hidden="true" />
                <span className="font-bold text-ink">0121 555 0147</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPinned size={20} className="text-lagoon-700" aria-hidden="true" />
                <span className="font-bold text-ink">Ladywood Health and Community Centre, Birmingham, B16 8PE</span>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-600">Office hours: Monday–Friday, 09:00–17:00. We aim to reply within 2 working days.</p>
          </div>

          <div className="hc-panel govuk-panel bg-lagoon-50 p-6">
            <p className="text-sm font-bold text-slate-700">{t("about.request.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-black text-ink">{t("about.request.title")}</h2>
            {submitted ? (
              <div className="govuk-panel mt-6 p-5 text-sm font-bold leading-relaxed text-slate-700">
                {t("about.request.done")}
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <Field id="suggested-location" label={t("about.request.location")} required />
                <TextArea id="area-need" label={t("about.request.need")} required />
                <Field id="nearby-partner" label={t("about.request.partner")} />
                <TextArea id="accessibility-needs" label={t("about.request.access")} />
                <Field id="contact-email" label={t("about.request.email")} type="email" />
                <button
                  type="submit"
                  className="govuk-button w-full px-4 py-3 text-base"
                >
                  <Send size={18} aria-hidden="true" />
                  {t("about.request.send")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ConceptTileProps {
  icon: React.ElementType;
  title: string;
  text: string;
}

function ConceptTile({ icon: Icon, title, text }: ConceptTileProps) {
  return (
    <article className="hc-panel govuk-panel p-5">
      <Icon size={24} className="text-lagoon-700" aria-hidden="true" />
      <h2 className="mt-3 text-lg font-black text-ink">{title}</h2>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{text}</p>
    </article>
  );
}

function Field({ id, label, type = "text", required = false }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-extrabold text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className="mt-2 w-full bg-white px-4 py-3 text-ink"
      />
    </div>
  );
}

function TextArea({ id, label, required = false }: { id: string; label: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-extrabold text-ink">
        {label}
      </label>
      <textarea
        id={id}
        required={required}
        rows={4}
        className="mt-2 w-full bg-white px-4 py-3 text-ink"
      />
    </div>
  );
}
