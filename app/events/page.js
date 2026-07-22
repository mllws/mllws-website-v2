"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FilterChips from "@/components/FilterChips";
import { events, eventFilters, upcomingEvent } from "@/lib/data";

export default function EventsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(
    () => (filter === "all" ? events.filter((e) => !e.featured) : events.filter((e) => e.category === filter && !e.featured)),
    [filter]
  );

  return (
    <div>
      <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-10 text-center sm:px-12 sm:pt-18">
        <h1 className="font-display mb-4 text-[40px] font-extrabold tracking-tight sm:text-[46px]">
          Events &amp; Gatherings
        </h1>
        <p className="mx-auto max-w-[560px] text-lg text-muted">
          From our flagship Mother Language Festival to year-round advocacy — find what&apos;s
          happening with MLLWS.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-6 sm:px-12">
        <FilterChips filters={eventFilters} onChange={setFilter} />
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-10 sm:px-12">
        <div className="grid items-stretch overflow-hidden rounded-[28px] border border-border-muted bg-white md:grid-cols-2">
          <div className="relative min-h-[280px] md:min-h-[320px]">
            <Image
              src={upcomingEvent.image}
              alt={upcomingEvent.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="p-8 sm:p-11">
            <span className="mb-4 inline-block rounded-full bg-[#EAF3EC] px-3.5 py-1.5 text-[13px] font-bold text-green-dark">
              Flagship · Festivals
            </span>
            <h2 className="font-display mb-3 text-[26px] font-extrabold">{upcomingEvent.title}</h2>
            <p className="mb-5 text-[15px] leading-relaxed text-[#4a4438]">{upcomingEvent.description}</p>
            <div className="mb-6 flex flex-col gap-2 text-sm font-semibold">
              <span>{upcomingEvent.date}</span>
              <span>{upcomingEvent.location}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={upcomingEvent.cityHref}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white no-underline transition hover:scale-105 hover:text-white"
              >
                City of Surrey event
              </a>
              <a
                href={upcomingEvent.facebookHref}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full border border-foreground/15 px-6 py-3.5 text-sm font-bold text-foreground no-underline transition hover:border-accent hover:text-accent"
              >
                Facebook event
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <h2 className="font-display mb-7 text-[26px] font-extrabold">More from our calendar</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ev) => (
            <article
              key={ev.title}
              className="overflow-hidden rounded-2xl border border-border-muted bg-white transition hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(34,31,26,0.1)]"
            >
              <div className="relative h-[170px]">
                <Image src={ev.image} alt={ev.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="p-[22px]">
                <span className="text-xs font-bold" style={{ color: ev.tagColor }}>
                  {ev.tag}
                </span>
                <h3 className="font-display my-2 text-[17px] font-bold">{ev.title}</h3>
                <p className="mb-3 text-sm text-muted">{ev.dateLocation}</p>
                <Link href="/about" className="text-[13px] font-bold no-underline">
                  Learn more →
                </Link>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-10 text-center text-muted">
              No events in this category right now — check back soon.
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-brand p-12">
          <div>
            <h2 className="font-display mb-2 text-2xl font-extrabold text-white">
              Want to host an event with us?
            </h2>
            <p className="text-[15px] text-[#D6E6F2]">
              We support community groups running their own language celebrations.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3.5 font-bold text-brand no-underline transition hover:scale-105 hover:text-brand"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
