"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { heroSlides } from "@/lib/data";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const liveRegionRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    setPlaying(!mq.matches);
    const handler = (e) => {
      setReducedMotion(e.matches);
      if (e.matches) setPlaying(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goTo = useCallback((i) => setIndex(i), []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [playing, next]);

  const slide = heroSlides[index];

  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      prev();
    } else if (e.key === "ArrowRight") {
      next();
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => !reducedMotion && setPlaying(true)}
      onFocus={() => setPlaying(false)}
      className="relative h-[46vh] min-h-[340px] w-full overflow-hidden bg-brand-dark md:h-[62vh]"
    >
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${heroSlides.length}`}
        className="absolute inset-0"
      >
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.title ? "" : "Mother Language Lovers of the World Society"}
          fill
          priority
          className="object-cover"
        />
        {/* Stronger, layered scrim so white text meets contrast requirements
            over any photo, not just dark ones. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {slide.title && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
            <h1 className="max-w-3xl text-2xl font-bold drop-shadow-lg sm:text-4xl">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="mt-3 max-w-xl text-sm font-medium text-white sm:text-lg">
                {slide.subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Visually hidden live region announcing slide changes to screen readers. */}
      <p ref={liveRegionRef} aria-live="polite" className="sr-only">
        {slide.title
          ? `Showing slide ${index + 1} of ${heroSlides.length}: ${slide.title}`
          : `Showing slide ${index + 1} of ${heroSlides.length}`}
      </p>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur hover:bg-black/60"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur hover:bg-black/60"
      >
        <span aria-hidden="true">›</span>
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3">
        <div className="flex gap-2" role="tablist" aria-label="Slides">
          {heroSlides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1} of ${heroSlides.length}`}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === index ? "bg-accent" : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          onClick={() => setPlaying((p) => !p)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-xs text-white backdrop-blur hover:bg-black/60"
        >
          <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
        </button>
      </div>
    </section>
  );
}
