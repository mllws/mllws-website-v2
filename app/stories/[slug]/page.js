import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllStories, getStoryBySlug } from "@/lib/stories";

function includeDrafts() {
  return process.env.NODE_ENV !== "production";
}

function formatStoryDate(iso) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function generateStaticParams() {
  return getAllStories({ includeDrafts: includeDrafts() }).map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug, { includeDrafts: includeDrafts() });
  if (!story) {
    return { title: "Story not found" };
  }
  return {
    title: story.title,
    description: story.excerpt,
  };
}

export default async function StoryDetailPage({ params }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug, { includeDrafts: includeDrafts() });
  if (!story) notFound();

  return (
    <article className="mx-auto max-w-[800px] px-6 pt-16 pb-16 sm:px-12 sm:pt-20 sm:pb-22">
      <p className="mb-6 text-sm">
        <Link href="/stories" className="font-bold no-underline">
          ← All stories
        </Link>
      </p>

      {story.coverImage && (
        <div className="relative mb-8 h-[260px] overflow-hidden rounded-2xl sm:h-[360px]">
          <Image
            src={story.coverImage}
            alt={story.imageAlt || story.title}
            fill
            className="object-cover"
            sizes="(max-width: 800px) 100vw, 800px"
            priority
          />
        </div>
      )}

      <header className="mb-10">
        {story.draft && (
          <span className="mb-4 inline-block rounded-full bg-[#F7E4D3] px-3 py-1 text-xs font-bold text-accent-dark">
            Draft
          </span>
        )}
        <span
          className="mb-4 inline-block rounded-full px-3.5 py-1.5 text-[13px] font-bold"
          style={{ color: story.tagColor, backgroundColor: `${story.tagColor}15` }}
        >
          {story.tag}
        </span>
        <h1 className="font-display mb-4 text-[36px] font-extrabold tracking-tight sm:text-[42px]">
          {story.title}
        </h1>
        <p className="text-[15px] font-semibold text-muted">
          <time dateTime={story.date}>{formatStoryDate(story.date)}</time>
          <span aria-hidden="true"> · </span>
          {story.author}
        </p>
        {story.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {story.tags.map((tag) => (
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

      {story.content.trim() && (
        <div className="prose-content">
          <MDXRemote source={story.content} />
        </div>
      )}
    </article>
  );
}
