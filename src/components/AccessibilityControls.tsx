import { BookOpen, Languages, Type, Volume2, Contrast } from "lucide-react";
import type { PortalSettings } from "../types";

interface AccessibilityControlsProps {
  settings: PortalSettings;
  onChange: (settings: PortalSettings) => void;
  onReadAloud: () => void;
}

const languages = ["English", "Urdu", "Punjabi", "Bengali", "Polish", "Arabic", "Romanian"];

export default function AccessibilityControls({
  settings,
  onChange,
  onReadAloud
}: AccessibilityControlsProps) {
  const update = (partial: Partial<PortalSettings>) => onChange({ ...settings, ...partial });

  return (
    <section className="border-b border-white/60 bg-lagoon-700 text-white" aria-label="Accessibility and language controls">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => update({ simpleEnglish: !settings.simpleEnglish })}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-white ${
              settings.simpleEnglish ? "bg-white text-lagoon-700" : "bg-white/15 text-white hover:bg-white/25"
            }`}
            aria-pressed={settings.simpleEnglish}
          >
            <BookOpen size={16} aria-hidden="true" />
            Simple English
          </button>
          <button
            type="button"
            onClick={() => update({ largeText: !settings.largeText })}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-white ${
              settings.largeText ? "bg-white text-lagoon-700" : "bg-white/15 text-white hover:bg-white/25"
            }`}
            aria-pressed={settings.largeText}
          >
            <Type size={16} aria-hidden="true" />
            Large text
          </button>
          <button
            type="button"
            onClick={() => update({ highContrast: !settings.highContrast })}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-white ${
              settings.highContrast ? "bg-white text-lagoon-700" : "bg-white/15 text-white hover:bg-white/25"
            }`}
            aria-pressed={settings.highContrast}
          >
            <Contrast size={16} aria-hidden="true" />
            High contrast
          </button>
          <button
            type="button"
            onClick={onReadAloud}
            className="flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-sm font-bold text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <Volume2 size={16} aria-hidden="true" />
            Read aloud
          </button>
        </div>

        <label className="flex min-w-fit items-center gap-2 text-sm font-bold">
          <Languages size={16} aria-hidden="true" />
          <span>Language</span>
          <select
            value={settings.language}
            onChange={(event) => update({ language: event.target.value })}
            className="rounded-lg border border-white/40 bg-white px-3 py-2 text-sm font-bold text-ink focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Select portal language"
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
