"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FilterChips from "@/components/FilterChips";
import LanguageHover from "@/components/LanguageHover";

export default function EventsList({ events, filters, featured }) {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(
    () =>
      (filter === "all"
        ? events.filter((e) => !e.featured)
        : events.filter((e) => e.category === filter && !e.featured)),
    [filter, events]
  );

  return (
    <>
      <section className="mx-auto max-w-[1200px] px-6 pb-6 sm:px-12">
        <FilterChips filters={filters} onChange={setFilter} />
      </section>

      {featured && (
        <section className="mx-auto max-w-[1200px] px-6 py-10 sm:px-12">
          <div className="grid items-stretch overflow-hidden rounded-[28px] border border-border-muted bg-white md:grid-cols-2">
            <div className="relative min-h-[280px] md:min-h-[320px]">
              {featured.coverImage && (
                <Image
                  src={featured.coverImage}
                  alt={featured.imageAlt || featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </div>
            <div className="p-8 sm:p-11">
              <span className="mb-4 inline-block rounded-full bg-[#EAF3EC] px-3.5 py-1.5 text-[13px] font-bold text-green-dark">
                Flagship · Festivals
              </span>
              <h2 className="font-display mb-3 text-[26px] font-extrabold">
                <Link href={`/events/${featured.slug}`} className="text-foreground no-underline hover:text-accent">
                  {featured.title}
                </Link>
              </h2>
              {featured.description && (
                <p className="mb-5 text-[15px] leading-relaxed text-[#4a4438]">{featured.description}</p>
              )}
              <div className="mb-6 flex flex-col gap-2 text-sm font-semibold">
                {featured.dateLocation && <span>{featured.dateLocation}</span>}
                {featured.location && <span>{featured.location}</span>}
              </div>
              <div className="flex flex-wrap gap-3">
                {featured.cityHref && (
                  <LanguageHover
                    href={featured.cityHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white no-underline transition hover:scale-105 hover:text-white"
                  >
                    City of Surrey event
                  </LanguageHover>
                )}
                {featured.facebookHref && (
                  <LanguageHover
                    href={featured.facebookHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-full border border-foreground/15 px-6 py-3.5 text-sm font-bold text-foreground no-underline transition hover:border-accent hover:text-accent"
                  >
                    Facebook event
                  </LanguageHover>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <h2 className="font-display mb-7 text-[26px] font-extrabold">More from our calendar</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ev) => (
            <Link
              key={ev.slug}
              href={`/events/${ev.slug}`}
              className="overflow-hidden rounded-2xl border border-border-muted bg-white no-underline transition hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(34,31,26,0.1)]"
            >
              <article>
                <div className="relative h-[170px]">
                  {ev.coverImage && (
                    <Image
                      src={ev.coverImage}
                      alt={ev.imageAlt || ev.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-[22px]">
                  <span className="text-xs font-bold" style={{ color: ev.tagColor }}>
                    {ev.tag}
                  </span>
                  <h3 className="font-display my-2 text-[17px] font-bold text-foreground">{ev.title}</h3>
                  <p className="mb-3 text-sm text-muted">{ev.dateLocation || ev.date}</p>
                  <span className="text-[13px] font-bold text-foreground">
                    Learn more →
                  </span>
                </div>
              </article>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-10 text-center text-muted">
              No events in this category right now — check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
