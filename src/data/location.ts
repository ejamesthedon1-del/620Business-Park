export const propertyLocation = {
  name: "620 Oaks Office Park",
  address: "10713 Ranch Rd 620 N",
  city: "Austin, TX",
  zip: "78726",
  fullAddress: "10713 Ranch Rd 620 N, Austin, TX 78726",
  coordinates: { lat: 30.4321, lng: -97.8415 },
};

export const highway = {
  name: "Ranch Rd 620 N",
  shortName: "RM 620",
  description: "Center of northwest Austin's RM 620 business corridor",
  path: [
    [30.4021, -97.8502],
    [30.4113, -97.8510],
    [30.4198, -97.8458],
    [30.4321, -97.8415],
    [30.4532, -97.8270],
    [30.4585, -97.8210],
  ] as [number, number][],
};

export type BusinessGroup = "dining" | "grocery" | "banking" | "retail" | "services" | "onsite";
export type BusinessArea = "andersonMill" | "fourPoints" | "onsite";

export type PlazaLayout = "ring" | "campus";

export type PlazaCluster = {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  /** Degrees — used to fan out co-located markers in a ring */
  spreadRadius: number;
  /** Meters — subtle highlight on the map */
  highlightRadius: number;
  layout?: PlazaLayout;
  /** Campus footprint for office parks (lat, lng pairs) */
  footprint?: [number, number][];
};

/** Pin sits at the RM 620 frontage; tenants occupy suites inside the park */
export const propertyPinPosition = {
  lat: 30.43172,
  lng: -97.8415,
};

/** Stylized suite row — spaced for readability at corridor overview zoom */
const OFFICE_PARK_UNITS: Record<string, { lat: number; lng: number }> = {
  "first-foundations": { lat: 30.43248, lng: -97.84315 },
  "integrated-health": { lat: 30.43248, lng: -97.84115 },
  "mac-shop": { lat: 30.43248, lng: -97.83915 },
  "texas-farm-bureau": { lat: 30.43248, lng: -97.83715 },
};

export const officeParkFootprint: [number, number][] = [
  [30.43162, -97.84405],
  [30.43162, -97.83625],
  [30.43268, -97.83625],
  [30.43268, -97.84405],
];

export const officeParkLabelPosition = {
  lat: 30.43212,
  lng: -97.84015,
};

export const plazaClusters: Record<string, PlazaCluster> = {
  "plaza-volente": {
    id: "plaza-volente",
    name: "Plaza Volente",
    center: { lat: 30.4532, lng: -97.8270 },
    spreadRadius: 0.0015,
    highlightRadius: 130,
  },
  "four-points-centre": {
    id: "four-points-centre",
    name: "Four Points Centre",
    center: { lat: 30.4047, lng: -97.8513 },
    spreadRadius: 0.0011,
    highlightRadius: 95,
  },
  "four-points-7710": {
    id: "four-points-7710",
    name: "Four Points @ 7710",
    center: { lat: 30.41115, lng: -97.8508 },
    spreadRadius: 0.0007,
    highlightRadius: 70,
  },
  "620-office-park": {
    id: "620-office-park",
    name: "620 Oaks Office Park",
    center: { lat: 30.43227, lng: -97.8415 },
    spreadRadius: 0,
    highlightRadius: 0,
    layout: "campus",
    footprint: officeParkFootprint,
  },
};

export type NearbyBusiness = {
  id: string;
  name: string;
  category: string;
  group: BusinessGroup;
  area: BusinessArea;
  plaza?: string;
  coordinates: { lat: number; lng: number };
  logo: string;
  distance?: string;
  onSite?: boolean;
};

export const businessAreaLabels: Record<BusinessArea, string> = {
  andersonMill: "Anderson Mill",
  fourPoints: "Four Points",
  onsite: "On-Site",
};

