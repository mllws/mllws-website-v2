import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const EVENTS_DIR = path.join(process.cwd(), "content", "events");
const REQUIRED_FIELDS = ["title", "date"];

function listMdxFiles() {
  if (!fs.existsSync(EVENTS_DIR) || !fs.statSync(EVENTS_DIR).isDirectory()) {
    return [];
  }

  return fs
    .readdirSync(EVENTS_DIR, { withFileTypes: true })
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

const TAG_COLORS = {
  festivals: "#1F6B4C",
  advocacy: "#3B6EA5",
  memorial: "#8B3626",
  community: "#8B3626",
  milestone: "#6E4A9E",
};

function readEvent(filename) {
  const filepath = path.join(EVENTS_DIR, filename);
  let file;
  try {
    file = fs.readFileSync(filepath, "utf8");
  } catch (err) {
    console.warn(`[events] Could not read ${filename}: ${err.message}`);
    return null;
  }

  let parsed;
  try {
    parsed = matter(file);
  } catch (err) {
    console.warn(`[events] Could not parse frontmatter in ${filename}: ${err.message}`);
    return null;
  }

  const data = parsed.data ?? {};
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = data[field];
    return value === undefined || value === null || String(value).trim() === "";
  });
  if (missing.length > 0) {
    console.warn(
      `[events] Skipping ${filename}: missing required frontmatter (${missing.join(", ")})`
    );
    return null;
  }

  const date = toIsoDate(data.date);
  if (!date) {
    console.warn(`[events] Skipping ${filename}: invalid date "${data.date}"`);
    return null;
  }

  const category = data.category ? String(data.category).toLowerCase() : "community";
  const tag = data.tag ? String(data.tag) : category.toUpperCase();
  const tags = Array.isArray(data.tags)
    ? data.tags.map((t) => String(t)).filter(Boolean)
    : [];

  return {
    slug: filename.replace(/\.mdx$/, ""),
    title: String(data.title).trim(),
    date,
    location: data.location ? String(data.location).trim() : null,
    dateLocation: data.dateLocation ? String(data.dateLocation).trim() : null,
    description: data.description ? String(data.description).trim() : null,
    category,
    tag,
    tagColor: TAG_COLORS[category] || "#3B6EA5",
    tags,
    coverImage: data.coverImage ? String(data.coverImage) : null,
    imageAlt: data.imageAlt ? String(data.imageAlt).trim() : "",
    mapHref: data.mapHref ? String(data.mapHref) : null,
    cityHref: data.cityHref ? String(data.cityHref) : null,
    facebookHref: data.facebookHref ? String(data.facebookHref) : null,
    sponsors: Array.isArray(data.sponsors) ? data.sponsors.map(String) : [],
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    content: parsed.content ?? "",
  };
}

function loadEvents() {
  return listMdxFiles()
    .map(readEvent)
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/**
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getAllEvents({ includeDrafts = false } = {}) {
  const events = loadEvents();
  return includeDrafts ? events : events.filter((e) => !e.draft);
}

/**
 * @param {string} slug
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getEventBySlug(slug, { includeDrafts = false } = {}) {
  if (!slug) return null;
  const event = loadEvents().find((e) => e.slug === slug);
  if (!event) return null;
  if (event.draft && !includeDrafts) return null;
  return event;
}

/**
 * Returns the featured event (most recent with featured: true),
 * or the most recent event if none is featured.
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getFeaturedEvent({ includeDrafts = false } = {}) {
  const events = getAllEvents({ includeDrafts });
  return events.find((e) => e.featured) || events[0] || null;
}

/**
 * Distinct categories from published events, for filter chips.
 */
export function getEventFilters({ includeDrafts = false } = {}) {
  const events = getAllEvents({ includeDrafts });
  const categories = [...new Set(events.map((e) => e.category))].sort();
  return [
    { key: "all", label: "All events" },
    ...categories.map((c) => ({ key: c, label: c.charAt(0).toUpperCase() + c.slice(1) })),
  ];
}
