import { Languages, Type } from "lucide-react";
import { supportedLanguages, useI18n } from "../i18n";
import type { PortalSettings } from "../types";

interface AccessibilityControlsProps {
  settings: PortalSettings;
  onChange: (settings: PortalSettings) => void;
}

export default function AccessibilityControls({ settings, onChange }: AccessibilityControlsProps) {
  const { t } = useI18n();
  const update = (partial: Partial<PortalSettings>) => onChange({ ...settings, ...partial });

  return (
    <section className="bg-transparent text-ink" aria-label="Accessibility and language controls">
      <div className="cc-accessibility-controls">
        <label className="cc-accessibility-select">
          <Languages size={18} aria-hidden="true" />
          <span className="sr-only">{t("access.language")}</span>
          <select
            value={settings.language}
            onChange={(event) => update({ language: event.target.value })}
            className="cc-accessibility-native-select"
            aria-label={t("access.selectLanguage")}
          >
            {supportedLanguages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center">
          <button
            type="button"
            onClick={() => update({ largeText: false })}
            className={`cc-accessibility-button ${!settings.largeText ? "cc-accessibility-button--active" : ""}`}
            aria-label={t("access.standardText")}
          >
            <Type size={17} aria-hidden="true" />
            A-
          </button>
          <button
            type="button"
            onClick={() => update({ largeText: true })}
            className={`cc-accessibility-button ${settings.largeText ? "cc-accessibility-button--active" : ""}`}
            aria-label={t("access.largeText")}
          >
            A+
          </button>
        </div>
      </div>
    </section>
  );
}
