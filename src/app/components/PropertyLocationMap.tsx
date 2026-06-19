import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { MapPin, Navigation } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  propertyLocation,
  highway,
  nearbyBusinesses,
  mapDefaults,
  businessGroupLabels,
  type NearbyBusiness,
  type BusinessGroup,
} from "../../data/location";

import "leaflet/dist/leaflet.css";

const ACCENT = "#B8965A";

function createPropertyIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 32px;
      height: 32px;
      background: ${ACCENT};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 10px rgba(0,0,0,0.28);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.05em;
      font-family: Outfit, sans-serif;
    ">620</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function createBusinessLogoIcon(business: NearbyBusiness) {
  const size = business.onSite ? 40 : 48;

  return L.divIcon({
    className: "business-logo-marker",
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: white;
      border: 3px solid white;
      border-radius: ${business.onSite ? "10px" : "12px"};
      box-shadow: 0 3px 12px rgba(0,0,0,0.24);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <img
        src="${business.logo}"
        alt="${business.name}"
        style="width: 100%; height: 100%; object-fit: contain; padding: 5px; box-sizing: border-box;"
      />
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function MapViewController({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    const syncView = () => {
      map.invalidateSize({ animate: false });
      map.setView(center, zoom, { animate: false });
    };

    syncView();

    const container = map.getContainer();
    const observer = new ResizeObserver(syncView);
    observer.observe(container);

    return () => observer.disconnect();
  }, [map, center, zoom]);

  return null;
}

function BusinessChip({ business }: { business: NearbyBusiness }) {
  return (
    <li className="flex items-center gap-2 px-2 py-1.5 bg-secondary border border-border min-w-0">
      <div className="w-7 h-7 shrink-0 bg-white border border-border flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src={business.logo}
          alt={business.name}
          className="w-full h-full object-contain p-0.5"
        />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] tracking-wide uppercase text-foreground/80 truncate">
          {business.name}
        </p>
        {business.distance && (
          <p className="text-[9px] text-muted-foreground">{business.distance}</p>
        )}
      </div>
    </li>
  );
}

export function PropertyLocationMap() {
  const propertyIcon = useMemo(() => createPropertyIcon(), []);
  const businessIcons = useMemo(
    () =>
      Object.fromEntries(
        nearbyBusinesses.map((business) => [
          business.name,
          createBusinessLogoIcon(business),
        ]),
      ),
    [],
  );

  const center: [number, number] = [
    propertyLocation.coordinates.lat,
    propertyLocation.coordinates.lng,
  ];

  const onSiteBusinesses = nearbyBusinesses.filter((b) => b.onSite);
  const corridorGroups: BusinessGroup[] = ["dining", "grocery", "retail", "banking"];

  return (
    <div className="w-full border border-border bg-card">
      <div
        className="relative w-full aspect-[4/3] overflow-hidden"
        aria-label={`Map showing ${propertyLocation.name} at ${propertyLocation.fullAddress} on ${highway.shortName}`}
      >
        <MapContainer
          center={center}
          zoom={mapDefaults.zoom}
          minZoom={mapDefaults.minZoom}
          maxZoom={mapDefaults.maxZoom}
          className="absolute inset-0 z-0"
          scrollWheelZoom={false}
          zoomControl={true}
          attributionControl={true}
        >
          <MapViewController center={center} zoom={mapDefaults.zoom} />

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

          <Marker position={center} icon={propertyIcon} zIndexOffset={1000} />

          {nearbyBusinesses.map((business) => (
            <Marker
              key={business.name}
              position={[business.coordinates.lat, business.coordinates.lng]}
              icon={businessIcons[business.name]}
              zIndexOffset={business.onSite ? 500 : 400}
            />
          ))}
        </MapContainer>

        <div className="absolute top-4 left-4 z-[400] flex items-center gap-2 bg-card/95 backdrop-blur-sm border border-border px-3 py-2 pointer-events-none">
          <Navigation size={12} className="text-accent shrink-0" />
          <span className="text-[10px] tracking-[0.15em] uppercase text-foreground font-medium">
            On {highway.shortName}
          </span>
        </div>
      </div>

      <div className="border-t border-border p-4 bg-card">
        <div className="flex items-start gap-2 mb-3">
          <MapPin size={12} className="text-accent mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">
              {highway.shortName} Corridor
            </p>
            <p className="text-xs text-foreground font-light">{highway.description}</p>
          </div>
        </div>

        <div className="space-y-3">
          {corridorGroups.map((group) => {
            const businesses = nearbyBusinesses.filter((b) => b.group === group);
            if (businesses.length === 0) return null;

            return (
              <div key={group}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  {businessGroupLabels[group]}
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {businesses.map((b) => (
                    <BusinessChip key={b.name} business={b} />
                  ))}
                </ul>
              </div>
            );
          })}

          {onSiteBusinesses.length > 0 && (
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                {businessGroupLabels.onsite}
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {onSiteBusinesses.map((b) => (
                  <BusinessChip key={b.name} business={b} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
