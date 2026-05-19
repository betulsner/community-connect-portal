import type { MapLocation } from "../types";

export const locations: MapLocation[] = [
  {
    id: "ladywood-bench-central",
    name: "Ladywood Community Connect Bench",
    type: "Community Connect Bench",
    distance: "0.1 miles",
    openingHours: "Wi-Fi and charging available all day",
    address: "Near St Vincent Street West, Ladywood",
    services: ["Free Wi-Fi", "USB charging", "Portal access", "Local support routes"],
    accessibility: "Step-free pavement access with seating and nearby bus stops.",
    tags: ["wifi", "charging", "accessible", "open-today"],
    coordinates: { x: 46, y: 55 }
  },
  {
    id: "ladywood-health-centre",
    name: "Ladywood Digital Drop-in",
    type: "Digital Support Centre",
    distance: "0.3 miles",
    openingHours: "Mon, Wed, Fri 10:00-15:00",
    address: "Ladywood Health and Community Centre",
    services: ["Email help", "NHS app support", "Benefits forms", "CV upload help"],
    accessibility: "Level entrance, accessible toilet, quiet appointment slots.",
    tags: ["wifi", "digital-help", "accessible", "open-today"],
    coordinates: { x: 34, y: 42 }
  },
  {
    id: "spring-hill-library",
    name: "Spring Hill Library Hub",
    type: "Library and Community Space",
    distance: "0.6 miles",
    openingHours: "Tue-Sat 09:30-17:00",
    address: "Spring Hill, Ladywood",
    services: ["Public computers", "Printing", "Scanning", "Beginner guides", "Free Wi-Fi"],
    accessibility: "Ramp access and large-print forms available.",
    tags: ["wifi", "digital-help", "accessible", "open-today"],
    coordinates: { x: 63, y: 37 }
  },
  {
    id: "bridge-cafe",
    name: "Bridge Street Community Cafe",
    type: "Partner Cafe",
    distance: "0.4 miles",
    openingHours: "Mon-Sat 08:00-18:00",
    address: "Bridge Street, Ladywood",
    services: ["Free Wi-Fi", "Charging sockets", "Digital help hour", "Coffee rewards"],
    accessibility: "Wide doorway, staff can help with seating near sockets.",
    tags: ["wifi", "charging", "digital-help", "accessible", "open-today"],
    coordinates: { x: 54, y: 66 }
  },
  {
    id: "rework-ladywood",
    name: "Rework Ladywood Device Point",
    type: "Refurbishment Point",
    distance: "0.8 miles",
    openingHours: "Thu 11:00-16:00, Sat 10:00-13:00",
    address: "Community Workshop, Icknield Port Road",
    services: ["Refurbished laptops", "Device setup", "Repair events", "Data SIM referrals"],
    accessibility: "Ground-floor workshop with appointment support.",
    tags: ["refurbished-devices", "digital-help", "accessible", "open-today"],
    coordinates: { x: 73, y: 61 }
  },
  {
    id: "summerfield-park-wifi",
    name: "Summerfield Park Wi-Fi Point",
    type: "Free Wi-Fi Point",
    distance: "0.9 miles",
    openingHours: "Park opening hours",
    address: "Summerfield Park entrance",
    services: ["Free Wi-Fi", "Community notice board", "Outdoor seating"],
    accessibility: "Paved route from the main gate; nearest toilets at the community centre.",
    tags: ["wifi", "accessible", "open-today"],
    coordinates: { x: 25, y: 72 }
  },
  {
    id: "coffee-connect-event",
    name: "Coffee and Connection Morning",
    type: "Local Event",
    distance: "0.5 miles",
    openingHours: "Friday 11:00-12:30",
    address: "Canal Side Community Room",
    services: ["Friendly meetup", "Device questions", "Volunteer introductions"],
    accessibility: "Step-free access and quiet table available.",
    tags: ["wifi", "events", "digital-help", "accessible", "open-today"],
    coordinates: { x: 42, y: 30 }
  },
  {
    id: "newtown-bench",
    name: "Newtown Row Connect Bench",
    type: "Community Connect Bench",
    distance: "1.1 miles",
    openingHours: "Wi-Fi available all day; charging 07:00-21:00",
    address: "Newtown Row, near the bus interchange",
    services: ["Free Wi-Fi", "Charging", "Route to support", "Local events board"],
    accessibility: "Flat pavement route with seating on both sides.",
    tags: ["wifi", "charging", "accessible", "open-today"],
    coordinates: { x: 79, y: 28 }
  }
];
