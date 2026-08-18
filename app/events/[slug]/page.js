import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllEvents, getEventBySlug } from "@/lib/events";

function includeDrafts() {
  return process.env.NODE_ENV !== "production";
}

function formatEventDate(iso) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function generateStaticParams() {
  return getAllEvents({ includeDrafts: includeDrafts() }).map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug, { includeDrafts: includeDrafts() });
  if (!event) {
    return { title: "Event not found" };
  }
  return {
    title: event.title,
    description: event.description || `${event.title} — MLLWS event`,
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug, { includeDrafts: includeDrafts() });
  if (!event) notFound();

  return (
    <article className="mx-auto max-w-[800px] px-6 pt-16 pb-16 sm:px-12 sm:pt-20 sm:pb-22">
      <p className="mb-6 text-sm">
        <Link href="/events" className="font-bold no-underline">
          ← All events
        </Link>
      </p>

      {event.coverImage && (
        <div className="relative mb-8 h-[260px] overflow-hidden rounded-2xl sm:h-[360px]">
          <Image
            src={event.coverImage}
            alt={event.imageAlt || event.title}
            fill
            className="object-cover"
            sizes="(max-width: 800px) 100vw, 800px"
            priority
          />
        </div>
      )}

      <header className="mb-10">
        {event.draft && (
          <span className="mb-4 inline-block rounded-full bg-[#F7E4D3] px-3 py-1 text-xs font-bold text-accent-dark">
            Draft
          </span>
        )}
        <span
          className="mb-4 inline-block rounded-full px-3.5 py-1.5 text-[13px] font-bold"
          style={{ color: event.tagColor, backgroundColor: `${event.tagColor}15` }}
        >
          {event.tag}
        </span>
        <h1 className="font-display mb-4 text-[36px] font-extrabold tracking-tight sm:text-[42px]">
          {event.title}
        </h1>
        <div className="flex flex-col gap-1 text-[15px] font-semibold text-muted">
          <time dateTime={event.date}>{formatEventDate(event.date)}</time>
          {event.location && <span>{event.location}</span>}
        </div>

        {event.description && (
          <p className="mt-4 leading-relaxed text-[#4a4438]">{event.description}</p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {event.cityHref && (
            <a
              href={event.cityHref}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-bold text-white no-underline transition hover:scale-105"
            >
              City event page
            </a>
          )}
          {event.facebookHref && (
            <a
              href={event.facebookHref}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-foreground/15 px-6 py-3 text-sm font-bold text-foreground no-underline transition hover:border-accent hover:text-accent"
            >
              Facebook event
            </a>
          )}
          {event.mapHref && (
            <a
              href={event.mapHref}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-foreground/15 px-6 py-3 text-sm font-bold text-foreground no-underline transition hover:border-accent hover:text-accent"
            >
              View on map
            </a>
          )}
        </div>

        {event.sponsors.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-bold text-muted">Sponsors</p>
            <p className="text-sm text-[#4a4438]">{event.sponsors.join(" · ")}</p>
          </div>
        )}

        {event.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-surface-muted px-3 py-1 text-xs font-bold text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      {event.content.trim() && (
        <div className="prose-content">
          <MDXRemote source={event.content} />
        </div>
      )}
    </article>
  );
}
