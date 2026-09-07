import Link from "next/link";
import { notFound } from "next/navigation";
import CmsHtml from "@/components/CmsHtml";
import GalleryGrid from "@/components/GalleryGrid";
import { getAllGalleries, getGalleryBySlug } from "@/lib/galleries";

export const dynamic = "force-static";

function formatGalleryDate(iso) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export async function generateStaticParams() {
  return (await getAllGalleries()).map((gallery) => ({
    slug: gallery.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const gallery = await getGalleryBySlug(slug);
  if (!gallery) {
    return { title: "Album not found" };
  }
  return {
    title: gallery.title,
    description: `${gallery.title} — photo album from MLLWS.`,
  };
}

export default async function GalleryDetailPage({ params }) {
  const { slug } = await params;
  const gallery = await getGalleryBySlug(slug);
  if (!gallery) notFound();

  return (
    <article className="mx-auto max-w-[1100px] px-6 pt-16 pb-16 sm:px-12 sm:pt-20 sm:pb-22">
      <p className="mb-6 text-sm">
        <Link href="/gallery" className="font-bold no-underline">
          ← All albums
        </Link>
      </p>

      <header className="mb-10">
        <h1 className="font-display mb-4 text-[36px] font-extrabold tracking-tight sm:text-[42px]">
          {gallery.title}
        </h1>
        <p className="text-[15px] font-semibold text-muted">
          <time dateTime={gallery.date}>{formatGalleryDate(gallery.date)}</time>
          {gallery.images.length > 0 && (
            <>
              <span aria-hidden="true"> · </span>
              {gallery.images.length} {gallery.images.length === 1 ? "photo" : "photos"}
            </>
          )}
        </p>
        {gallery.event && (
          <p className="mt-3 text-sm">
            <Link href={`/events/${gallery.event}`} className="font-bold no-underline">
              Related event →
            </Link>
          </p>
        )}
      </header>

      <CmsHtml html={gallery.content} className="prose-content mb-10" />

      <GalleryGrid images={gallery.images} />
    </article>
  );
}
