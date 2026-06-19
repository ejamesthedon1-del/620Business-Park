import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Check, ArrowRight } from "lucide-react";

export type SpaceListing = {
  id: string;
  floor: string;
  type: string;
  sqft: string;
  available: string;
  rate: string;
  features: string[];
};

type SpaceDetailModalProps = {
  space: SpaceListing | null;
  image: string;
  onClose: () => void;
  onInquire: (spaceId: string) => void;
};

export function SpaceDetailModal({
  space,
  image,
  onClose,
  onInquire,
}: SpaceDetailModalProps) {
  return (
    <Dialog open={!!space} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg gap-0 p-0 overflow-hidden rounded-2xl border-border">
        {space && (
          <>
            <div className="relative aspect-[16/10] overflow-hidden">
              <ImageWithFallback
                src={image}
                alt={`${space.id} — ${space.type}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute top-4 right-4 text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full bg-white/90 text-foreground backdrop-blur-sm">
                {space.available === "Immediate" ? "Available Now" : "Coming Soon"}
              </span>
            </div>

            <div className="p-6 md:p-8">
              <DialogHeader className="text-left gap-1 mb-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-accent">{space.floor}</p>
                <DialogTitle
                  className="text-2xl md:text-3xl font-normal text-foreground"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {space.id}
                </DialogTitle>
                <DialogDescription className="text-sm text-foreground/55 font-light">
                  {space.type}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Size</p>
                  <p className="text-sm text-foreground/80">{space.sqft} SF</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Rate</p>
                  <p className="text-sm text-foreground/80">{space.rate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Available</p>
                  <p className="text-sm text-foreground/80">{space.available}</p>
                </div>
              </div>

              <ul className="flex flex-col gap-2 border-t border-border pt-5 mb-6">
                {space.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <Check size={11} className="text-accent shrink-0" />
                    <span className="text-xs text-foreground/55">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onInquire(space.id)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground text-xs tracking-[0.1em] uppercase hover:bg-accent/90 transition-colors duration-200"
              >
                Inquire About This Suite
                <ArrowRight size={12} />
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
