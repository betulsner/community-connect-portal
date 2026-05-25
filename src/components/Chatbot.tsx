import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, X } from "lucide-react";
import type { PageId } from "../types";

interface ChatbotProps {
  onNavigate: (page: PageId) => void;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

const suggestions = [
  "Find free Wi-Fi nearby",
  "I need device support",
  "Show local events",
  "Help me understand a form",
];

export default function Chatbot({ onNavigate }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-open after short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setEverOpened(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const open = () => {
    setIsOpen(true);
    setEverOpened(true);
  };

  const submitQuestion = async (question: string) => {
    const clean = question.trim();
    if (!clean || loading) return;

    const next: Message[] = [...messages, { role: "user", text: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? `Server error ${response.status}`);
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Sorry, something went wrong: ${msg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Full chat panel — always rendered, shown/hidden via CSS */}
      <div
        className={`ch-panel ${isOpen ? "ch-panel--open" : "ch-panel--closed"}`}
        role="dialog"
        aria-label="City Helper chat"
        aria-modal="false"
        aria-hidden={!isOpen}
      >
        <div className="ch-panel__header">
          <div className="ch-panel__avatar" aria-hidden="true">
            <Bot size={20} />
          </div>
          <div className="ch-panel__title">
            <span className="ch-panel__name">City Helper</span>
            <span className="ch-panel__sub">Local digital support guide</span>
          </div>
          <button
            type="button"
            className="ch-panel__close"
            onClick={() => setIsOpen(false)}
            aria-label="Close City Helper"
            tabIndex={isOpen ? 0 : -1}
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="ch-panel__body">
          <div className="ch-panel__notice">
            Messages are sent to OpenAI to generate responses. Do not share your NHS number, date of birth, or passwords.
          </div>

          <div className="ch-panel__bubble ch-panel__bubble--bot">
            Hi, I&rsquo;m City Helper. I can help you find free Wi&#8209;Fi, device support, local events, digital help, or explain something confusing.
          </div>

          <p className="ch-panel__disclaimer">
            AI may not always be accurate. For urgent or official help, contact a local support service.
          </p>

          {messages.length === 0 && (
            <div className="ch-panel__suggestions">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="ch-panel__suggestion"
                  onClick={() => submitQuestion(s)}
                  disabled={loading}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`ch-panel__bubble ${msg.role === "assistant" ? "ch-panel__bubble--bot" : "ch-panel__bubble--user"}`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="ch-panel__bubble ch-panel__bubble--bot ch-panel__bubble--loading">
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
              Thinking…
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="ch-panel__shortcuts">
          <button
            type="button"
            onClick={() => onNavigate("connect")}
            className="ch-panel__shortcut"
            tabIndex={isOpen ? 0 : -1}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => onNavigate("connect")}
            className="ch-panel__shortcut"
            tabIndex={isOpen ? 0 : -1}
          >
            Events
          </button>
          <button
            type="button"
            onClick={() => onNavigate("refurbishment")}
            className="ch-panel__shortcut"
            tabIndex={isOpen ? 0 : -1}
          >
            Devices
          </button>
          <button
            type="button"
            onClick={() => onNavigate("access-data")}
            className="ch-panel__shortcut"
            tabIndex={isOpen ? 0 : -1}
          >
            Internet
          </button>
        </div>

        <form
          className="ch-panel__input-row"
          onSubmit={(e) => {
            e.preventDefault();
            submitQuestion(input);
          }}
        >
          <label htmlFor="ch-input" className="sr-only">
            Ask City Helper
          </label>
          <input
            id="ch-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything…"
            disabled={loading}
            className="ch-panel__input"
            tabIndex={isOpen ? 0 : -1}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="ch-panel__send"
            aria-label="Send message"
            tabIndex={isOpen ? 0 : -1}
          >
            <Send size={15} aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* Circular FAB — shown when panel is closed */}
      <div className={`ch-fab-wrap ${isOpen ? "ch-fab-wrap--hidden" : "ch-fab-wrap--visible"}`}>
        <span className="ch-fab__label" aria-hidden="true">Need help?</span>
        <button
          type="button"
          className={`ch-fab${!everOpened ? " ch-fab--pulse" : ""}`}
          onClick={open}
          aria-label="Open City Helper"
        >
          <Bot size={26} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
