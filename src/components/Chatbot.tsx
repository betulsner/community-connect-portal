import { useMemo, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { locations } from "../data/locations";
import { refurbishmentPoints } from "../data/refurbishment";
import { events } from "../data/events";
import { partners } from "../data/partners";
import type { PageId } from "../types";

interface ChatbotProps {
  onNavigate: (page: PageId) => void;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

const exampleQuestions = [
  "Where can I get free Wi-Fi?",
  "Where can I get a refurbished laptop?",
  "What events are near me?",
  "Where can I get help with a CV?",
  "Which cafe has digital help today?"
];

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
  "café",
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
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I am City Helper. Ask me about Ladywood benches, free Wi-Fi, charging, digital help, events, cafes, and device support."
    }
  ]);

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
      return "I can only help with Ladywood and Birmingham support, events, digital access, benches, and community services.";
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

    if (lower.includes("nhs") || lower.includes("benefit") || lower.includes("council") || lower.includes("email") || lower.includes("password") || lower.includes("print") || lower.includes("scan")) {
      return "Digital support is available for email, passwords, NHS services, benefits, council forms, printing, scanning, and uploads. The Digital Help page lists each topic with nearby help and beginner guides.";
    }

    if (lower.includes("cafe") || lower.includes("café")) {
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
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-extrabold text-white shadow-portal hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sun-500"
      >
        <Bot size={18} aria-hidden="true" />
        Ask City Helper
      </button>

      {isOpen && (
        <section
          className="fixed bottom-20 right-4 z-50 flex max-h-[78vh] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-portal sm:right-5"
          aria-label="City Helper chat"
        >
          <div className="flex items-center justify-between bg-lagoon-700 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} aria-hidden="true" />
              <h2 className="font-black">Ask City Helper</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close City Helper"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-slate-200 p-3">
            {exampleQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => submitQuestion(question)}
                className="rounded-lg bg-lagoon-50 px-3 py-2 text-left text-xs font-extrabold text-lagoon-700 hover:bg-lagoon-100 focus:outline-none focus:ring-2 focus:ring-sun-500"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-lg px-3 py-2 text-sm font-semibold leading-relaxed ${
                  message.role === "assistant" ? "bg-slate-100 text-slate-800" : "ml-8 bg-sun-100 text-ink"
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
                Ask City Helper
              </label>
              <input
                id="city-helper-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-ink focus:border-lagoon-700 focus:outline-none focus:ring-2 focus:ring-lagoon-700/20"
                placeholder="Ask about local support"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-lg bg-sun-500 px-3 py-2 text-white hover:bg-sun-600 focus:outline-none focus:ring-2 focus:ring-ink"
                aria-label="Send question"
              >
                <Send size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => onNavigate("connect")}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-extrabold text-ink hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sun-500"
              >
                Map
              </button>
              <button
                type="button"
                onClick={() => onNavigate("events")}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-extrabold text-ink hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sun-500"
              >
                Events
              </button>
              <button
                type="button"
                onClick={() => onNavigate("refurbishment")}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-extrabold text-ink hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sun-500"
              >
                Devices
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
