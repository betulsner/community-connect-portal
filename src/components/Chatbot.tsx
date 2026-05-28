import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, X } from "lucide-react";
import { useI18n } from "../i18n";
import type { PageId } from "../types";

interface ChatbotProps {
  onNavigate: (page: PageId) => void;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function Chatbot({ onNavigate }: ChatbotProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-open after short delay — desktop only (≥768px), never on mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
        setEverOpened(true);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
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

  const suggestions = [t("chat.q1"), t("chat.q2"), t("chat.q3"), t("chat.q4")];

  return (
    <>
      {/* Full chat panel — always rendered, shown/hidden via CSS */}
      <div
        className={`ch-panel ${isOpen ? "ch-panel--open" : "ch-panel--closed"}`}
        role="dialog"
        aria-label={t("chat.name")}
        aria-modal="false"
        aria-hidden={!isOpen}
      >
        <div className="ch-panel__header">
          <div className="ch-panel__avatar" aria-hidden="true">
            <Bot size={20} />
          </div>
          <div className="ch-panel__title">
            <span className="ch-panel__name">{t("chat.name")}</span>
            <span className="ch-panel__sub">{t("chat.subtitle")}</span>
          </div>
          <button
            type="button"
            className="ch-panel__close"
            onClick={() => setIsOpen(false)}
            aria-label={t("chat.close")}
            tabIndex={isOpen ? 0 : -1}
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="ch-panel__body">
          <div className="ch-panel__notice">
            {t("chat.notice")}
          </div>

          <div className="ch-panel__bubble ch-panel__bubble--bot">
            {t("chat.greeting")}
          </div>

          <p className="ch-panel__disclaimer">
            {t("chat.disclaimer")}
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
              {t("chat.thinking")}
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
            {t("chat.map")}
          </button>
          <button
            type="button"
            onClick={() => onNavigate("connect")}
            className="ch-panel__shortcut"
            tabIndex={isOpen ? 0 : -1}
          >
            {t("chat.events")}
          </button>
          <button
            type="button"
            onClick={() => onNavigate("refurbishment")}
            className="ch-panel__shortcut"
            tabIndex={isOpen ? 0 : -1}
          >
            {t("chat.devices")}
          </button>
          <button
            type="button"
            onClick={() => onNavigate("access-data")}
            className="ch-panel__shortcut"
            tabIndex={isOpen ? 0 : -1}
          >
            {t("chat.internet")}
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
            {t("chat.name")}
          </label>
          <input
            id="ch-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chat.placeholder")}
            disabled={loading}
            className="ch-panel__input"
            tabIndex={isOpen ? 0 : -1}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="ch-panel__send"
            aria-label={t("chat.button")}
            tabIndex={isOpen ? 0 : -1}
          >
            <Send size={15} aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* Circular FAB — shown when panel is closed */}
      <div className={`ch-fab-wrap ${isOpen ? "ch-fab-wrap--hidden" : "ch-fab-wrap--visible"}`}>
        <span className="ch-fab__label" aria-hidden="true">{t("chat.fabLabel")}</span>
        <button
          type="button"
          className={`ch-fab${!everOpened ? " ch-fab--pulse" : ""}`}
          onClick={open}
          aria-label={t("chat.button")}
        >
          <Bot size={26} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
