import { useMemo, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { locations } from "../data/locations";
import { refurbishmentPoints } from "../data/refurbishment";
import { events } from "../data/events";
import { partners } from "../data/partners";
import { useI18n } from "../i18n";
import type { PageId } from "../types";

interface ChatbotProps {
  onNavigate: (page: PageId) => void;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

const exampleQuestionKeys = ["chat.q1", "chat.q2", "chat.q3", "chat.q4", "chat.q5"];

const scopeKeywords = [
  "ladywood",
  "birmingham",
  "support",
  "digital",
  "refurb",
  "device",
  "laptop",
  "phone",
  "event",
  "cafe",
  "wifi",
  "wi-fi",
  "charging",
  "bench",
  "open",
  "hours",
  "direction",
  "cv",
  "nhs",
  "benefit",
  "email",
  "print",
  "scan",
  "password",
  "job",
  "repair",
  "data",
  "internet",
  "library",
  "community",
  "coffee"
];

export default function Chatbot({ onNavigate }: ChatbotProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const quickData = useMemo(
    () => ({
      wifi: locations.filter((location) => location.tags.includes("wifi")).slice(0, 4),
      charging: locations.filter((location) => location.tags.includes("charging")),
      benches: locations.filter((location) => location.type === "Community Connect Bench"),
      digital: locations.filter((location) => location.tags.includes("digital-help")).slice(0, 3),
      devices: refurbishmentPoints.slice(0, 3),
      cafes: partners.filter((partner) => partner.wifi || partner.charging).slice(0, 3),
      events: events.slice(0, 3)
    }),
    []
  );

  const buildResponse = (question: string) => {
    const lower = question.toLowerCase();
    const inScope = scopeKeywords.some((keyword) => lower.includes(keyword));
    if (!inScope) {
      return t("chat.scope");
    }

    if (lower.includes("wifi") || lower.includes("wi-fi") || lower.includes("internet")) {
      return `Free Wi-Fi is available at ${quickData.wifi
        .map((location) => `${location.name} (${location.distance})`)
        .join(", ")}. Open the Connect with the City map to filter by Wi-Fi.`;
    }

    if (lower.includes("charging") || lower.includes("charge")) {
      return `Charging is listed at ${quickData.charging
        .map((location) => `${location.name} (${location.openingHours})`)
        .join(", ")}. Use the map charging filter for the nearest option.`;
    }

    if (lower.includes("refurb") || lower.includes("device") || lower.includes("laptop") || lower.includes("repair")) {
      return `For refurbished devices, try ${quickData.devices
        .map((point) => `${point.name} in ${point.area}`)
        .join(", ")}. The Refurbishment page also shows eligibility, repair events, social tariff guidance, and mobile data support.`;
    }

    if (lower.includes("event") || lower.includes("meet") || lower.includes("coffee") || lower.includes("volunteer")) {
      return `Upcoming local events include ${quickData.events
        .map((event) => `${event.name} at ${event.location} (${event.dateTime})`)
        .join(", ")}. The Events page has reminder buttons and map links.`;
    }

    if (lower.includes("cv") || lower.includes("job")) {
      return "For CVs and job applications, start with Ladywood Digital Drop-in or Spring Hill Library Hub. They can help with CV files, uploads, email, and online applications.";
    }

    if (
      lower.includes("nhs") ||
      lower.includes("benefit") ||
      lower.includes("council") ||
      lower.includes("email") ||
      lower.includes("password") ||
      lower.includes("print") ||
      lower.includes("scan")
    ) {
      return "Digital support is available for email, passwords, NHS services, benefits, council forms, printing, scanning, and uploads. The Digital Help page lists each topic with nearby help and beginner guides.";
    }

    if (lower.includes("cafe")) {
      return `Partner cafes and spaces include ${quickData.cafes
        .map((partner) => `${partner.name}, digital help ${partner.digitalHelpHours}`)
        .join(", ")}. Some offer coffee rewards through the portal.`;
    }

    if (lower.includes("bench")) {
      return `Community Connect Bench points in this prototype include ${quickData.benches
        .map((bench) => `${bench.name} at ${bench.address}`)
        .join(", ")}. Each bench links to free Wi-Fi, charging, support routes, and local events.`;
    }

    if (lower.includes("direction") || lower.includes("where") || lower.includes("open") || lower.includes("hours")) {
      return "Use Connect with the City for marker cards with distance, opening hours, accessibility notes, directions preview, and more info.";
    }

    return "The best next step is the Connect with the City map. It can filter Ladywood support by Wi-Fi, charging, digital help, refurbished devices, events, accessibility, and open today.";
  };

  const submitQuestion = (question: string) => {
    const clean = question.trim();
    if (!clean) return;
    const answer = buildResponse(clean);
    setMessages((current) => [...current, { role: "user", text: clean }, { role: "assistant", text: answer }]);
    setInput("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="govuk-button fixed bottom-5 right-5 z-40 px-4 py-3 text-sm"
      >
        <Bot size={18} aria-hidden="true" />
        {t("chat.button")}
      </button>

      {isOpen && (
        <section
          className="fixed bottom-20 right-4 z-50 flex max-h-[78vh] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden border-2 border-ink bg-white sm:right-5"
          aria-label="City Helper chat"
        >
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} aria-hidden="true" />
              <h2 className="font-black">{t("chat.button")}</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="border-2 border-white bg-ink p-2 text-white hover:bg-slate-800"
              aria-label={t("chat.close")}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-slate-200 p-3">
            {exampleQuestionKeys.map((questionKey) => {
              const question = t(questionKey);
              return (
                <button
                  key={questionKey}
                  type="button"
                  onClick={() => submitQuestion(question)}
                  className="border-2 border-ink bg-white px-3 py-2 text-left text-xs font-bold text-ink hover:bg-lagoon-50"
                >
                  {question}
                </button>
              );
            })}
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <div className="border-2 border-slate-400 bg-lagoon-50 px-3 py-2 text-sm font-semibold leading-relaxed text-slate-800">
              {t("chat.greeting")}
            </div>
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`border-2 px-3 py-2 text-sm font-semibold leading-relaxed ${
                  message.role === "assistant" ? "border-slate-400 bg-lagoon-50 text-slate-800" : "ml-8 border-ink bg-white text-ink"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitQuestion(input);
            }}
            className="border-t border-slate-200 p-3"
          >
            <div className="flex gap-2">
              <label htmlFor="city-helper-input" className="sr-only">
                {t("chat.button")}
              </label>
              <input
                id="city-helper-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 px-3 py-2 text-sm font-semibold text-ink"
                placeholder={t("chat.placeholder")}
              />
              <button type="submit" className="govuk-button px-3 py-2" aria-label="Send question">
                <Send size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => onNavigate("connect")}
                className="govuk-button govuk-button--secondary px-3 py-2 text-xs"
              >
                {t("chat.map")}
              </button>
              <button
                type="button"
                onClick={() => onNavigate("events")}
                className="govuk-button govuk-button--secondary px-3 py-2 text-xs"
              >
                {t("chat.events")}
              </button>
              <button
                type="button"
                onClick={() => onNavigate("refurbishment")}
                className="govuk-button govuk-button--secondary px-3 py-2 text-xs"
              >
                {t("chat.devices")}
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
