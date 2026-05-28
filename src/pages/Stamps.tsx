import { Coffee, Printer, Stamp, Trophy, Wrench } from "lucide-react";
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

export default function Stamps({ user, onNavigate }: StampsProps) {
  const points = mockUser.stamps;

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">

        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">Your rewards</p>
          <h1 className="mt-2 text-4xl font-black text-ink">
            My Stamps — {user.username === "demo" ? mockUser.name : user.username}
          </h1>
          <p className="mt-4 text-xl text-slate-700">
            Earn stamps by attending events marked with a stamp badge. Redeem them for free rewards.
          </p>
        </div>

        {/* Points summary — two stat cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 max-w-lg">
          <div className="govuk-panel bg-lagoon-50 p-6 text-center">
            <Stamp size={32} className="mx-auto text-lagoon-700" aria-hidden="true" />
            <p className="mt-3 text-5xl font-black text-ink">{points}</p>
            <p className="mt-1 font-bold text-slate-700">stamps collected</p>
          </div>
          <div className="govuk-panel p-6 text-center">
            <Trophy size={32} className="mx-auto text-lagoon-700" aria-hidden="true" />
            <p className="mt-3 text-5xl font-black text-ink">
              {rewards.filter((r) => r.points <= points).length}
            </p>
            <p className="mt-1 font-bold text-slate-700">rewards unlocked</p>
          </div>
        </div>

        {/* Rewards you can redeem */}
        <div className="mb-10">
          <h2 className="text-2xl font-black text-ink">Your rewards</h2>
          <p className="mt-2 text-base text-slate-700">
            Rewards you have unlocked are shown in green. Show the staff at the location to redeem.
          </p>
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
                  <p className="mt-1 text-sm font-bold text-slate-600">{reward.points} stamps needed</p>
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
                          {reward.points - points} more stamps needed
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* How the stamp scheme works */}
        <div className="govuk-panel bg-lagoon-50 p-6 max-w-2xl">
          <h2 className="text-xl font-black text-ink">How the stamp scheme works</h2>
          <ol className="mt-4 space-y-3">
            {[
              "Go to Connect with the City and select events that show a stamp badge.",
              "Attend the event in person at the listed location.",
              "Ask the staff or volunteer to log your attendance — they will add stamps to your account.",
              "Check your total here to see which rewards you have unlocked.",
              "Show your unlocked reward at the event or partner location to claim it."
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
          <button
            type="button"
            onClick={() => onNavigate("dashboard")}
            className="govuk-button govuk-button--secondary px-5 py-3"
          >
            Back to dashboard
          </button>
          <button
            type="button"
            onClick={() => onNavigate("connect")}
            className="govuk-button px-5 py-3"
          >
            Find stamp events
          </button>
        </div>
      </div>
    </section>
  );
}
