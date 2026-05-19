import { ArrowRight, BatteryCharging, Laptop, MapPin, ShieldCheck, Wifi } from "lucide-react";
import type { PageId } from "../types";

interface HeroProps {
  onNavigate: (page: PageId) => void;
  onLogin: () => void;
}

export default function Hero({ onNavigate, onLogin }: HeroProps) {
  return (
    <section className="border-b-4 border-ink bg-white">
      <div className="govuk-width-container py-12 md:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          <div className="max-w-3xl">
            <p className="mb-4 text-base font-bold text-slate-700">Ladywood Community Connect Benches Portal</p>
            <h1 className="text-5xl font-black leading-tight text-ink md:text-6xl">
              Community Connect
            </h1>
            <p className="mt-6 max-w-2xl text-2xl font-bold leading-relaxed text-ink">
                Free Wi-Fi, charging, local support, and events around Ladywood.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => onNavigate("connect")}
                className="govuk-button px-5 py-3 text-base"
              >
                <MapPin size={19} aria-hidden="true" />
                Connect with the City
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("digital")}
                className="govuk-button govuk-button--blue px-5 py-3 text-base"
              >
                <Laptop size={19} aria-hidden="true" />
                Find Digital Help
              </button>
              <button
                type="button"
                onClick={() => onNavigate("refurbishment")}
                className="govuk-button govuk-button--secondary px-5 py-3 text-base"
              >
                <BatteryCharging size={19} aria-hidden="true" />
                Find Refurbished Devices
              </button>
            </div>
          </div>

          <div className="govuk-panel p-6 text-ink">
            <div className="mb-5 flex h-14 w-14 items-center justify-center bg-ink text-white">
              <Wifi size={28} aria-hidden="true" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-base font-bold text-slate-700">Bench access</p>
                <h2 className="mt-1 text-2xl font-black">Ladywood Free Wi-Fi</h2>
              </div>
              <div className="grid gap-3">
                <div className="border-2 border-slate-300 bg-lagoon-50 px-4 py-3">
                  <p className="flex items-center gap-3 font-bold text-ink">
                    <Wifi size={18} aria-hidden="true" />
                    Connected near a bench
                  </p>
                </div>
                <div className="border-2 border-slate-300 bg-lagoon-50 px-4 py-3">
                  <p className="flex items-center gap-3 font-bold text-ink">
                    <ShieldCheck size={18} aria-hidden="true" />
                    Guest access available
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onLogin}
                className="govuk-button w-full px-4 py-3 text-base"
              >
                Continue to portal
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-ink">
                <span className="govuk-tag justify-center px-2 py-2">Wi-Fi</span>
                <span className="govuk-tag justify-center px-2 py-2">Charging</span>
                <span className="govuk-tag justify-center px-2 py-2">Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
