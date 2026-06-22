import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  highway,
  nearbyBusinesses,
  businessAreaLabels,
  type NearbyBusiness,
  type BusinessArea,
} from "../../data/location";

const corridorAreas: BusinessArea[] = ["andersonMill", "fourPoints", "onsite"];

function BusinessChip({ business }: { business: NearbyBusiness }) {
  const label = business.distance
    ? `${business.name} · ${business.distance}`
    : business.name;

  return (
    <li
      title={label}
      className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-background border border-border shrink-0"
    >
      <div className="w-5 h-5 shrink-0 flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src={business.logo}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-[10px] tracking-wide uppercase text-foreground/80">
        {business.name}
      </span>
      {business.distance && (
        <span className="text-[9px] text-muted-foreground">{business.distance}</span>
      )}
    </li>
  );
}

function BusinessGroupSection({
  label,
  businesses,
}: {
  label: string;
  businesses: NearbyBusiness[];
}) {
  if (businesses.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-[10px] tracking-[0.2em] uppercase text-accent">{label}</h3>
      <ul className="flex flex-wrap gap-1.5">
        {businesses.map((business) => (
          <BusinessChip key={business.id} business={business} />
        ))}
      </ul>
    </div>
  );
}

type SurroundingBusinessesModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SurroundingBusinessesModal({
  open,
  onClose,
}: SurroundingBusinessesModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg gap-0 p-0 overflow-hidden rounded-2xl border-border max-h-[85vh] flex flex-col">
        <DialogHeader className="text-left px-6 pt-6 pb-4 border-b border-border shrink-0">
          <DialogTitle
            className="text-xl md:text-2xl font-normal text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Surrounding businesses
          </DialogTitle>
          <DialogDescription className="text-sm text-foreground/55 font-light">
            National brands, dining, and services along {highway.shortName} near 620 Oaks Office Park.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto px-6 py-5 space-y-6">
          {corridorAreas.map((area) => (
            <BusinessGroupSection
              key={area}
              label={businessAreaLabels[area]}
              businesses={nearbyBusinesses.filter((b) => b.area === area)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const surroundingBusinessCount = nearbyBusinesses.length;
