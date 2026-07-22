"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FilterChips from "@/components/FilterChips";
import { stories, storyFilters } from "@/lib/data";

export default function StoriesPage() {
  const [filter, setFilter] = useState("all");
  const featured = stories.find((s) => s.featured) || stories[0];
  const filtered = useMemo(
    () =>
      (filter === "all" ? stories : stories.filter((s) => s.category === filter)).filter(
        (s) => s.title !== featured.title
      ),
    [filter, featured.title]
  );

  return (
    <div>
      <section className="mx-auto max-w-[900px] px-6 pt-16 pb-10 text-center sm:px-12 sm:pt-18">
        <h1 className="font-display mb-4 text-[40px] font-extrabold tracking-tight sm:text-[46px]">
          Stories from our community
        </h1>
        <p className="text-lg text-muted">
          Recaps, milestones, and the history behind International Mother Language Day.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-6 sm:px-12">
        <FilterChips filters={storyFilters} onChange={setFilter} />
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-10 sm:px-12">
        <div className="grid items-stretch overflow-hidden rounded-[28px] border border-border-muted bg-white md:grid-cols-2">
          <div className="relative min-h-[260px]">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="p-8 sm:p-11">
            <span className="mb-4 inline-block rounded-full bg-[#EAF3EC] px-3.5 py-1.5 text-[13px] font-bold text-green-dark">
              {featured.tag}
            </span>
            <h2 className="font-display mb-3 text-[26px] font-extrabold">{featured.title}</h2>
            <p className="mb-5 text-[15px] leading-relaxed text-[#4a4438]">{featured.excerpt}</p>
            <Link href="/about" className="text-sm font-bold no-underline">
              Read the story →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((st) => (
            <article
              key={st.title}
              className="overflow-hidden rounded-2xl border border-border-muted bg-white transition hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(34,31,26,0.1)]"
            >
              <div className="relative h-[190px]">
                <Image src={st.image} alt={st.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="p-[22px]">
                <span className="text-xs font-bold" style={{ color: st.tagColor }}>
                  {st.tag}
                </span>
                <h3 className="font-display my-2 text-[17px] font-bold">{st.title}</h3>
                <p className="mb-3 text-sm text-muted">{st.excerpt}</p>
                <Link href="/about" className="text-[13px] font-bold no-underline">
                  Read →
                </Link>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-10 text-center text-muted">
              No stories in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
