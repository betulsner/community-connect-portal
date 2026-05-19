import { useState } from "react";
import { LogIn } from "lucide-react";
import { useI18n } from "../i18n";
import type { PageId, PortalUser } from "../types";

interface LoginProps {
  user: PortalUser | null;
  onUserChange: (user: PortalUser | null) => void;
  onNavigate: (page: PageId) => void;
}

export default function Login({ user, onUserChange, onNavigate }: LoginProps) {
  const { t } = useI18n();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim() === "demo" && password === "connect123") {
      onUserChange({ username: "demo", mode: "demo" });
      setError("");
      onNavigate("dashboard");
      return;
    }
    setError(t("login.error"));
  };

  if (user?.mode === "demo") {
    return (
      <section className="bg-white py-12">
        <div className="govuk-width-container max-w-3xl">
          <h1 className="text-4xl font-black text-ink">{t("login.signedIn")}</h1>
          <p className="mt-4 text-xl text-ink">{t("login.signedInText")}</p>
          <button type="button" onClick={() => onNavigate("dashboard")} className="govuk-button mt-6 px-5 py-3 text-base">
            {t("login.openDashboard")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container max-w-3xl">
        <h1 className="text-4xl font-black text-ink">{t("login.title")}</h1>
        <p className="mt-4 text-xl text-ink">{t("login.subtitle")}</p>

        <form onSubmit={handleLogin} className="govuk-panel mt-8 space-y-5 p-6">
          <div>
            <label htmlFor="username" className="block text-lg font-bold text-ink">
              {t("login.username")}
            </label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full px-4 py-3 text-lg"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-bold text-ink">
              {t("login.password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full px-4 py-3 text-lg"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="border-l-8 border-red-700 bg-red-50 px-4 py-3 text-base font-bold text-red-700">{error}</p>}
          <button type="submit" className="govuk-button w-full px-5 py-3 text-lg">
            <LogIn size={20} aria-hidden="true" />
            {t("login.button")}
          </button>
          <button
            type="button"
            onClick={() => {
              onUserChange({ username: "Guest", mode: "guest" });
              onNavigate("dashboard");
            }}
            className="govuk-button govuk-button--secondary w-full px-5 py-3 text-lg"
          >
            {t("login.guest")}
          </button>
          <p className="text-base text-slate-700">{t("login.demoDetails")}</p>
        </form>
      </div>
    </section>
  );
}
