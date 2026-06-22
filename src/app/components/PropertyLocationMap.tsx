import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Polygon,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { Navigation, ArrowRight } from "lucide-react";
import {
  SurroundingBusinessesModal,
  surroundingBusinessCount,
} from "./SurroundingBusinessesModal";
import {
  propertyLocation,
  highway,
  mapDefaults,
  plazaClusters,
  getBusinessesWithMapPositions,
  propertyPinPosition,
  officeParkFootprint,
  officeParkLabelPosition,
  type NearbyBusiness,
} from "../../data/location";

import "leaflet/dist/leaflet.css";

const ACCENT = "#B8965A";
const FOREGROUND = "#1A1A18";

function createPropertyIcon() {
  return L.divIcon({
    className: "property-pin-marker",
    html: `
      <div style="position: relative; width: 36px; height: 48px;">
        <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M18 46C18 46 3 27.5 3 17C3 8.82 9.82 2 18 2C26.18 2 33 8.82 33 17C33 27.5 18 46 18 46Z"
            fill="${ACCENT}"
            stroke="#FFFFFF"
            stroke-width="2.5"
          />
          <circle cx="18" cy="17" r="8" fill="#FFFFFF"/>
        </svg>
      </div>
    `,
    iconSize: [36, 48],
    iconAnchor: [18, 46],
  });
}

function createCampusLabelIcon() {
  return L.divIcon({
    className: "office-park-label",
    html: `<span style="
      display: inline-block;
      padding: 2px 6px;
      background: rgba(255,255,255,0.92);
      border: 1px solid ${ACCENT};
      color: ${FOREGROUND};
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-family: Outfit, sans-serif;
      white-space: nowrap;
      box-shadow: 0 1px 4px rgba(0,0,0,0.12);
      pointer-events: none;
    ">620 Oaks Office Park</span>`,
    iconSize: [140, 18],
    iconAnchor: [70, 9],
  });
}

