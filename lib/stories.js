import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const STORIES_DIR = path.join(process.cwd(), "content", "stories");
const REQUIRED_FIELDS = ["title", "date", "author", "excerpt"];

const TAG_COLORS = {
  milestones: "#6E4A9E",
  origins: "#8B3626",
  recaps: "#1F6B4C",
  spotlights: "#6E4A9E",
};

const CATEGORY_LABELS = {
  milestones: "Milestones",
  origins: "Origins",
  recaps: "Recaps",
  spotlights: "Spotlights",
};

function listMdxFiles() {
  if (!fs.existsSync(STORIES_DIR) || !fs.statSync(STORIES_DIR).isDirectory()) {
    return [];
  }

  return fs
    .readdirSync(STORIES_DIR, { withFileTypes: true })
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

function readStory(filename) {
  const filepath = path.join(STORIES_DIR, filename);
  let file;
  try {
    file = fs.readFileSync(filepath, "utf8");
  } catch (err) {
    console.warn(`[stories] Could not read ${filename}: ${err.message}`);
    return null;
  }

  let parsed;
  try {
    parsed = matter(file);
  } catch (err) {
    console.warn(`[stories] Could not parse frontmatter in ${filename}: ${err.message}`);
    return null;
  }

  const data = parsed.data ?? {};
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = data[field];
    return value === undefined || value === null || String(value).trim() === "";
  });
  if (missing.length > 0) {
    console.warn(
      `[stories] Skipping ${filename}: missing required frontmatter (${missing.join(", ")})`
    );
    return null;
  }

  const date = toIsoDate(data.date);
  if (!date) {
    console.warn(`[stories] Skipping ${filename}: invalid date "${data.date}"`);
    return null;
  }

  const category = data.category ? String(data.category).toLowerCase() : "recaps";
  const tag = data.tag ? String(data.tag) : category.toUpperCase();
  const tags = Array.isArray(data.tags)
    ? data.tags.map((t) => String(t)).filter(Boolean)
    : [];

  return {
    slug: filename.replace(/\.mdx$/, ""),
    title: String(data.title).trim(),
    date,
    author: String(data.author).trim(),
    excerpt: String(data.excerpt).trim(),
    category,
    tag,
    tagColor: TAG_COLORS[category] || "#3B6EA5",
    tags,
    coverImage: data.coverImage ? String(data.coverImage) : null,
    imageAlt: data.imageAlt ? String(data.imageAlt).trim() : "",
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    content: parsed.content ?? "",
  };
}

function loadStories() {
  return listMdxFiles()
    .map(readStory)
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/**
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getAllStories({ includeDrafts = false } = {}) {
  const stories = loadStories();
  return includeDrafts ? stories : stories.filter((s) => !s.draft);
}

/**
 * @param {string} slug
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getStoryBySlug(slug, { includeDrafts = false } = {}) {
  if (!slug) return null;
  const story = loadStories().find((s) => s.slug === slug);
  if (!story) return null;
  if (story.draft && !includeDrafts) return null;
  return story;
}

/**
 * Featured story, or the most recent if none is marked featured.
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getFeaturedStory({ includeDrafts = false } = {}) {
  const stories = getAllStories({ includeDrafts });
  return stories.find((s) => s.featured) || stories[0] || null;
}

/**
 * Distinct categories from published stories, for filter chips.
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getStoryFilters({ includeDrafts = false } = {}) {
  const stories = getAllStories({ includeDrafts });
  const categories = [...new Set(stories.map((s) => s.category))].sort();
  return [
    { key: "all", label: "All" },
    ...categories.map((c) => ({
      key: c,
      label: CATEGORY_LABELS[c] || c.charAt(0).toUpperCase() + c.slice(1),
    })),
  ];
}
