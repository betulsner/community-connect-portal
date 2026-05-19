import { LogIn, Map, Menu, Wrench, CalendarDays, Info, Home, Laptop } from "lucide-react";
import type { PageId } from "../types";

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onLogin: () => void;
  userLabel?: string;
}

const navItems: Array<{ id: PageId; label: string; icon: React.ElementType }> = [
  { id: "home", label: "Home", icon: Home },
  { id: "connect", label: "Connect with the City", icon: Map },
  { id: "digital", label: "Digital Help", icon: Laptop },
  { id: "refurbishment", label: "Refurbishment", icon: Wrench },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "about", label: "About", icon: Info }
];

export default function Navbar({ activePage, onNavigate, onLogin, userLabel }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex min-w-fit items-center gap-3 rounded-lg px-2 py-2 text-left text-ink hover:bg-lagoon-50 focus:outline-none focus:ring-2 focus:ring-sun-500"
          aria-label="Go to Community Connect home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-white">
            <Menu size={20} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-extrabold">Community Connect</span>
            <span className="block text-xs font-semibold text-slate-600">Ladywood benches portal</span>
          </span>
        </button>

        <div className="hidden flex-wrap items-center justify-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-lagoon-700 text-white shadow-sm"
                    : "text-slate-700 hover:bg-lagoon-50 hover:text-lagoon-700"
                } focus:outline-none focus:ring-2 focus:ring-sun-500`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={16} aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLogin}
            className="flex items-center gap-2 rounded-lg bg-sun-500 px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-sun-600 focus:outline-none focus:ring-2 focus:ring-ink"
          >
            <LogIn size={16} aria-hidden="true" />
            {userLabel ?? "Login"}
          </button>
        </div>
      </nav>

      <div className="scrollbar-none flex gap-2 overflow-x-auto border-t border-slate-200 bg-white px-4 py-2 lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex min-w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold ${
                isActive ? "bg-lagoon-700 text-white" : "bg-slate-100 text-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-sun-500`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={15} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
