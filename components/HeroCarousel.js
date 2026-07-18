"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const headline = heroSlides[0];

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
      className="border-b border-border-muted bg-surface-muted"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-[1.1fr_1fr] md:py-20">
        {/* Editorial copy side */}
        <div>
          <p className="section-eyebrow max-w-[220px]">01 — Welcome</p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-brand-dark sm:text-5xl lg:text-6xl">
            {headline.title}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-gray-700">
            {headline.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand"
            >
              About the Society
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-accent px-6 py-3 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white"
            >
              Get Involved
            </Link>
          </div>
        </div>

        {/* Framed rotating image side */}
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-4 border-surface-white shadow-xl ring-1 ring-border-muted">
            <div role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroSlides.length}`} className="absolute inset-0">
              <Image
                key={slide.image}
                src={slide.image}
                alt={slide.title ? "" : "Mother Language Lovers of the World Society"}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-lg text-white backdrop-blur hover:bg-black/60"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-lg text-white backdrop-blur hover:bg-black/60"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>

          {/* Controls float below the frame, off the photo */}
          <div className="mt-4 flex items-center justify-center gap-3">
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
                    i === index ? "bg-accent" : "bg-border-muted hover:bg-brand/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              onClick={() => setPlaying((p) => !p)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border-muted bg-surface-white text-xs text-brand-dark hover:bg-surface-muted"
            >
              <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
