import { Coffee, MapPin, Printer, Stamp, Trophy, Wrench } from "lucide-react";
import { mockUser } from "../data/user";
import { rewards } from "../data/rewards";
import type { PageId, PortalUser } from "../types";

interface StampsProps {
  user: PortalUser;
  onNavigate: (page: PageId) => void;
}

const rewardIcons: Record<string, React.ElementType> = {
  coffee: Coffee,
  printing: Printer,
  "repair-discount": Wrench,
  priority: Trophy
};

const locationRewards = [
  {
    place: "Bridge Street Community Cafe",
    reward: "Free filter coffee",
    stampsNeeded: 2,
    description: "Attend 2 digital help sessions or community cafe meetups to earn a free coffee.",
    howToEarn: "Visit the cafe during digital help hour or community meetups."
  },
  {
    place: "Spring Hill Library Hub",
    reward: "Free printing voucher",
    stampsNeeded: 3,
    description: "Print your CV, benefit forms, or appointment letters free of charge.",
    howToEarn: "Complete a digital skills session or CV help hour at the library."
  },
  {
    place: "Rework Ladywood Device Point",
    reward: "Device repair discount",
    stampsNeeded: 5,
    description: "Get a discount on device parts at any repair or refurbishment event.",
    howToEarn: "Attend a repair event or device setup session at Rework Ladywood."
  },
  {
    place: "Ladywood Digital Drop-in",
    reward: "Priority workshop booking",
    stampsNeeded: 4,
    description: "Get early access to book beginner digital skills sessions and device setup appointments.",
    howToEarn: "Attend 4 digital drop-in sessions at the health centre."
  }
];

export default function Stamps({ user, onNavigate }: StampsProps) {
  const points = mockUser.rewardPoints;
  const maxPoints = Math.max(...rewards.map((r) => r.points));

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">

        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">Your rewards</p>
          <h1 className="mt-2 text-4xl font-black text-ink">
            My Stamps — {user.username === "demo" ? mockUser.name : user.username}
          </h1>
          <p className="mt-4 text-xl text-slate-700">
            Earn stamps by attending sessions, events, and visiting partner locations. Redeem them for free rewards across Ladywood.
          </p>
        </div>

        {/* Points summary */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="govuk-panel bg-lagoon-50 p-6 text-center">
            <Stamp size={32} className="mx-auto text-lagoon-700" aria-hidden="true" />
            <p className="mt-3 text-5xl font-black text-ink">{points}</p>
            <p className="mt-1 font-bold text-slate-700">points collected</p>
          </div>
          <div className="govuk-panel p-6 text-center">
            <Trophy size={32} className="mx-auto text-lagoon-700" aria-hidden="true" />
            <p className="mt-3 text-5xl font-black text-ink">
              {rewards.filter((r) => r.points <= points).length}
            </p>
            <p className="mt-1 font-bold text-slate-700">rewards unlocked</p>
          </div>
          <div className="govuk-panel p-6 text-center">
            <MapPin size={32} className="mx-auto text-lagoon-700" aria-hidden="true" />
            <p className="mt-3 text-5xl font-black text-ink">{locationRewards.length}</p>
            <p className="mt-1 font-bold text-slate-700">partner locations</p>
          </div>
        </div>

        {/* Rewards you can redeem */}
        <div className="mb-10">
          <h2 className="text-2xl font-black text-ink">Your rewards</h2>
          <p className="mt-2 text-base text-slate-700">Rewards you have unlocked are shown in green. Show the staff at the location to redeem.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rewards.map((reward) => {
              const unlocked = points >= reward.points;
              const Icon = rewardIcons[reward.id] ?? Trophy;
              return (
                <article
                  key={reward.id}
                  className={`govuk-panel flex flex-col p-5 ${unlocked ? "border-green-600 bg-green-50" : ""}`}
                >
                  <Icon
                    size={28}
                    className={unlocked ? "text-green-700" : "text-slate-400"}
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 text-lg font-black text-ink">{reward.title}</h3>
                  <p className="mt-1 text-sm font-bold text-slate-600">{reward.points} points needed</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{reward.description}</p>
                  <div className="mt-4">
                    {unlocked ? (
                      <span className="inline-block bg-green-700 px-3 py-1 text-sm font-bold text-white">
                        Unlocked ✓
                      </span>
                    ) : (
                      <div>
                        <div className="h-2 w-full bg-slate-200">
                          <div
                            className="h-2 bg-lagoon-700"
                            style={{ width: `${Math.min(100, (points / reward.points) * 100)}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          {reward.points - points} more points needed
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Where to earn stamps */}
        <div className="mb-10">
          <h2 className="text-2xl font-black text-ink">Where to earn stamps</h2>
          <p className="mt-2 text-base text-slate-700">Visit these locations and attend sessions to collect stamps and unlock rewards.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {locationRewards.map((item) => (
              <article key={item.place} className="govuk-panel p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-1 text-sm font-bold text-lagoon-700">
                      <MapPin size={14} aria-hidden="true" />
                      {item.place}
                    </p>
                    <h3 className="mt-1 text-lg font-black text-ink">{item.reward}</h3>
                  </div>
                  <span className="shrink-0 border-2 border-ink bg-ink px-3 py-1 text-sm font-bold text-white">
                    {item.stampsNeeded} stamps
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.description}</p>
                <p className="mt-3 text-sm font-bold text-slate-600">
                  How to earn: {item.howToEarn}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="govuk-panel bg-lagoon-50 p-6 max-w-2xl">
          <h2 className="text-xl font-black text-ink">How the stamp scheme works</h2>
          <ol className="mt-4 space-y-3">
            {[
              "Attend a session, event, or visit a partner location in Ladywood.",
              "Ask the staff or volunteer to log your visit — they will add points to your account.",
              "Check your total here to see which rewards you have unlocked.",
              "Visit the partner location and show your unlocked reward to claim it.",
              "Keep attending to unlock more rewards over time."
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-sm font-semibold text-slate-700">
                <span className="flex h-7 w-7 min-w-7 items-center justify-center bg-ink text-white font-bold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button type="button" onClick={() => onNavigate("dashboard")} className="govuk-button govuk-button--secondary px-5 py-3">
            Back to dashboard
          </button>
          <button type="button" onClick={() => onNavigate("connect")} className="govuk-button px-5 py-3">
            Find events and locations
          </button>
        </div>
      </div>
    </section>
  );
}
