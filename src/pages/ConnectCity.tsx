import MapSection from "../components/MapSection";
import type { CommunityEvent } from "../types";

interface ConnectCityProps {
  onAddReminder: (event: CommunityEvent) => void;
  reminders: CommunityEvent[];
}

export default function ConnectCity({ onAddReminder, reminders }: ConnectCityProps) {
  return <MapSection onAddReminder={onAddReminder} reminders={reminders} />;
}
