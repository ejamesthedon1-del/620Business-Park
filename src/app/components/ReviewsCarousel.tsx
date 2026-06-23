import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";

type Review = {
  name: string;
  source: string;
  rating: number;
  quote: string;
};

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
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
    <div className="relative max-w-2xl mx-auto">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "center" }}
        className="w-full"
      >
        <CarouselContent>
          {reviews.map((review, index) => (
            <CarouselItem key={review.name} className="basis-[85%] sm:basis-[78%]">
              <div
                className={`h-full rounded-3xl border bg-background p-8 md:p-10 flex flex-col gap-5 transition-all duration-300 ${
                  current === index
                    ? "border-accent/30 opacity-100"
                    : "border-border opacity-50"
                }`}
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rating
                          ? "text-accent fill-accent"
                          : "text-foreground/20"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm md:text-base text-foreground/70 font-light leading-relaxed flex-1">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="border-t border-border pt-5">
                  <p className="text-sm font-medium text-foreground">{review.name}</p>
                  <p className="text-xs text-foreground/50 mt-1">{review.source}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-center gap-5 mt-8">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          aria-label="Previous review"
          className="text-foreground/40 hover:text-accent transition-colors"
        >
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2">
          {reviews.map((review, index) => (
            <button
              key={review.name}
              type="button"
              aria-label={`Go to review ${index + 1}`}
              aria-current={current === index ? "true" : undefined}
              onClick={() => api?.scrollTo(index)}
              className={`h-1.5 transition-all duration-300 ${
                current === index
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => api?.scrollNext()}
          aria-label="Next review"
          className="text-foreground/40 hover:text-accent transition-colors"
        >
          <ChevronRight size={28} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
