import { useEffect, useState } from "react";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import { I18nProvider, isSupportedLanguage } from "./i18n";
import About from "./pages/About";
import ConnectCity from "./pages/ConnectCity";
import Dashboard from "./pages/Dashboard";
import DigitalHelp from "./pages/DigitalHelp";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Refurbishment from "./pages/Refurbishment";
import type { CommunityEvent, PageId, PortalSettings, PortalUser } from "./types";

const pageIds: PageId[] = ["home", "connect", "digital", "refurbishment", "events", "dashboard", "about", "login"];
const remindersKey = "community-connect-reminders";
const settingsKey = "community-connect-settings";
const defaultSettings: PortalSettings = {
  largeText: false,
  highContrast: false,
  language: "English"
};

function pageFromHash(): PageId {
  const hash = window.location.hash.replace("#", "");
  return pageIds.includes(hash as PageId) ? (hash as PageId) : "home";
}

function settingsFromStorage(): PortalSettings {
  try {
    const parsed = JSON.parse(localStorage.getItem(settingsKey) ?? "null") as Partial<PortalSettings> | null;
    if (!parsed) return defaultSettings;
    return {
      largeText: Boolean(parsed.largeText),
      highContrast: Boolean(parsed.highContrast),
      language: parsed.language && isSupportedLanguage(parsed.language) ? parsed.language : "English"
    };
  } catch {
    return defaultSettings;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(pageFromHash);
  const [user, setUser] = useState<PortalUser | null>(null);
  const [reminders, setReminders] = useState<CommunityEvent[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(remindersKey) ?? "[]") as CommunityEvent[];
    } catch {
      return [];
    }
  });
  const [settings, setSettings] = useState<PortalSettings>(settingsFromStorage);

  useEffect(() => {
    const handleHashChange = () => setActivePage(pageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem(remindersKey, JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem(settingsKey, JSON.stringify(settings));
    document.documentElement.lang = settings.language.toLowerCase();
    document.documentElement.dir = settings.language === "Arabic" || settings.language === "Urdu" ? "rtl" : "ltr";
  }, [settings]);

  const navigate = (page: PageId) => {
    setActivePage(page);
    window.history.replaceState(null, "", `#${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addReminder = (event: CommunityEvent) => {
    setReminders((current) => (current.some((item) => item.id === event.id) ? current : [...current, event]));
  };

  const renderPage = () => {
    if (activePage === "connect") return <ConnectCity />;
    if (activePage === "digital") return <DigitalHelp onNavigate={navigate} />;
    if (activePage === "refurbishment") return <Refurbishment />;
    if (activePage === "events") return <Events onNavigate={navigate} onAddReminder={addReminder} reminders={reminders} />;
    if (activePage === "dashboard") return <Dashboard user={user} reminders={reminders} onNavigate={navigate} />;
    if (activePage === "about") return <About />;
    if (activePage === "login") return <Login user={user} onUserChange={setUser} onNavigate={navigate} />;
    return <Home onNavigate={navigate} />;
  };

  return (
    <I18nProvider language={settings.language}>
      <div
        className={`${settings.highContrast ? "high-contrast" : ""} ${
          settings.largeText ? "large-text" : ""
        } min-h-screen bg-white text-ink`}
      >
        <Navbar
          activePage={activePage}
          onNavigate={navigate}
          onLogin={() => navigate("dashboard")}
          settings={settings}
          onSettingsChange={setSettings}
        />
        <main>{renderPage()}</main>
        <Chatbot onNavigate={navigate} />
      </div>
    </I18nProvider>
  );
}
