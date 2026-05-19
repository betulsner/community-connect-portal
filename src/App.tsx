import { useEffect, useState } from "react";
import AccessibilityControls from "./components/AccessibilityControls";
import Chatbot from "./components/Chatbot";
import LoginModal from "./components/LoginModal";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import ConnectCity from "./pages/ConnectCity";
import DigitalHelp from "./pages/DigitalHelp";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Refurbishment from "./pages/Refurbishment";
import type { PageId, PortalSettings, PortalUser } from "./types";

const pageIds: PageId[] = ["home", "connect", "digital", "refurbishment", "events", "about"];

function pageFromHash(): PageId {
  const hash = window.location.hash.replace("#", "");
  return pageIds.includes(hash as PageId) ? (hash as PageId) : "home";
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(pageFromHash);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<PortalUser | null>(null);
  const [settings, setSettings] = useState<PortalSettings>({
    simpleEnglish: false,
    largeText: false,
    highContrast: false,
    language: "English"
  });

  useEffect(() => {
    const handleHashChange = () => setActivePage(pageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (page: PageId) => {
    setActivePage(page);
    window.history.replaceState(null, "", `#${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const readAloud = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        "Community Connect helps you find free Wi-Fi, charging, digital support, refurbished devices, local events, and community partners around Ladywood."
      );
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderPage = () => {
    if (activePage === "connect") return <ConnectCity />;
    if (activePage === "digital") return <DigitalHelp onNavigate={navigate} />;
    if (activePage === "refurbishment") return <Refurbishment />;
    if (activePage === "events") return <Events onNavigate={navigate} />;
    if (activePage === "about") return <About />;
    return <Home onNavigate={navigate} onLogin={() => setIsLoginOpen(true)} />;
  };

  return (
    <div
      className={`${settings.highContrast ? "high-contrast" : ""} ${
        settings.largeText ? "large-text" : ""
      } min-h-screen bg-white text-ink`}
    >
      <AccessibilityControls settings={settings} onChange={setSettings} onReadAloud={readAloud} />
      <Navbar
        activePage={activePage}
        onNavigate={navigate}
        onLogin={() => setIsLoginOpen(true)}
        userLabel={user ? (user.mode === "demo" ? "Dashboard" : "Guest") : undefined}
      />
      <main>{renderPage()}</main>
      <Chatbot onNavigate={navigate} />
      {isLoginOpen && <LoginModal user={user} onClose={() => setIsLoginOpen(false)} onUserChange={setUser} />}
    </div>
  );
}
