import type { RefurbishmentPoint } from "../types";

export const refurbishmentPoints: RefurbishmentPoint[] = [
  {
    id: "rework-ladywood",
    name: "Rework Ladywood Device Point",
    area: "Icknield Port Road",
    openDays: "Thursday 11:00-16:00, Saturday 10:00-13:00",
    offers: ["Refurbished laptops", "Basic repairs", "Device setup", "Donation drop-off"],
    cost: "Free checks; low-cost repairs",
    contact: "Walk in or ask at Bridge Street Community Cafe",
    accessibility: "Ground-floor entrance with appointment slots for quieter support."
  },
  {
    id: "spring-hill-device-desk",
    name: "Spring Hill Library Device Desk",
    area: "Spring Hill",
    openDays: "Tuesday-Friday 10:00-15:00",
    offers: ["Device support applications", "Printing and scanning", "Social tariff guidance"],
    cost: "Free",
    contact: "Library help desk",
    accessibility: "Ramp access, large-print forms, and seated waiting area."
  },
  {
    id: "canal-side-repair",
    name: "Canal Side Repair Table",
    area: "Canal Side Community Room",
    openDays: "Last Saturday of each month",
    offers: ["Phone checks", "Laptop cleaning", "Battery advice", "Referral for repairs"],
    cost: "Free advice; parts priced before work",
    contact: "Book through the portal events list",
    accessibility: "Step-free room with nearby accessible parking."
  },
  {
    id: "data-bank-help",
    name: "Ladywood Mobile Data Support",
    area: "Ladywood Health and Community Centre",
    openDays: "Monday and Wednesday 10:00-14:00",
    offers: ["Mobile data SIM support", "National Databank-style referrals", "Phone setup"],
    cost: "Free if eligible",
    contact: "Ask for the digital inclusion worker",
    accessibility: "Level entrance, quiet appointments, and translation support by request."
  },
  {
    id: "bridge-cafe-donations",
    name: "Bridge Street Laptop Donation Point",
    area: "Bridge Street",
    openDays: "Monday-Saturday 08:00-18:00",
    offers: ["Laptop donation drop-off", "Charger collection", "Reward vouchers", "Setup referrals"],
    cost: "Free donation point",
    contact: "Speak to cafe staff at the counter",
    accessibility: "Wide doorway and staff support for heavy items."
  }
];
