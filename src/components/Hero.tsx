import { ArrowRight, BatteryCharging, Laptop, MapPin, ShieldCheck, Wifi } from "lucide-react";
import type { PageId } from "../types";
import cityPortal from "../assets/ladywood-city-portal.png";

interface HeroProps {
  onNavigate: (page: PageId) => void;
  onLogin: () => void;
}

export default function Hero({ onNavigate, onLogin }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-lagoon-100">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-95"
        style={{ backgroundImage: `url(${cityPortal})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/25 via-white/5 to-sun-100/35" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="portal-frame min-h-[610px] overflow-hidden border-[10px] border-white/95 bg-white/10 shadow-portal backdrop-blur-[2px]">
          <div className="grid min-h-[590px] items-center gap-8 px-5 py-8 md:grid-cols-[1fr_360px] md:px-10 lg:grid-cols-[1.05fr_420px] lg:px-16">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex rounded-lg bg-white/90 px-3 py-2 text-sm font-extrabold text-lagoon-700 shadow-sm">
                Free public Wi-Fi from the bench network
              </p>
              <h1 className="text-5xl font-black leading-tight text-ink md:text-6xl">
                Community <span className="block text-white drop-shadow-[0_2px_8px_rgba(15,23,42,0.25)]">Connect</span>
              </h1>
              <p className="mt-5 max-w-xl bg-white/85 p-3 text-lg font-bold leading-relaxed text-slate-800 shadow-sm sm:text-xl">
                Free Wi-Fi, charging, local support, and events around Ladywood.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => onNavigate("connect")}
                  className="flex items-center justify-center gap-2 rounded-lg bg-sun-500 px-5 py-3 text-base font-extrabold text-white shadow-lg transition hover:bg-sun-600 focus:outline-none focus:ring-2 focus:ring-ink"
                >
                  <MapPin size={19} aria-hidden="true" />
                  Connect with the City
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("digital")}
                  className="flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-base font-extrabold text-white shadow-lg transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sun-500"
                >
                  <Laptop size={19} aria-hidden="true" />
                  Find Digital Help
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("refurbishment")}
                  className="flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-base font-extrabold text-ink shadow-lg transition hover:bg-sun-100 focus:outline-none focus:ring-2 focus:ring-sun-500"
                >
                  <BatteryCharging size={19} aria-hidden="true" />
                  Find Refurbished Devices
                </button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[380px] rounded-lg bg-white p-6 text-ink shadow-portal">
              <div className="mx-auto -mt-14 mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-sun-500 text-white shadow-lg">
                <Wifi size={34} aria-hidden="true" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-extrabold uppercase text-lagoon-700">Bench access</p>
                  <h2 className="mt-1 text-2xl font-black">Ladywood Free Wi-Fi</h2>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-3">
                    <Wifi size={18} className="text-lagoon-700" aria-hidden="true" />
                    <span className="font-bold text-slate-700">Connected near a bench</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-3">
                    <ShieldCheck size={18} className="text-lagoon-700" aria-hidden="true" />
                    <span className="font-bold text-slate-700">Guest access available</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onLogin}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-sun-500 px-4 py-3 text-base font-extrabold text-white hover:bg-sun-600 focus:outline-none focus:ring-2 focus:ring-ink"
                >
                  Continue to portal
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold text-slate-500">
                  <span className="rounded-lg bg-slate-100 px-2 py-2">Wi-Fi</span>
                  <span className="rounded-lg bg-slate-100 px-2 py-2">Charging</span>
                  <span className="rounded-lg bg-slate-100 px-2 py-2">Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
