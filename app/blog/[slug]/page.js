import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

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

export function generateStaticParams() {
  return getAllPosts({ includeDrafts: includeDrafts() }).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, { includeDrafts: includeDrafts() });
  if (!post) {
    return { title: "Post not found" };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, { includeDrafts: includeDrafts() });
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[800px] px-6 pt-16 pb-16 sm:px-12 sm:pt-20 sm:pb-22">
      <p className="mb-6 text-sm">
        <Link href="/blog" className="font-bold no-underline">
          ← All posts
        </Link>
      </p>
      <header className="mb-10">
        {post.draft && (
          <span className="mb-4 inline-block rounded-full bg-[#F7E4D3] px-3 py-1 text-xs font-bold text-accent-dark">
            Draft
          </span>
        )}
        <h1 className="font-display mb-4 text-[36px] font-extrabold tracking-tight sm:text-[42px]">
          {post.title}
        </h1>
        <p className="text-[15px] font-semibold text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          {post.author}
        </p>
        {post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
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
      </header>
      <div className="prose-content">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
