import Link from "next/link";
import { notFound } from "next/navigation";
import CmsHtml from "@/components/CmsHtml";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export const dynamic = "force-static";

function formatPostDate(iso) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[800px] px-6 pt-16 pb-16 sm:px-12 sm:pt-20 sm:pb-22">
      <p className="mb-6 text-sm">
        <Link href="/blog" className="font-bold no-underline">
          ← All Posts
        </Link>
      </p>
      <header className="mb-10">
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
      <CmsHtml html={post.content} />
    </article>
  );
}