export const nearbyBusinesses: NearbyBusiness[] = [
  // Anderson Mill / Plaza Volente
  {
    id: "heb-plaza-volente",
    name: "H-E-B Plus",
    category: "Grocery",
    group: "grocery",
    area: "andersonMill",
    plaza: "plaza-volente",
    coordinates: { lat: 30.4532, lng: -97.8270 },
    logo: "/images/logos/heb.png",
    distance: "~1.5 mi",
  },
  {
    id: "torchys",
    name: "Torchy's Tacos",
    category: "Dining",
    group: "dining",
    area: "andersonMill",
    plaza: "plaza-volente",
    coordinates: { lat: 30.4532, lng: -97.8270 },
    logo: "/images/logos/torchys.png",
    distance: "~1.5 mi",
  },
  {
    id: "panda-express",
    name: "Panda Express",
    category: "Dining",
    group: "dining",
    area: "andersonMill",
    plaza: "plaza-volente",
    coordinates: { lat: 30.4532, lng: -97.8270 },
    logo: "/images/logos/panda-express.png",
    distance: "~1.5 mi",
  },
  {
    id: "mod-pizza",
    name: "MOD Pizza",
    category: "Dining",
    group: "dining",
    area: "andersonMill",
    plaza: "plaza-volente",
    coordinates: { lat: 30.4532, lng: -97.8270 },
    logo: "/images/logos/mod-pizza.png",
    distance: "~1.5 mi",
  },
  {
    id: "starbucks-plaza-volente",
    name: "Starbucks",
    category: "Coffee",
    group: "dining",
    area: "andersonMill",
    plaza: "plaza-volente",
    coordinates: { lat: 30.4532, lng: -97.8270 },
    logo: "/images/logos/starbucks.png",
    distance: "~1.5 mi",
  },
  {
    id: "great-clips",
    name: "Great Clips",
    category: "Services",
    group: "services",
    area: "andersonMill",
    plaza: "plaza-volente",
    coordinates: { lat: 30.4532, lng: -97.8270 },
    logo: "/images/logos/great-clips.png",
    distance: "~1.5 mi",
  },
  {
    id: "carenow",
    name: "CareNow",
    category: "Medical",
    group: "services",
    area: "andersonMill",
    plaza: "plaza-volente",
    coordinates: { lat: 30.4532, lng: -97.8270 },
    logo: "/images/logos/carenow.png",
    distance: "~1.5 mi",
  },
  {
    id: "hotworx",
    name: "HOTWORX",
    category: "Fitness",
    group: "services",
    area: "andersonMill",
    plaza: "plaza-volente",
    coordinates: { lat: 30.4532, lng: -97.8270 },
    logo: "/images/logos/hotworx.png",
    distance: "~1.5 mi",
  },

  // Four Points corridor
  {
    id: "starbucks-four-points",
    name: "Starbucks",
    category: "Coffee",
    group: "dining",
    area: "fourPoints",
    plaza: "four-points-centre",
    coordinates: { lat: 30.4047, lng: -97.8513 },
    logo: "/images/logos/starbucks.png",
    distance: "~2 mi",
  },
  {
    id: "tropical-smoothie",
    name: "Tropical Smoothie",
    category: "Dining",
    group: "dining",
    area: "fourPoints",
    plaza: "four-points-centre",
    coordinates: { lat: 30.4047, lng: -97.8513 },
    logo: "/images/logos/tropical-smoothie.png",
    distance: "~2 mi",
  },
  {
    id: "subway",
    name: "Subway",
    category: "Dining",
    group: "dining",
    area: "fourPoints",
    plaza: "four-points-centre",
    coordinates: { lat: 30.4047, lng: -97.8513 },
    logo: "/images/logos/subway.svg",
    distance: "~2 mi",
  },
  {
    id: "heb-four-points",
    name: "H-E-B",
    category: "Grocery",
    group: "grocery",
    area: "fourPoints",
    plaza: "four-points-centre",
    coordinates: { lat: 30.4047, lng: -97.8513 },
    logo: "/images/logos/heb.png",
    distance: "~2 mi",
  },
  {
    id: "pnc",
    name: "PNC Bank",
    category: "Banking",
    group: "banking",
    area: "fourPoints",
    plaza: "four-points-centre",
    coordinates: { lat: 30.4047, lng: -97.8513 },
    logo: "/images/logos/pnc.png",
    distance: "~2 mi",
  },
  {
    id: "chipotle",
    name: "Chipotle",
    category: "Dining",
    group: "dining",
    area: "fourPoints",
    plaza: "four-points-7710",
    coordinates: { lat: 30.41115, lng: -97.8508 },
    logo: "/images/logos/chipotle.png",
    distance: "~1.5 mi",
  },
  {
    id: "chick-fil-a",
    name: "Chick-fil-A",
    category: "Dining",
    group: "dining",
    area: "fourPoints",
    plaza: "four-points-7710",
    coordinates: { lat: 30.41115, lng: -97.8508 },
    logo: "/images/logos/chick-fil-a.png",
    distance: "~1.5 mi",
  },
  {
    id: "target",
    name: "Target",
    category: "Retail",
    group: "retail",
    area: "fourPoints",
    coordinates: { lat: 30.4021, lng: -97.8502 },
    logo: "/images/logos/target.png",
    distance: "~2 mi",
  },
  {
    id: "chase",
    name: "Chase Bank",
    category: "Banking",
    group: "banking",
    area: "fourPoints",
    coordinates: { lat: 30.4198, lng: -97.8458 },
    logo: "/images/logos/chase.png",
    distance: "~1 mi",
  },
  {
    id: "capital-one",
    name: "Capital One",
    category: "Banking",
    group: "banking",
    area: "fourPoints",
    coordinates: { lat: 30.4143, lng: -97.8486 },
    logo: "/images/logos/capital-one.png",
    distance: "~1.5 mi",
  },

  // On-site tenants
  {
    id: "first-foundations",
    name: "First Foundations",
    category: "Education",
    group: "onsite",
    area: "onsite",
    plaza: "620-office-park",
    coordinates: propertyLocation.coordinates,
    logo: "/images/logos/first-foundations.png",
    onSite: true,
  },
  {
    id: "integrated-health",
    name: "Integrated Health",
    category: "Medical",
    group: "onsite",
    area: "onsite",
    plaza: "620-office-park",
    coordinates: propertyLocation.coordinates,
    logo: "/images/logos/integrated-health.svg",
    onSite: true,
  },
  {
    id: "mac-shop",
    name: "Mac Shop",
    category: "Services",
    group: "onsite",
    area: "onsite",
    plaza: "620-office-park",
    coordinates: propertyLocation.coordinates,
    logo: "/images/logos/mac-shop.svg",
    onSite: true,
  },
  {
    id: "texas-farm-bureau",
    name: "TX Farm Bureau",
    category: "Professional",
    group: "onsite",
    area: "onsite",
    plaza: "620-office-park",
    coordinates: propertyLocation.coordinates,
    logo: "/images/logos/texas-farm-bureau.svg",
    onSite: true,
  },
];

