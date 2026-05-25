import { useEffect, useState } from "react";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import { I18nProvider, isSupportedLanguage } from "./i18n";
import About from "./pages/About";
import AccessData from "./pages/AccessData";
import AffordableInternet from "./pages/AffordableInternet";
import ConnectCity from "./pages/ConnectCity";
import Dashboard from "./pages/Dashboard";
import DigitalHelp from "./pages/DigitalHelp";
import Donate from "./pages/Donate";
import FreeSim from "./pages/FreeSim";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Refurbishment from "./pages/Refurbishment";
import Stamps from "./pages/Stamps";
import Volunteer from "./pages/Volunteer";
import type { CommunityEvent, PageId, PortalSettings, PortalUser } from "./types";

const pageIds: PageId[] = [
  "home", "connect", "digital", "refurbishment", "stamps", "dashboard",
  "about", "login", "volunteer", "donate", "free-sim", "affordable-internet", "access-data"
];
const remindersKey = "community-connect-reminders";
const settingsKey = "community-connect-settings";
const defaultSettings: PortalSettings = {
  largeText: false,
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
    document.documentElement.classList.toggle("large-text", settings.largeText);
  }, [settings]);

  const navigate = (page: PageId) => {
    setActivePage(page);
    window.history.replaceState(null, "", `#${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addReminder = (event: CommunityEvent) => {
    setReminders((current) => (current.some((item) => item.id === event.id) ? current : [...current, event]));
  };

  const removeReminder = (eventId: string) => {
    setReminders((current) => current.filter((item) => item.id !== eventId));
  };

  const handleDashboardClick = () => {
    if (user?.mode === "demo") {
      navigate("dashboard");
    } else {
      navigate("login");
    }
  };

  const handleStampsClick = () => {
    if (user?.mode === "demo") {
      navigate("stamps");
    } else {
      navigate("login");
    }
  };

  const renderPage = () => {
    if (activePage === "connect") return <ConnectCity onAddReminder={addReminder} onRemoveReminder={removeReminder} reminders={reminders} />;
    if (activePage === "digital") return <DigitalHelp onNavigate={navigate} />;
    if (activePage === "refurbishment") return <Refurbishment onNavigate={navigate} />;
    if (activePage === "volunteer") return <Volunteer onNavigate={navigate} />;
    if (activePage === "donate") return <Donate onNavigate={navigate} />;
    if (activePage === "free-sim") return <FreeSim onNavigate={navigate} />;
    if (activePage === "affordable-internet") return <AffordableInternet onNavigate={navigate} />;
    if (activePage === "access-data") return <AccessData onNavigate={navigate} />;
    if (activePage === "stamps") {
      if (user?.mode !== "demo") { navigate("login"); return null; }
      return <Stamps user={user} onNavigate={navigate} />;
    }
    if (activePage === "dashboard") {
      if (user?.mode !== "demo") { navigate("login"); return null; }
      return <Dashboard user={user} reminders={reminders} onNavigate={navigate} />;
    }
    if (activePage === "about") return <About onNavigate={navigate} />;
    if (activePage === "login") return <Login user={user} onUserChange={setUser} onNavigate={navigate} />;
    return <Home onNavigate={navigate} />;
  };

  return (
    <I18nProvider language={settings.language}>
      <div className={`${settings.largeText ? "large-text" : ""} min-h-screen bg-white text-ink`}>
        <Navbar
          activePage={activePage}
          onNavigate={navigate}
          onDashboard={handleDashboardClick}
          onStamps={handleStampsClick}
          user={user}
          settings={settings}
          onSettingsChange={setSettings}
        />
        <main>{renderPage()}</main>
        <Chatbot onNavigate={navigate} />
      </div>
    </I18nProvider>
  );
}
