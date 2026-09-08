import { readHtml, readListing } from "@/lib/cms";

const TAGS = ["cms-galleries"];

function withDefaults(gallery) {
  const images = Array.isArray(gallery.images) ? gallery.images : [];
  return {
    ...gallery,
    images,
    coverImage: gallery.coverImage || images[0]?.src || null,
    imageAlt: gallery.imageAlt || "",
    event: gallery.event || null,
    draft: false,
    content: gallery.content || "",
  };
}

export async function getAllGalleries() {
  const galleries = await readListing("galleries", TAGS);
  return galleries
    .map(withDefaults)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getGalleryBySlug(slug) {
  if (!slug) return null;
  const galleries = await getAllGalleries();
  const gallery = galleries.find((entry) => entry.slug === slug);
  if (!gallery) return null;
  const content = await readHtml("galleries", slug, [...TAGS, `cms-galleries-${slug}`]);
  return { ...gallery, content };
}

export async function getLatestGallery() {
  const galleries = await getAllGalleries();
  return galleries[0] || null;
}

export async function getHomepageGalleryImages() {
  const gallery = await getLatestGallery();
  if (!gallery || gallery.images.length === 0) return null;

  return gallery.images.slice(0, 5).map((img, index) => ({
    src: img.src,
    alt: img.alt,
    span: index === 0,
  }));
}
