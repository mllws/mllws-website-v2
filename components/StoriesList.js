"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FilterChips from "@/components/FilterChips";

export default function StoriesList({ stories, filters, featured }) {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(
    () =>
      (filter === "all"
        ? stories.filter((s) => !s.featured)
        : stories.filter((s) => s.category === filter && !s.featured)),
    [filter, stories]
  );

  return (
    <>
      <section className="mx-auto max-w-[1200px] px-6 pb-6 sm:px-12">
        <FilterChips filters={filters} onChange={setFilter} />
      </section>

      {featured && (
        <section className="mx-auto max-w-[1200px] px-6 py-10 sm:px-12">
          <div className="grid items-stretch overflow-hidden rounded-[28px] border border-border-muted bg-white md:grid-cols-2">
            <div className="relative min-h-[260px]">
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
              <span
                className="mb-4 inline-block rounded-full px-3.5 py-1.5 text-[13px] font-bold"
                style={{ color: featured.tagColor, backgroundColor: `${featured.tagColor}15` }}
              >
                {featured.tag}
              </span>
              <h2 className="font-display mb-3 text-[26px] font-extrabold">
                <Link
                  href={`/stories/${featured.slug}`}
                  className="text-foreground no-underline hover:text-accent"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mb-5 text-[15px] leading-relaxed text-[#4a4438]">{featured.excerpt}</p>
              <Link href={`/stories/${featured.slug}`} className="text-sm font-bold no-underline">
                Read the story →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((st) => (
            <Link
              key={st.slug}
              href={`/stories/${st.slug}`}
              className="overflow-hidden rounded-2xl border border-border-muted bg-white no-underline transition hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(34,31,26,0.1)]"
            >
              <article>
                <div className="relative h-[190px]">
                  {st.coverImage && (
                    <Image
                      src={st.coverImage}
                      alt={st.imageAlt || st.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-[22px]">
                  <span className="text-xs font-bold" style={{ color: st.tagColor }}>
                    {st.tag}
                  </span>
                  <h3 className="font-display my-2 text-[17px] font-bold text-foreground">{st.title}</h3>
                  <p className="mb-3 text-sm text-muted">{st.excerpt}</p>
                  <span className="text-[13px] font-bold text-foreground">Read →</span>
                </div>
              </article>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-10 text-center text-muted">
              No stories in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
