import { useState } from "react";
import { MapPinned, Send, ShieldCheck, Users, Wifi } from "lucide-react";

export default function About() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-extrabold uppercase text-lagoon-700">About</p>
            <h1 className="mt-2 text-4xl font-black text-ink">Smart benches that make support visible in everyday places.</h1>
            <p className="mt-5 text-lg font-semibold leading-relaxed text-slate-700">
              Community Connect Benches are smart public benches placed around Ladywood. They provide free Wi-Fi, charging, and a simple portal that connects residents to digital support, local events, refurbished devices, cafes, and community services.
            </p>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-slate-700">
              The goal is to reduce digital exclusion and social isolation by making support easier to find from familiar public spaces.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ConceptTile icon={Wifi} title="Free access" text="Bench Wi-Fi and charging reduce the pressure of data costs and low battery anxiety." />
              <ConceptTile icon={Users} title="Human support" text="Cafes, libraries, and community spaces help residents move from online access to real help." />
              <ConceptTile icon={ShieldCheck} title="Confidence first" text="Simple language, guest access, and beginner guides support people with low digital confidence." />
              <ConceptTile icon={MapPinned} title="Local routes" text="Map cards make opening hours, accessibility, distance, and services easier to compare." />
            </div>
          </div>

          <div className="hc-panel rounded-lg border border-slate-200 bg-lagoon-50 p-6 shadow-lift">
            <p className="text-sm font-extrabold uppercase text-lagoon-700">Request a Bench</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Request a Community Connect Bench in your area</h2>
            {submitted ? (
              <div className="mt-6 rounded-lg bg-white p-5 text-sm font-bold leading-relaxed text-slate-700">
                Request preview submitted. In a real deployment this would go to the community project team.
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <Field id="suggested-location" label="Suggested location" required />
                <TextArea id="area-need" label="Why this area needs a bench" required />
                <Field id="nearby-partner" label="Nearby cafe or community partner" />
                <TextArea id="accessibility-needs" label="Accessibility needs" />
                <Field id="contact-email" label="Contact email optional" type="email" />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-sun-500 px-4 py-3 text-base font-extrabold text-white hover:bg-sun-600 focus:outline-none focus:ring-2 focus:ring-ink"
                >
                  <Send size={18} aria-hidden="true" />
                  Send request
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
    <article className="hc-panel rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
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
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-ink focus:border-lagoon-700 focus:outline-none focus:ring-2 focus:ring-lagoon-700/20"
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
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-ink focus:border-lagoon-700 focus:outline-none focus:ring-2 focus:ring-lagoon-700/20"
      />
    </div>
  );
}
