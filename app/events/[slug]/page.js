import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CmsHtml from "@/components/CmsHtml";
import { getAllEvents, getEventBySlug } from "@/lib/events";
import { getAllGalleries } from "@/lib/galleries";

export const revalidate = 3600;

function formatEventDate(iso) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export async function generateStaticParams() {
  return (await getAllEvents()).map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
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
  const event = await getEventBySlug(slug);
  if (!event) notFound();
  const gallery = (await getAllGalleries()).find((entry) => entry.event === event.slug);

  const eventDate = new Date(event.date);
  const today = new Date();
  eventDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const showCityEventLink =
    event.cityHref && (Number.isNaN(eventDate.getTime()) || eventDate >= today);

  return (
    <article className="mx-auto max-w-[800px] px-6 pt-16 pb-16 sm:px-12 sm:pt-20 sm:pb-22">
      <p className="mb-6 text-sm">
        <Link href="/events" className="font-bold no-underline">
          ← All Events
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
          {showCityEventLink && (
            <a
              href={event.cityHref}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-bold text-white no-underline transition hover:scale-105"
            >
              City Event Page
            </a>
          )}
          {event.facebookHref && (
            <a
              href={event.facebookHref}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-foreground/15 px-6 py-3 text-sm font-bold text-foreground no-underline transition hover:border-accent hover:text-accent"
            >
              Facebook Event
            </a>
          )}
          {event.mapHref && (
            <a
              href={event.mapHref}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-foreground/15 px-6 py-3 text-sm font-bold text-foreground no-underline transition hover:border-accent hover:text-accent"
            >
              View on Map
            </a>
          )}
          {gallery && (
            <Link
              href={`/gallery/${gallery.slug}`}
              className="inline-block rounded-full border border-foreground/15 px-6 py-3 text-sm font-bold text-foreground no-underline transition hover:border-accent hover:text-accent"
            >
              View Gallery
            </Link>
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

      <CmsHtml html={event.content} />
    </article>
  );
}
