import { useState } from "react";
import { MapPinned, Send, ShieldCheck, Users, Wifi } from "lucide-react";
import { useI18n } from "../i18n";

export default function About() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-base font-bold text-slate-700">{t("about.eyebrow")}</p>
            <h1 className="mt-2 text-4xl font-black text-ink">{t("about.title")}</h1>
            <p className="mt-5 text-lg font-semibold leading-relaxed text-slate-700">
              {t("about.text1")}
            </p>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-slate-700">
              {t("about.text2")}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ConceptTile icon={Wifi} title={t("about.free.title")} text={t("about.free.text")} />
              <ConceptTile icon={Users} title={t("about.human.title")} text={t("about.human.text")} />
              <ConceptTile icon={ShieldCheck} title={t("about.confidence.title")} text={t("about.confidence.text")} />
              <ConceptTile icon={MapPinned} title={t("about.routes.title")} text={t("about.routes.text")} />
            </div>
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
