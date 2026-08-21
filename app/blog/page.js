import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

function includeDrafts() {
  return process.env.NODE_ENV !== "production";
}

function formatPostDate(iso) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export default function BlogPage() {
  const posts = getAllPosts({ includeDrafts: includeDrafts() });

  return (
    <div>
      <section className="mx-auto max-w-[900px] px-6 pt-16 pb-10 text-center sm:px-12 sm:pt-18">
        <h1 className="font-display mb-4 text-[40px] font-extrabold tracking-tight sm:text-[46px]">
          Blog
        </h1>
        <p className="text-lg text-muted">
          News, recaps, and stories from our community — written as they happen.
        </p>
      </section>

      <section className="mx-auto max-w-[800px] px-6 pb-16 sm:px-12 sm:pb-22">
        {posts.length === 0 ? (
          <p className="py-10 text-center text-muted">
            No published posts yet — check back soon.
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="rounded-2xl border border-border-muted bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(34,31,26,0.1)]">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-[13px] font-semibold text-muted">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.author}</span>
                    {post.draft && (
                      <span className="rounded-full bg-[#F7E4D3] px-2.5 py-0.5 text-xs font-bold text-accent-dark">
                        Draft
                      </span>
                    )}
                  </div>
                  <h2 className="font-display mb-2 text-[22px] font-extrabold">
                    <Link href={`/blog/${post.slug}`} className="text-foreground no-underline hover:text-accent">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mb-4 text-[15px] leading-relaxed text-[#4a4438]">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <ul className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-surface-muted px-3 py-1 text-xs font-bold text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link href={`/blog/${post.slug}`} className="text-sm font-bold no-underline">
                    Read Post →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
