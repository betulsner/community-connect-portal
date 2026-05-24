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

const exampleQuestionKeys = ["chat.q1", "chat.q2", "chat.q3", "chat.q4", "chat.q5"];

export default function Chatbot({ onNavigate }: ChatbotProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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

      if (!response.ok) {
        throw new Error(data.error ?? `Server error ${response.status}`);
      }

      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Chatbot error:", message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Sorry, something went wrong: ${message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
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
                  disabled={loading}
                  className="border-2 border-ink bg-white px-3 py-2 text-left text-xs font-bold text-ink hover:bg-lagoon-50 disabled:opacity-50"
                >
                  {question}
                </button>
              );
            })}
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <div className="border border-amber-300 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-slate-700">
              Your messages are sent to OpenAI to generate responses and are not stored by this
              service. Do not share personal details such as your NHS number, date of birth, or
              passwords — visit a local support venue for those topics.
            </div>

            <div className="border-2 border-slate-400 bg-lagoon-50 px-3 py-2 text-sm font-semibold leading-relaxed text-slate-800">
              {t("chat.greeting")}
            </div>

            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`border-2 px-3 py-2 text-sm font-semibold leading-relaxed ${
                  message.role === "assistant"
                    ? "border-slate-400 bg-lagoon-50 text-slate-800"
                    : "ml-8 border-ink bg-white text-ink"
                }`}
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 border-2 border-slate-400 bg-lagoon-50 px-3 py-2 text-sm font-semibold text-slate-600">
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Thinking...
              </div>
            )}

            <div ref={bottomRef} />
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
                disabled={loading}
                className="min-w-0 flex-1 px-3 py-2 text-sm font-semibold text-ink disabled:opacity-50"
                placeholder={t("chat.placeholder")}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="govuk-button px-3 py-2 disabled:opacity-50"
                aria-label="Send question"
              >
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
                onClick={() => onNavigate("connect")}
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
