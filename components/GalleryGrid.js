"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function GalleryGrid({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const isOpen = activeIndex !== null;
  const active = isOpen ? images[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    function onKeyDown(event) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }

    document.addEventListener("keydown", onKeyDown);
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen, close, showPrev, showNext]);

  if (images.length === 0) {
    return (
      <p className="py-10 text-center text-muted">This album does not have photos yet.</p>
    );
  }

  const overlay =
    isOpen && active ? (
      <div
        className="fixed inset-0 z-[300] flex h-[100dvh] w-screen items-center justify-center bg-[rgba(34,31,26,0.92)] p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={close}
      >
        <div
          className="relative flex max-h-full w-full max-w-[960px] flex-col gap-4"
          onClick={(event) => event.stopPropagation()}
        >
          <p id={titleId} className="sr-only">
            {active.caption || active.alt}. Photo {activeIndex + 1} of {images.length}.
          </p>
          <div className="relative h-[min(72dvh,640px)] w-full overflow-hidden rounded-2xl bg-black">
            <Image
              src={active.src}
              alt={active.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-white">
            <p className="text-sm">
              {active.caption || active.alt}
              <span className="ml-2 text-white/70">
                {activeIndex + 1} / {images.length}
              </span>
            </p>
            <div className="flex gap-2">
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    className="rounded-full border border-white/30 px-4 py-2 text-sm font-bold"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="rounded-full border border-white/30 px-4 py-2 text-sm font-bold"
                  >
                    Next
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={close}
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((img, index) => (
          <li key={`${img.src}-${index}`}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl border-0 bg-surface-muted p-0"
              aria-label={`View ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>
            {img.caption && (
              <p className="mt-2 text-sm text-muted">{img.caption}</p>
            )}
          </li>
        ))}
      </ul>
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
