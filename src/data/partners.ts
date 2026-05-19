import type { Partner } from "../types";

export const partners: Partner[] = [
  {
    id: "bridge-cafe",
    name: "Bridge Street Community Cafe",
    wifi: true,
    charging: true,
    digitalHelpHours: "Wednesday 12:00-14:00",
    reward: "Free filter coffee after two support visits",
    address: "Bridge Street, Ladywood",
    openingHours: "Mon-Sat 08:00-18:00"
  },
  {
    id: "canal-room",
    name: "Canal Side Community Room",
    wifi: true,
    charging: true,
    digitalHelpHours: "Friday 10:00-12:00",
    reward: "Tea voucher for event check-ins",
    address: "Canal Walk, Ladywood",
    openingHours: "Mon-Fri 09:30-16:30"
  },
  {
    id: "summerfield-centre",
    name: "Summerfield Community Centre",
    wifi: true,
    charging: false,
    digitalHelpHours: "Tuesday 13:00-15:00",
    reward: "Priority booking for beginner workshops",
    address: "Summerfield Park entrance",
    openingHours: "Tue-Sat 10:00-17:00"
  },
  {
    id: "spring-hill-library",
    name: "Spring Hill Library Hub",
    wifi: true,
    charging: true,
    digitalHelpHours: "Library desk during staffed hours",
    reward: "Free printing voucher after guide completion",
    address: "Spring Hill, Ladywood",
    openingHours: "Tue-Sat 09:30-17:00"
  },
  {
    id: "neighbourhood-room",
    name: "Ladywood Neighbourhood Room",
    wifi: true,
    charging: true,
    digitalHelpHours: "Monday 11:00-13:00",
    reward: "Workshop reminder and coffee token",
    address: "St Vincent Street West",
    openingHours: "Mon-Fri 09:00-15:30"
  }
];
