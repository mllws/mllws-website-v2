import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const GALLERIES_DIR = path.join(process.cwd(), "content", "galleries");
const REQUIRED_FIELDS = ["title", "date"];

function listMdxFiles() {
  if (!fs.existsSync(GALLERIES_DIR) || !fs.statSync(GALLERIES_DIR).isDirectory()) {
    return [];
  }

  return fs
    .readdirSync(GALLERIES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);
}

function toIsoDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  const raw = String(value).trim();
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
  return parsed.toISOString().slice(0, 10);
}

function parseImages(data) {
  if (!Array.isArray(data.images)) return [];

  return data.images
    .map((img) => {
      if (!img || typeof img !== "object") return null;
      const src = img.src ? String(img.src).trim() : "";
      if (!src) return null;
      const alt = img.alt ? String(img.alt).trim() : "Festival photo";
      const caption = img.caption ? String(img.caption).trim() : "";
      return { src, alt, caption };
    })
    .filter(Boolean);
}

function readGallery(filename) {
  const filepath = path.join(GALLERIES_DIR, filename);
  let file;
  try {
    file = fs.readFileSync(filepath, "utf8");
  } catch (err) {
    console.warn(`[galleries] Could not read ${filename}: ${err.message}`);
    return null;
  }

  let parsed;
  try {
    parsed = matter(file);
  } catch (err) {
    console.warn(`[galleries] Could not parse frontmatter in ${filename}: ${err.message}`);
    return null;
  }

  const data = parsed.data ?? {};
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = data[field];
    return value === undefined || value === null || String(value).trim() === "";
  });
  if (missing.length > 0) {
    console.warn(
      `[galleries] Skipping ${filename}: missing required frontmatter (${missing.join(", ")})`
    );
    return null;
  }

  const date = toIsoDate(data.date);
  if (!date) {
    console.warn(`[galleries] Skipping ${filename}: invalid date "${data.date}"`);
    return null;
  }

  const images = parseImages(data);
  const coverImage = data.coverImage
    ? String(data.coverImage)
    : images[0]?.src || null;

  return {
    slug: filename.replace(/\.mdx$/, ""),
    title: String(data.title).trim(),
    date,
    event: data.event ? String(data.event).trim() : null,
    coverImage,
    imageAlt: data.imageAlt ? String(data.imageAlt).trim() : "",
    images,
    draft: Boolean(data.draft),
    content: parsed.content ?? "",
  };
}

function loadGalleries() {
  return listMdxFiles()
    .map(readGallery)
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/**
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getAllGalleries({ includeDrafts = false } = {}) {
  const galleries = loadGalleries();
  return includeDrafts ? galleries : galleries.filter((g) => !g.draft);
}

/**
 * @param {string} slug
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getGalleryBySlug(slug, { includeDrafts = false } = {}) {
  if (!slug) return null;
  const gallery = loadGalleries().find((g) => g.slug === slug);
  if (!gallery) return null;
  if (gallery.draft && !includeDrafts) return null;
  return gallery;
}

/**
 * Most recent published album.
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getLatestGallery({ includeDrafts = false } = {}) {
  return getAllGalleries({ includeDrafts })[0] || null;
}

/**
 * Up to five images from the latest album, for the homepage mosaic.
 * Returns null when no album images exist so callers can fall back.
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getHomepageGalleryImages({ includeDrafts = false } = {}) {
  const gallery = getLatestGallery({ includeDrafts });
  if (!gallery || gallery.images.length === 0) return null;

  return gallery.images.slice(0, 5).map((img, index) => ({
    src: img.src,
    alt: img.alt,
    span: index === 0,
  }));
}
