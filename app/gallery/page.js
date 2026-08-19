import Image from "next/image";
import Link from "next/link";
import { getAllGalleries } from "@/lib/galleries";

function includeDrafts() {
  return process.env.NODE_ENV !== "production";
}

function formatGalleryDate(iso) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export default function GalleryPage() {
  const galleries = getAllGalleries({ includeDrafts: includeDrafts() });

  return (
    <div>
      <section className="mx-auto max-w-[900px] px-6 pt-16 pb-10 text-center sm:px-12 sm:pt-18">
        <h1 className="font-display mb-4 text-[40px] font-extrabold tracking-tight sm:text-[46px]">
          Photo gallery
        </h1>
        <p className="text-lg text-muted">
          Moments from Mother Language Festivals, IMLD observances, and community gatherings.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        {galleries.length === 0 ? (
          <p className="py-10 text-center text-muted">
            No albums published yet — check back soon.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleries.map((album) => (
              <li key={album.slug}>
                <Link
                  href={`/gallery/${album.slug}`}
                  className="block overflow-hidden rounded-2xl border border-border-muted bg-white no-underline transition hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(34,31,26,0.1)]"
                >
                  <article>
                    <div className="relative h-[190px] bg-surface-muted">
                      {album.coverImage && (
                        <Image
                          src={album.coverImage}
                          alt={album.imageAlt || album.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="p-[22px]">
                      <p className="text-xs font-bold text-muted">
                        <time dateTime={album.date}>{formatGalleryDate(album.date)}</time>
                        {album.images.length > 0 && (
                          <>
                            <span aria-hidden="true"> · </span>
                            {album.images.length} {album.images.length === 1 ? "photo" : "photos"}
                          </>
                        )}
                      </p>
                      <h2 className="font-display mt-2 text-[17px] font-bold text-foreground">
                        {album.title}
                      </h2>
                      <span className="mt-3 inline-block text-[13px] font-bold text-foreground">
                        View album →
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
