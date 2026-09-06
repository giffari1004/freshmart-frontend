"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { usePromotions } from "@/features/storefront/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import type { Promotion } from "@/features/storefront/api";

interface HeroCarouselProps {
  storeId: string | null;
}

function promotionCopy(promo: Promotion) {
  const productName = promo.product?.name;
  const discountLabel =
    promo.valueType === "PERCENTAGE"
      ? `${promo.value}% Off`
      : `Rp${promo.value.toLocaleString("id-ID")} Off`;

  if (promo.type === "BUY1GET1" && productName) {
    return {
      badge: "Limited Offer",
      title: `Buy 1 Get 1 ${productName}`,
      description: `Stock up while it lasts — buy one, get one on ${productName}.`,
    };
  }

  if (productName) {
    return {
      badge: discountLabel,
      title: productName,
      description: `Get ${discountLabel.toLowerCase()} on ${productName}, today only.`,
    };
  }

  return {
    badge: discountLabel,
    title: "Storewide Sale",
    description: `Enjoy ${discountLabel.toLowerCase()} across the store — limited time.`,
  };
}

export function HeroCarousel({ storeId }: HeroCarouselProps) {
  const { data: promotions, isLoading } = usePromotions(storeId ?? undefined);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());

    queueMicrotask(onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (isLoading) {
    return <Skeleton className="h-70 w-full rounded-xl md:h-100" />;
  }

  const slides =
    promotions && promotions.length > 0
      ? promotions
      : ([null] as (Promotion | null)[]); // fallback: 1 slide sambutan generik

  return (
    <section className="group relative h-70 overflow-hidden rounded-xl md:h-100">
      <Carousel setApi={setApi} className="h-full">
        <CarouselContent className="h-full ml-0">
          {slides.map((promo) => {
            const image =
              promo?.product?.images.find((i) => i.isPrimary)?.imageUrl ??
              promo?.product?.images[0]?.imageUrl;
            const copy = promo
              ? promotionCopy(promo)
              : {
                  badge: "Welcome",
                  title: "Fresh groceries, delivered fast",
                  description:
                    "Shop produce, dairy, and pantry staples from the FreshMart branch nearest you.",
                };

            return (
              <CarouselItem
                key={promo?.id ?? "default"}
                className="h-full pl-0"
              >
                <div className="relative h-full w-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={
                      image
                        ? { backgroundImage: `url(${image})` }
                        : { backgroundColor: "hsl(var(--muted))" }
                    }
                  />
                  <div className="absolute inset-0 flex flex-col justify-center bg-linear-to-r from-black/65 to-transparent px-8 md:px-16">
                    <span className="mb-4 w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                      {copy.badge}
                    </span>
                    <h2 className="max-w-md text-3xl font-bold leading-tight text-white md:text-5xl">
                      {copy.title}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm text-white/90 md:text-base">
                      {copy.description}
                    </p>
                    <Button asChild size="lg" className="mt-6 w-fit">
                      <a href="#products">Shop Now</a>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 w-12 rounded-full transition-colors ${
                current === index ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
