import { useState } from "react";
import { CheckCircle2, Laptop, Package, Send } from "lucide-react";
import type { PageId } from "../types";

interface DonateProps {
  onNavigate: (page: PageId) => void;
}

const deviceTypes = ["Laptop", "Desktop computer", "Tablet", "Smartphone", "Printer", "Monitor", "Other"];
const conditions = ["Good — works well, minor cosmetic marks only", "Fair — works but has visible wear", "Poor — has some issues (please describe below)"];

export default function Donate({ onNavigate }: DonateProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">Device donations</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Donate a Device</h1>
          <p className="mt-4 text-xl font-semibold leading-relaxed text-slate-700">
            A working laptop or phone can change someone's life. Donated devices are refurbished and given to residents in Ladywood who cannot afford one.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            {submitted ? (
              <div className="govuk-panel bg-lagoon-50 p-8">
                <CheckCircle2 size={40} className="text-green-700" aria-hidden="true" />
                <h2 className="mt-4 text-3xl font-black text-ink">Thank you for your donation!</h2>
                <p className="mt-4 text-lg text-slate-700">
                  Your donation request has been received. A member of our team will be in touch within 2 working days to arrange collection or drop-off.
                </p>
                <p className="mt-3 text-base text-slate-700">
                  Your device will be securely wiped, refurbished where needed, and passed on to a resident in Ladywood who needs it.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <button type="button" onClick={() => onNavigate("home")} className="govuk-button px-5 py-3">
                    Back to home
                  </button>
                  <button type="button" onClick={() => setSubmitted(false)} className="govuk-button govuk-button--secondary px-5 py-3">
                    Donate another device
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              >
                <div className="govuk-panel p-5">
                  <h2 className="text-xl font-black text-ink">Your contact details</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field id="donor-name" label="Full name" required />
                    <Field id="donor-email" label="Email address" type="email" required />
                    <Field id="donor-phone" label="Phone number (optional)" type="tel" />
                    <Field id="donor-org" label="Organisation (if applicable)" />
                  </div>
                </div>

                <div className="govuk-panel p-5">
                  <h2 className="text-xl font-black text-ink">About the device</h2>
                  <div className="mt-4 space-y-4">
                    <SelectField id="device-type" label="Device type" options={deviceTypes} required />
                    <Field id="device-model" label="Make and model (if known)" placeholder="e.g. Dell Latitude 3490" />
                    <SelectField id="device-condition" label="Condition" options={conditions} required />
                    <Field id="device-quantity" label="How many devices are you donating?" type="number" placeholder="1" />
                    <TextArea id="device-notes" label="Additional details (optional)" placeholder="Any known faults, missing chargers, or other information..." />
                  </div>
                </div>

                <div className="govuk-panel p-5">
                  <h2 className="text-xl font-black text-ink">Drop-off or collection</h2>
                  <div className="mt-4 space-y-4">
                    <CheckboxField
                      id="can-drop-off"
                      label="I can drop off the device at a local collection point in Ladywood"
                    />
                    <CheckboxField
                      id="needs-collection"
                      label="I need the device to be collected from me"
                    />
                    <TextArea id="preferred-time" label="Preferred time or date for drop-off or collection (optional)" rows={2} />
                  </div>
                </div>

                <div className="govuk-panel p-5">
                  <h2 className="text-xl font-black text-ink">Data and consent</h2>
                  <p className="mt-3 text-sm text-slate-700">
                    All donated devices are securely wiped before reuse. We will never recover or access any personal data.
                  </p>
                  <div className="mt-4 space-y-3">
                    <CheckboxField
                      id="data-consent"
                      label="I confirm the device is mine to donate and I consent to it being securely wiped and refurbished for community use."
                      required
                    />
                    <CheckboxField
                      id="contact-consent"
                      label="I am happy to be contacted about my donation."
                    />
                  </div>
                </div>

                <button type="submit" className="govuk-button w-full px-5 py-3 text-base">
                  <Send size={18} aria-hidden="true" />
                  Submit donation request
                </button>
              </form>
            )}
          </div>

          {/* Aside */}
          <aside className="space-y-4">
            <div className="hc-panel govuk-panel bg-lagoon-50 p-5">
              <Laptop size={28} className="text-lagoon-700" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-black text-ink">What happens to your device</h3>
              <ol className="mt-4 space-y-3">
                {[
                  "We securely wipe all data from the device.",
                  "Our volunteers refurbish it where needed.",
                  "It is passed to a Ladywood resident who needs it.",
                  "They receive basic training to get started."
                ].map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm font-semibold text-slate-700">
                    <span className="flex h-7 w-7 min-w-7 items-center justify-center bg-ink text-white font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="govuk-panel p-5">
              <Package size={22} className="text-lagoon-700" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black text-ink">What we accept</h3>
              <ul className="mt-3 space-y-2">
                {[
                  "Laptops (Windows, Mac, Chromebook)",
                  "Tablets and iPads",
                  "Smartphones (any operating system)",
                  "Desktop computers with monitor",
                  "Chargers and cables"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={14} className="shrink-0 text-green-700" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                We cannot accept devices that are completely broken, have severe screen damage, or are missing essential components without prior agreement.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  id, label, type = "text", required = false, placeholder
}: {
  id: string; label: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-extrabold text-ink">
        {label}{required && <span className="ml-1 text-red-600" aria-hidden="true">*</span>}
      </label>
      <input id={id} type={type} required={required} placeholder={placeholder} className="mt-2 w-full bg-white px-4 py-3 text-ink border border-slate-300" />
    </div>
  );
}

function SelectField({ id, label, options, required = false }: { id: string; label: string; options: string[]; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-extrabold text-ink">
        {label}{required && <span className="ml-1 text-red-600" aria-hidden="true">*</span>}
      </label>
      <select id={id} required={required} className="mt-2 w-full bg-white px-4 py-3 text-ink border border-slate-300">
        <option value="">Select…</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function TextArea({ id, label, placeholder, rows = 4 }: { id: string; label: string; placeholder?: string; rows?: number; }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-extrabold text-ink">{label}</label>
      <textarea id={id} rows={rows} placeholder={placeholder} className="mt-2 w-full bg-white px-4 py-3 text-ink border border-slate-300" />
    </div>
  );
}

function CheckboxField({ id, label, required = false }: { id: string; label: string; required?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <input id={id} type="checkbox" required={required} className="mt-1 h-5 w-5 shrink-0" />
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">{label}</label>
    </div>
  );
}
