export const propertyLocation = {
  name: "620 Office Park",
  address: "10713 Ranch Rd 620 N",
  city: "Austin, TX",
  zip: "78726",
  fullAddress: "10713 Ranch Rd 620 N, Austin, TX 78726",
  coordinates: { lat: 30.4321, lng: -97.8415 },
};

export const highway = {
  name: "Ranch Rd 620 N",
  shortName: "RM 620",
  description: "Direct frontage on Austin's northwest corridor",
  path: [
    [30.4021, -97.8502],
    [30.4113, -97.8510],
    [30.4198, -97.8458],
    [30.4321, -97.8415],
    [30.4532, -97.8270],
  ] as [number, number][],
};

export type BusinessGroup = "dining" | "grocery" | "banking" | "retail" | "onsite";

export type NearbyBusiness = {
  name: string;
  category: string;
  group: BusinessGroup;
  coordinates: { lat: number; lng: number };
  logo: string;
  distance?: string;
  onSite?: boolean;
};

export const businessGroupLabels: Record<BusinessGroup, string> = {
  dining: "Dining & Cafés",
  grocery: "Grocery",
  banking: "Banking",
  retail: "Retail",
  onsite: "On-Site Tenants",
};

export const nearbyBusinesses: NearbyBusiness[] = [
  // Dining & cafés
  {
    name: "Starbucks",
    category: "Coffee",
    group: "dining",
    coordinates: { lat: 30.4049, lng: -97.8513 },
    logo: "/images/logos/starbucks.png",
    distance: "~2 mi",
  },
  {
    name: "Tropical Smoothie Cafe",
    category: "Dining",
    group: "dining",
    coordinates: { lat: 30.4048, lng: -97.8510 },
    logo: "/images/logos/tropical-smoothie.png",
    distance: "~2 mi",
  },
  {
    name: "Chipotle",
    category: "Dining",
    group: "dining",
    coordinates: { lat: 30.4113, lng: -97.8510 },
    logo: "/images/logos/chipotle.png",
    distance: "~1.5 mi",
  },
  {
    name: "Chick-fil-A",
    category: "Dining",
    group: "dining",
    coordinates: { lat: 30.4110, lng: -97.8506 },
    logo: "/images/logos/chick-fil-a.png",
    distance: "~1.5 mi",
  },
  {
    name: "Torchy's Tacos",
    category: "Dining",
    group: "dining",
    coordinates: { lat: 30.4532, lng: -97.8270 },
    logo: "/images/logos/torchys.png",
    distance: "~1.5 mi",
  },
  {
    name: "Subway",
    category: "Dining",
    group: "dining",
    coordinates: { lat: 30.4045, lng: -97.8516 },
    logo: "/images/logos/subway.svg",
    distance: "~2 mi",
  },
  // Grocery
  {
    name: "H-E-B",
    category: "Grocery",
    group: "grocery",
    coordinates: { lat: 30.4046, lng: -97.8515 },
    logo: "/images/logos/heb.png",
    distance: "~2 mi",
  },
  // Retail
  {
    name: "Target",
    category: "Retail",
    group: "retail",
    coordinates: { lat: 30.4021, lng: -97.8502 },
    logo: "/images/logos/target.png",
    distance: "~2 mi",
  },
  // Banking
  {
    name: "Chase Bank",
    category: "Banking",
    group: "banking",
    coordinates: { lat: 30.4198, lng: -97.8458 },
    logo: "/images/logos/chase.png",
    distance: "~1 mi",
  },
  {
    name: "PNC Bank",
    category: "Banking",
    group: "banking",
    coordinates: { lat: 30.4047, lng: -97.8512 },
    logo: "/images/logos/pnc.png",
    distance: "~2 mi",
  },
  {
    name: "Capital One",
    category: "Banking",
    group: "banking",
    coordinates: { lat: 30.4143, lng: -97.8486 },
    logo: "/images/logos/capital-one.png",
    distance: "~1.5 mi",
  },
  // On-site tenants
  {
    name: "First Foundations Preschool",
    category: "Education",
    group: "onsite",
    coordinates: { lat: 30.4325, lng: -97.8410 },
    logo: "/images/logos/first-foundations.png",
    onSite: true,
  },
  {
    name: "Integrated Health Diagnostics",
    category: "Medical",
    group: "onsite",
    coordinates: { lat: 30.4317, lng: -97.8420 },
    logo: "/images/logos/integrated-health.svg",
    onSite: true,
  },
  {
    name: "Mac Shop",
    category: "Services",
    group: "onsite",
    coordinates: { lat: 30.4324, lng: -97.8418 },
    logo: "/images/logos/mac-shop.svg",
    onSite: true,
  },
  {
    name: "Texas Farm Bureau Insurance",
    category: "Professional",
    group: "onsite",
    coordinates: { lat: 30.4318, lng: -97.8412 },
    logo: "/images/logos/texas-farm-bureau.svg",
    onSite: true,
  },
];

export const mapDefaults = {
  zoom: 15,
  minZoom: 13,
  maxZoom: 17,
};
