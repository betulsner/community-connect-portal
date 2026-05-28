import MapSection from "../components/MapSection";
import type { CommunityEvent, PortalUser } from "../types";

interface ConnectCityProps {
  onAddReminder: (event: CommunityEvent) => void;
  onRemoveReminder: (eventId: string) => void;
  reminders: CommunityEvent[];
  user?: PortalUser | null;
  preselectId?: string | null;
  onPreselectConsumed?: () => void;
}

export default function ConnectCity({
  onAddReminder,
  onRemoveReminder,
  reminders,
  user,
  preselectId,
  onPreselectConsumed
}: ConnectCityProps) {
  return (
    <MapSection
      onAddReminder={onAddReminder}
      onRemoveReminder={onRemoveReminder}
      reminders={reminders}
      user={user}
      preselectId={preselectId}
      onPreselectConsumed={onPreselectConsumed}
    />
  );
}
