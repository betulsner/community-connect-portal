import { useState } from "react";
import { Award, Bookmark, CheckCircle2, Gauge, MapPin, User, X } from "lucide-react";
import type { PortalUser } from "../types";
import { locations } from "../data/locations";
import { events } from "../data/events";

interface LoginModalProps {
  user: PortalUser | null;
  onClose: () => void;
  onUserChange: (user: PortalUser | null) => void;
}

export default function LoginModal({ user, onClose, onUserChange }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim() === "demo" && password === "connect123") {
      onUserChange({ username: "demo", mode: "demo" });
      setError("");
      return;
    }
    setError("Use the demo username and password shown below.");
  };

  const continueGuest = () => {
    onUserChange({ username: "Guest", mode: "guest" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 py-6" role="dialog" aria-modal="true">
      <div className="hc-panel max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-portal">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-sm font-extrabold uppercase text-lagoon-700">Prototype login</p>
            <h2 className="text-2xl font-black text-ink">Saved portal dashboard</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sun-500"
            aria-label="Close login"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        {user?.mode === "demo" ? (
          <div className="grid gap-6 p-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-lg bg-lagoon-50 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-lagoon-700 text-white">
                <User size={26} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-black text-ink">Welcome, demo</h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
                This dashboard uses local state only. It shows how a resident could save places, track events, and build confidence.
              </p>
              <button
                type="button"
                onClick={() => onUserChange(null)}
                className="mt-5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-extrabold text-ink hover:bg-white focus:outline-none focus:ring-2 focus:ring-sun-500"
              >
                Sign out
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <DashboardTile icon={Bookmark} title="Saved locations" value="3" text={locations.slice(0, 3).map((item) => item.name).join(", ")} />
              <DashboardTile icon={CheckCircle2} title="Saved events" value="2" text={events.slice(0, 2).map((item) => item.name).join(", ")} />
              <DashboardTile icon={Gauge} title="Digital skill progress" value="45%" text="Email basics complete. CV uploads and online safety are next." />
              <DashboardTile icon={Award} title="Reward points" value="70" text="Close to a device repair discount or workshop priority booking." />
              <div className="rounded-lg border border-slate-200 bg-white p-4 sm:col-span-2">
                <p className="flex items-center gap-2 text-sm font-extrabold text-lagoon-700">
                  <MapPin size={16} aria-hidden="true" />
                  Suggested nearby support
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-700">
                  Bridge Street Community Cafe has Wi-Fi, charging, and digital help hours. Rework Ladywood Device Point can help with refurbished laptop routes.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 p-5 lg:grid-cols-[1fr_0.9fr]">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-extrabold text-ink">
                  Username
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-ink focus:border-lagoon-700 focus:outline-none focus:ring-2 focus:ring-lagoon-700/20"
                  autoComplete="username"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-extrabold text-ink">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-ink focus:border-lagoon-700 focus:outline-none focus:ring-2 focus:ring-lagoon-700/20"
                  autoComplete="current-password"
                />
              </div>
              {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-sun-500 px-4 py-3 text-base font-extrabold text-white hover:bg-sun-600 focus:outline-none focus:ring-2 focus:ring-ink"
              >
                Login
              </button>
              <button
                type="button"
                onClick={continueGuest}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base font-extrabold text-ink hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sun-500"
              >
                Continue as guest
              </button>
              <p className="text-xs font-semibold text-slate-500">Demo credentials: username demo, password connect123</p>
            </form>

            <div className="rounded-lg bg-lagoon-50 p-5">
              <h3 className="text-xl font-black text-ink">Guest access stays open</h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
                Residents can use the map, support pages, events, rewards information, and City Helper without signing in.
              </p>
              <div className="mt-5 space-y-3 text-sm font-bold text-slate-700">
                <p>Login adds saved locations, saved events, progress, rewards, and suggestions.</p>
                <p>No real authentication or backend is connected in this prototype.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface DashboardTileProps {
  icon: React.ElementType;
  title: string;
  value: string;
  text: string;
}

function DashboardTile({ icon: Icon, title, value, text }: DashboardTileProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-extrabold text-lagoon-700">
          <Icon size={16} aria-hidden="true" />
          {title}
        </p>
        <span className="text-xl font-black text-ink">{value}</span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}
