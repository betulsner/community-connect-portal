import { useState } from "react";
import { ArrowRight, BookOpen, LifeBuoy, MapPin } from "lucide-react";
import { digitalHelpTopics } from "../data/digitalHelp";
import type { DigitalHelpTopic, PageId } from "../types";

interface DigitalHelpProps {
  onNavigate: (page: PageId) => void;
}

export default function DigitalHelp({ onNavigate }: DigitalHelpProps) {
  const [selectedGuide, setSelectedGuide] = useState<DigitalHelpTopic>(digitalHelpTopics[0]);

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-extrabold uppercase text-lagoon-700">Digital Help</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Simple support for everyday online tasks.</h1>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-700">
            Choose the kind of help needed, then find a nearby session or open a beginner guide.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4 md:grid-cols-2">
            {digitalHelpTopics.map((topic) => (
              <article key={topic.id} className="hc-panel rounded-lg border border-slate-200 bg-white p-5 shadow-lift">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-lagoon-50 text-lagoon-700">
                  <LifeBuoy size={22} aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-xl font-black text-ink">{topic.title}</h2>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">{topic.explanation}</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => onNavigate("connect")}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sun-500"
                  >
                    <MapPin size={16} aria-hidden="true" />
                    Find nearby help
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedGuide(topic)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-ink hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sun-500"
                  >
                    <BookOpen size={16} aria-hidden="true" />
                    Beginner guide
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="hc-panel h-fit rounded-lg border border-lagoon-200 bg-lagoon-50 p-5 shadow-lift">
            <p className="text-sm font-extrabold uppercase text-lagoon-700">Beginner guide</p>
            <h2 className="mt-2 text-2xl font-black text-ink">{selectedGuide.title}</h2>
            <ol className="mt-5 space-y-3">
              {selectedGuide.guideSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm font-bold text-slate-700">
                  <span className="flex h-7 w-7 min-w-7 items-center justify-center rounded-lg bg-lagoon-700 text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => onNavigate("connect")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-sun-500 px-4 py-3 text-sm font-extrabold text-white hover:bg-sun-600 focus:outline-none focus:ring-2 focus:ring-ink"
            >
              Find a support place
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
