import { useState } from "react";
import { CalendarDays, Home, Laptop, LayoutDashboard, Map, Menu, Wrench, X } from "lucide-react";
import { useI18n } from "../i18n";
import type { PageId, PortalSettings } from "../types";
import AccessibilityControls from "./AccessibilityControls";

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onLogin: () => void;
  settings: PortalSettings;
  onSettingsChange: (settings: PortalSettings) => void;
  userLabel?: string;
}

const navItems: Array<{ id: PageId; labelKey: string; icon: React.ElementType }> = [
  { id: "home", labelKey: "nav.home", icon: Home },
  { id: "connect", labelKey: "nav.connect", icon: Map },
  { id: "digital", labelKey: "nav.digital", icon: Laptop },
  { id: "refurbishment", labelKey: "nav.refurbishment", icon: Wrench },
  { id: "events", labelKey: "nav.events", icon: CalendarDays }
];

export default function Navbar({
  activePage,
  onNavigate,
  onLogin,
  settings,
  onSettingsChange,
  userLabel
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  const navigate = (page: PageId) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="govuk-width-container site-header__inner">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="site-logo"
          aria-label="Go to Community Connect home"
        >
          <span className="site-logo__mark">
            <Map size={27} aria-hidden="true" />
          </span>
          <span className="site-logo__text">
            <span>Community</span>
            <span>Connect</span>
          </span>
        </button>

        <div className="site-nav" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className={`site-nav__link ${isActive ? "site-nav__link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </div>

        <div className="site-header__actions">
          <div className="site-header__access">
            <AccessibilityControls settings={settings} onChange={onSettingsChange} />
          </div>
          <button
            type="button"
            onClick={onLogin}
            className="govuk-button site-dashboard-button"
          >
            <LayoutDashboard size={16} aria-hidden="true" />
            <span className="site-dashboard-button__text">{userLabel ?? t("nav.dashboard")}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="site-menu-button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            <span>{t("nav.menu")}</span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`${isOpen ? "block" : "hidden"} site-mobile-menu`}
      >
        <div className="mb-3">
          <AccessibilityControls settings={settings} onChange={onSettingsChange} />
        </div>
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={`site-mobile-menu__link ${isActive ? "site-mobile-menu__link--active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {t(item.labelKey)}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            onLogin();
            setIsOpen(false);
          }}
          className="govuk-button mt-2 w-full px-4 py-3"
        >
          <LayoutDashboard size={16} aria-hidden="true" />
          {userLabel ?? t("nav.dashboard")}
        </button>
      </div>
    </header>
  );
}
