"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import LanguageHover from "@/components/LanguageHover";
import { heroSlides } from "@/lib/data";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

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

  const goTo = useCallback((i) => setIndex(i), []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      className="relative isolate min-h-[640px] overflow-hidden sm:min-h-[720px]"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => !reducedMotion && setPlaying(true)}
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.image}
          className="absolute inset-0 transition-all duration-800 ease-out"
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? "scale(1)" : "scale(1.04)",
          }}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt={i === index ? slide.alt : ""}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Soft scrim — enough for text contrast, leaves most of the photo visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(15,13,10,0.72)_0%,rgba(15,13,10,0.42)_32%,rgba(15,13,10,0.12)_52%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-black/45 to-transparent"
      />

      <div className="absolute inset-0 z-[2] flex items-center px-6 sm:px-12">
        <div className="max-w-[520px]">
          <span className="mb-5 inline-block rounded-full bg-black/35 px-4 py-2 text-[13px] font-bold tracking-wide text-white backdrop-blur-[2px]">
            International Mother Language Day · Feb 21, every year
          </span>
          <h1 className="font-display mb-5 text-[34px] font-extrabold leading-[1.18] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.75)] sm:text-[42px]">
            Celebrating every language.
            <br />
            Connecting every community.
          </h1>
          <p className="mb-8 max-w-[480px] text-lg leading-relaxed text-[#EDE9E1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
            Language is more than words — it carries our history, identity and hopes for the
            future. Join MLLWS for festivals, advocacy, and community celebrations all year long.
          </p>
          <div className="flex flex-wrap gap-4">
            <LanguageHover
              href="/events"
              className="rounded-full bg-white px-[30px] py-4 text-base font-bold !text-foreground no-underline transition hover:scale-105 hover:!text-foreground"
            >
              Explore events
            </LanguageHover>
            <LanguageHover
              href="/membership"
              className="rounded-full border-2 border-white/50 bg-transparent px-[30px] py-4 text-base font-bold !text-white no-underline transition hover:bg-white/12 hover:!text-white"
            >
              Join us
            </LanguageHover>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-0 right-0 z-[2] flex justify-center gap-2" role="tablist" aria-label="Slides">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1} of ${heroSlides.length}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full border-0 p-0 transition-all ${
              i === index ? "w-[22px] bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing slide {index + 1} of {heroSlides.length}
      </p>
    </section>
  );
}
