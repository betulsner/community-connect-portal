export type PageId =
  | "home"
  | "connect"
  | "digital"
  | "refurbishment"
  | "stamps"
  | "dashboard"
  | "about"
  | "login"
  | "volunteer"
  | "donate"
  | "free-sim"
  | "affordable-internet"
  | "access-data";

export type LocationTag =
  | "wifi"
  | "charging"
  | "digital-help"
  | "refurbished-devices"
  | "events"
  | "stamps-offered"
  | "accessible"
  | "walking-distance"
  | "open-today"
  | "bench"
  | "drop-in"
  | "digital-inclusion"
  | "device-hub";

export type LocationType =
  | "Community Connect Bench"
  | "Partner Cafe"
  | "Digital Support Centre"
  | "Library and Community Space"
  | "Refurbishment Point"
  | "Free Wi-Fi Point"
  | "Local Event"
  | "Digital Inclusion Centre"
  | "Device Hub";

export interface MapLocation {
  id: string;
  name: string;
  type: LocationType;
  providerName: string;
  distance: string;
  travelTime?: string;
  openingHours: string;
  address: string;
  coordinatesLatLng?: {
    lat: number;
    lng: number;
  };
  services: string[];
  accessibility: string;
  nearestBusStop?: string;
  hasSeating?: boolean;
  whoFor?: string;
  cost?: string;
  contact?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  tags: LocationTag[];
  coordinates?: {
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
  recommendedLocationId?: string;
  recommendedEventId?: string;
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
  devicesAvailable?: boolean;
  eligibility?: string[];
  email?: string;
  mapLocationId?: string;
  address?: string;
  website?: string;
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
  accessibility: string;
  helpOffered: string;
  locationId?: string;
  contact?: string;
  stampsOffered?: boolean;
  stampsCount?: number;
  themes?: string[];
  transportNote?: string;
  sourceNote?: string;
  coordinatesLatLng?: { lat: number; lng: number };
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
  largeText: boolean;
  language: string;
}

export interface PortalUser {
  username: string;
  mode: "demo" | "guest";
}

export interface MockUserProfile {
  name: string;
  hasRefurbishedDevice: boolean;
  deviceType: string;
  deviceReceivedDate: string;
  stamps: number;
  digitalHelpProgress: string;
}
