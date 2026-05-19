export type PageId = "home" | "connect" | "digital" | "refurbishment" | "events" | "about";

export type LocationTag =
  | "wifi"
  | "charging"
  | "digital-help"
  | "refurbished-devices"
  | "events"
  | "accessible"
  | "open-today";

export type LocationType =
  | "Community Connect Bench"
  | "Partner Cafe"
  | "Digital Support Centre"
  | "Library and Community Space"
  | "Refurbishment Point"
  | "Free Wi-Fi Point"
  | "Local Event";

export interface MapLocation {
  id: string;
  name: string;
  type: LocationType;
  distance: string;
  openingHours: string;
  address: string;
  services: string[];
  accessibility: string;
  tags: LocationTag[];
  coordinates: {
    x: number;
    y: number;
  };
}

export interface DigitalHelpTopic {
  id: string;
  title: string;
  explanation: string;
  guideSteps: string[];
  relatedTags: LocationTag[];
}

export interface RefurbishmentPoint {
  id: string;
  name: string;
  area: string;
  openDays: string;
  offers: string[];
  cost: string;
  contact: string;
  accessibility: string;
}

export interface CommunityEvent {
  id: string;
  name: string;
  dateTime: string;
  location: string;
  price: string;
  audience: string;
  category: string;
  summary: string;
}

export interface Partner {
  id: string;
  name: string;
  wifi: boolean;
  charging: boolean;
  digitalHelpHours: string;
  reward: string;
  address: string;
  openingHours: string;
}

export interface Reward {
  id: string;
  title: string;
  points: number;
  description: string;
}

export interface PortalSettings {
  simpleEnglish: boolean;
  largeText: boolean;
  highContrast: boolean;
  language: string;
}

export interface PortalUser {
  username: string;
  mode: "demo" | "guest";
}
