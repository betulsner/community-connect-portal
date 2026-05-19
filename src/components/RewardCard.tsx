import { Gift } from "lucide-react";
import type { Reward } from "../types";

interface RewardCardProps {
  reward: Reward;
}

export default function RewardCard({ reward }: RewardCardProps) {
  return (
    <article className="hc-panel rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sun-100 text-sun-600">
          <Gift size={22} aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-extrabold text-lagoon-700">{reward.points} points</p>
          <h3 className="text-lg font-black text-ink">{reward.title}</h3>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{reward.description}</p>
        </div>
      </div>
    </article>
  );
}
