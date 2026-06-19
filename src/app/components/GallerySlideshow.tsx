import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";

const galleryImages = [
  {
    src: "/images/gallery-parking.png",
    alt: "620 Office Park — parking lot with stone buildings and mature trees",
    caption: "Campus parking and tree-lined grounds",
  },
  {
    src: "/images/gallery-walkway.png",
    alt: "620 Office Park — covered stone walkway with landscaping",
    caption: "Covered walkways between suites",
  },
  {
    src: "/images/gallery-building.png",
    alt: "620 Office Park — two-story stone building with exterior staircase",
    caption: "Limestone architecture with professional curb appeal",
  },
];

export function GallerySlideshow() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="relative w-full">
      <CarouselContent className="ml-0">
        {galleryImages.map((image) => (
          <CarouselItem key={image.src} className="pl-0">
            <div className="relative aspect-[16/9] overflow-hidden bg-card border border-border">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              <p className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[10px] md:text-xs tracking-[0.15em] uppercase text-white/85">
                {image.caption}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <button
        type="button"
        onClick={() => api?.scrollPrev()}
        aria-label="Previous slide"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center text-white/85 hover:text-white transition-colors"
      >
        <ChevronLeft size={36} strokeWidth={1.25} />
      </button>

      <button
        type="button"
        onClick={() => api?.scrollNext()}
        aria-label="Next slide"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center text-white/85 hover:text-white transition-colors"
      >
        <ChevronRight size={36} strokeWidth={1.25} />
      </button>

      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 flex items-center gap-2">
        {galleryImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={current === index ? "true" : undefined}
            onClick={() => api?.scrollTo(index)}
            className={`h-1.5 transition-all duration-300 ${
              current === index ? "w-6 bg-accent" : "w-1.5 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
}
