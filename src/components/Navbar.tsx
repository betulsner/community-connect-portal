import { useState } from "react";
import { Home, Laptop, LayoutDashboard, Map, Menu, Stamp, Wrench, X } from "lucide-react";
import { useI18n } from "../i18n";
import type { PageId, PortalSettings, PortalUser } from "../types";
import AccessibilityControls from "./AccessibilityControls";

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onDashboard: () => void;
  onStamps: () => void;
  user: PortalUser | null;
  settings: PortalSettings;
  onSettingsChange: (settings: PortalSettings) => void;
  userLabel?: string;
}

const navItems: Array<{ id: PageId; labelKey: string; icon: React.ElementType }> = [
  { id: "home", labelKey: "nav.home", icon: Home },
  { id: "connect", labelKey: "nav.connect", icon: Map },
  { id: "digital", labelKey: "nav.digital", icon: Laptop },
  { id: "refurbishment", labelKey: "nav.refurbishment", icon: Wrench }
];

export default function Navbar({
  activePage,
  onNavigate,
  onDashboard,
  onStamps,
  user,
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
          {user?.mode === "demo" && (
            <button
              type="button"
              onClick={onStamps}
              className={`site-nav__link ${activePage === "stamps" ? "site-nav__link--active" : ""}`}
              aria-current={activePage === "stamps" ? "page" : undefined}
            >
              My Stamps
            </button>
          )}
        </div>

        <div className="site-header__actions">
          <div className="site-header__access">
            <AccessibilityControls settings={settings} onChange={onSettingsChange} />
          </div>
          {user?.mode === "demo" && (
            <button
              type="button"
              onClick={onStamps}
              className="govuk-button govuk-button--secondary site-dashboard-button"
              aria-label="My stamps"
            >
              <Stamp size={16} aria-hidden="true" />
              <span className="site-dashboard-button__text">Stamps</span>
            </button>
          )}
          <button
            type="button"
            onClick={onDashboard}
            className="govuk-button site-dashboard-button"
          >
            <LayoutDashboard size={16} aria-hidden="true" />
            <span className="site-dashboard-button__text">
              {user?.mode === "demo" ? (userLabel ?? t("nav.dashboard")) : t("nav.login") ?? "Log in"}
            </span>
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
        {user?.mode === "demo" && (
          <button
            type="button"
            onClick={() => { onStamps(); setIsOpen(false); }}
            className={`site-mobile-menu__link ${activePage === "stamps" ? "site-mobile-menu__link--active" : ""}`}
          >
            My Stamps
          </button>
        )}
        <button
          type="button"
          onClick={() => { onDashboard(); setIsOpen(false); }}
          className="govuk-button mt-2 w-full px-4 py-3"
        >
          <LayoutDashboard size={16} aria-hidden="true" />
          {user?.mode === "demo" ? (userLabel ?? t("nav.dashboard")) : "Log in"}
        </button>
      </div>
    </header>
  );
}