export function getMapMarkerPosition(
  business: NearbyBusiness,
  indexInPlaza: number,
  totalInPlaza: number,
): { lat: number; lng: number } {
  if (!business.plaza) {
    return business.coordinates;
  }

  const cluster = plazaClusters[business.plaza];
  if (!cluster) {
    return business.coordinates;
  }

  if (cluster.layout === "campus") {
    return OFFICE_PARK_UNITS[business.id] ?? cluster.center;
  }

  if (totalInPlaza <= 1) {
    return cluster.center;
  }

  const angle = (2 * Math.PI * indexInPlaza) / totalInPlaza - Math.PI / 2;
  const latRadius = cluster.spreadRadius;
  const lngRadius = cluster.spreadRadius * 1.18;

  return {
    lat: cluster.center.lat + latRadius * Math.sin(angle),
    lng: cluster.center.lng + lngRadius * Math.cos(angle),
  };
}

export function getBusinessesWithMapPositions() {
  const plazaMembers = new Map<string, NearbyBusiness[]>();

  for (const business of nearbyBusinesses) {
    if (!business.plaza) continue;
    const members = plazaMembers.get(business.plaza) ?? [];
    members.push(business);
    plazaMembers.set(business.plaza, members);
  }

  return nearbyBusinesses.map((business) => {
    if (!business.plaza) {
      return { ...business, mapPosition: business.coordinates };
    }

    const members = plazaMembers.get(business.plaza) ?? [business];
    const index = members.findIndex((member) => member.id === business.id);

    return {
      ...business,
      mapPosition: getMapMarkerPosition(business, index, members.length),
    };
  });
}

export const mapDefaults = {
  zoom: 12,
  minZoom: 11,
  maxZoom: 17,
  fitBoundsMaxZoom: 12,
  fitBoundsPadding: [52, 52] as [number, number],
};