function createBusinessLogoIcon(business: NearbyBusiness, size = 40) {
  const isOnSite = business.onSite;

  return L.divIcon({
    className: isOnSite ? "onsite-unit-marker" : "business-logo-marker",
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: white;
      border: 2px solid white;
      border-radius: ${isOnSite ? "6px" : "10px"};
      box-shadow: 0 2px 8px rgba(0,0,0,0.22);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      ${isOnSite ? `outline: 2px solid ${ACCENT}; outline-offset: -1px;` : ""}
    ">
      <img
        src="${business.logo}"
        alt="${business.name}"
        style="width: 100%; height: 100%; object-fit: contain; padding: 4px; box-sizing: border-box;"
      />
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function MapViewController({
  mapPositions,
}: {
  mapPositions: { lat: number; lng: number }[];
}) {
  const map = useMap();

  useEffect(() => {
    const fitOverview = (animate = false) => {
      map.invalidateSize({ animate: false });

      const points: [number, number][] = [
        [propertyPinPosition.lat, propertyPinPosition.lng],
        ...mapPositions.map((p) => [p.lat, p.lng]),
      ];

      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, {
        padding: mapDefaults.fitBoundsPadding,
        maxZoom: mapDefaults.fitBoundsMaxZoom,
        animate,
      });
    };

    fitOverview(false);

    const container = map.getContainer();
    const section = container.closest("[data-location-map]");

    const resizeObserver = new ResizeObserver(() => fitOverview(false));
    resizeObserver.observe(container);

    const intersectionObserver =
      section &&
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            fitOverview(true);
          }
        },
        { threshold: 0.35 },
      );

    if (section && intersectionObserver) {
      intersectionObserver.observe(section);
    }

    return () => {
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [map, mapPositions]);

  return null;
}

export function PropertyLocationMap() {
  const [businessesOpen, setBusinessesOpen] = useState(false);
  const propertyIcon = useMemo(() => createPropertyIcon(), []);
  const campusLabelIcon = useMemo(() => createCampusLabelIcon(), []);
  const businessesOnMap = useMemo(() => getBusinessesWithMapPositions(), []);
  const businessIcons = useMemo(
    () =>
      Object.fromEntries(
        businessesOnMap.map((business) => [
          business.id,
          createBusinessLogoIcon(business, business.onSite ? 28 : 38),
        ]),
      ),
    [businessesOnMap],
  );

  const mapPositions = useMemo(
    () => businessesOnMap.map((business) => business.mapPosition),
    [businessesOnMap],
  );

  const plazaHighlights = useMemo(
    () => Object.values(plazaClusters).filter((p) => p.id !== "620-office-park"),
    [],
  );

  return (
    <div className="w-full border border-border bg-card" data-location-map>
      <div
        className="relative w-full h-[340px] sm:h-[400px] md:h-[500px] lg:h-[540px] overflow-hidden"
        aria-label={`Map showing ${propertyLocation.name} at ${propertyLocation.fullAddress} on ${highway.shortName}`}
      >
        <MapContainer
          center={[
            propertyLocation.coordinates.lat,
            propertyLocation.coordinates.lng,
          ]}
          zoom={mapDefaults.zoom}
          minZoom={mapDefaults.minZoom}
          maxZoom={mapDefaults.maxZoom}
          className="absolute inset-0 z-0"
          scrollWheelZoom={false}
          zoomControl={true}
          attributionControl={true}
        >
          <MapViewController mapPositions={mapPositions} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          <Polyline
            positions={highway.path}
            pathOptions={{
              color: ACCENT,
              weight: 5,
              opacity: 0.7,
              lineCap: "round",
            }}
          />

          {plazaHighlights.map((plaza) => (
            <Circle
              key={plaza.id}
              center={[plaza.center.lat, plaza.center.lng]}
              radius={plaza.highlightRadius}
              pathOptions={{
                color: ACCENT,
                weight: 1.5,
                opacity: 0.55,
                fillColor: ACCENT,
                fillOpacity: 0.06,
                dashArray: "6 5",
              }}
            />
          ))}

          <Polygon
            positions={officeParkFootprint}
            pathOptions={{
              color: ACCENT,
              weight: 2,
              opacity: 0.8,
              fillColor: ACCENT,
              fillOpacity: 0.12,
              dashArray: "8 6",
            }}
          />

          <Marker
            position={[officeParkLabelPosition.lat, officeParkLabelPosition.lng]}
            icon={campusLabelIcon}
            zIndexOffset={600}
            interactive={false}
          />

          <Marker
            position={[propertyPinPosition.lat, propertyPinPosition.lng]}
            icon={propertyIcon}
            zIndexOffset={1000}
            title={propertyLocation.name}
          />

          {businessesOnMap.map((business) => (
            <Marker
              key={business.id}
              position={[business.mapPosition.lat, business.mapPosition.lng]}
              icon={businessIcons[business.id]}
              zIndexOffset={business.onSite ? 500 : 400}
            />
          ))}
        </MapContainer>

        <div className="absolute top-3 right-3 z-[400] flex items-center gap-2 bg-card/95 backdrop-blur-sm border border-border px-3 py-1.5 pointer-events-none">
          <Navigation size={12} className="text-accent shrink-0" />
          <span className="text-[10px] tracking-[0.15em] uppercase text-foreground font-medium">
            On {highway.shortName}
          </span>
        </div>
      </div>

      <div className="border-t border-border px-4 py-3 bg-card flex items-center justify-between gap-3">
        <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground min-w-0">
          {surroundingBusinessCount} businesses on {highway.shortName}
        </p>
        <button
          type="button"
          onClick={() => setBusinessesOpen(true)}
          className="shrink-0 inline-flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase text-accent border border-accent/40 px-3 py-1.5 hover:bg-accent/5 transition-colors"
        >
          View all
          <ArrowRight size={11} />
        </button>
      </div>

      <SurroundingBusinessesModal
        open={businessesOpen}
        onClose={() => setBusinessesOpen(false)}
      />
    </div>
  );
}
