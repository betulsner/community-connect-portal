import MapSection from "../components/MapSection";
import type { CommunityEvent } from "../types";

interface ConnectCityProps {
  onAddReminder: (event: CommunityEvent) => void;
  onRemoveReminder: (eventId: string) => void;
  reminders: CommunityEvent[];
}

export default function ConnectCity({ onAddReminder, onRemoveReminder, reminders }: ConnectCityProps) {
  return <MapSection onAddReminder={onAddReminder} onRemoveReminder={onRemoveReminder} reminders={reminders} />;
}
