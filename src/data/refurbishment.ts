import type { RefurbishmentPoint } from "../types";

export const refurbishmentPoints: RefurbishmentPoint[] = [
  {
    id: "birmingham-united-foundation",
    name: "Birmingham United Foundation",
    area: "Birmingham, B19 area",
    address: "Birmingham B19 — contact for exact address",
    openDays: "Contact for current availability",
    offers: ["Refurbished laptops", "Tablets", "Device setup help", "Digital skills support"],
    cost: "Free if eligible",
    contact: "Email to request a device",
    email: "info@birminghamutd.com",
    accessibility: "Accessible building — contact for specific access needs.",
    devicesAvailable: true,
    eligibility: [
      "Receiving Universal Credit, PIP, ESA, JSA, Pension Credit, or Housing Benefit",
      "Household income below the low income threshold",
      "No working device at home",
      "Living in Birmingham"
    ],
    mapLocationId: "birmingham-united-foundation"
  },
  {
    id: "pitch2progress",
    name: "Pitch2Progress",
    area: "Birmingham, B9 area",
    address: "Birmingham B9 — contact for exact address",
    openDays: "Contact for current availability",
    offers: ["Refurbished laptops", "Phones", "Device setup help"],
    cost: "Free if eligible",
    contact: "Email to request a device",
    email: "contact@pitch2progress.co.uk",
    accessibility: "Accessible building — contact for specific access needs.",
    devicesAvailable: true,
    eligibility: [
      "Receiving means-tested benefits",
      "Low income household",
      "No suitable device at home",
      "Referred by a community partner or self-referral"
    ],
    mapLocationId: "pitch2progress"
  },
  {
    id: "ways-for-wellbeing",
    name: "Ways for Wellbeing UK CIC",
    area: "Ladywood, Birmingham B18",
    address: "Ladywood, Birmingham B18 — contact for exact address",
    openDays: "Contact for current availability",
    offers: ["Refurbished devices", "Setup and support", "Wellbeing referrals"],
    cost: "Free if eligible",
    contact: "Email to request a device",
    email: "Info@waysforwellbeing.com",
    accessibility: "Accessible building — contact for specific access needs.",
    devicesAvailable: false,
    eligibility: [
      "Living in Ladywood or surrounding area",
      "Receiving qualifying benefits",
      "No access to a working device",
      "Referred by a GP, social worker, or community organisation"
    ],
    mapLocationId: "ways-for-wellbeing"
  }
];
