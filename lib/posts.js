import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const REQUIRED_FIELDS = ["title", "date", "author", "excerpt"];

function listMdxFiles() {
  if (!fs.existsSync(POSTS_DIR) || !fs.statSync(POSTS_DIR).isDirectory()) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
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

function readPost(filename) {
  const filepath = path.join(POSTS_DIR, filename);
  let file;
  try {
    file = fs.readFileSync(filepath, "utf8");
  } catch (err) {
    console.warn(`[posts] Could not read ${filename}: ${err.message}`);
    return null;
  }

  let parsed;
  try {
    parsed = matter(file);
  } catch (err) {
    console.warn(`[posts] Could not parse frontmatter in ${filename}: ${err.message}`);
    return null;
  }

  const data = parsed.data ?? {};
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = data[field];
    return value === undefined || value === null || String(value).trim() === "";
  });
  if (missing.length > 0) {
    console.warn(
      `[posts] Skipping ${filename}: missing required frontmatter (${missing.join(", ")})`
    );
    return null;
  }

  const date = toIsoDate(data.date);
  if (!date) {
    console.warn(`[posts] Skipping ${filename}: invalid date "${data.date}"`);
    return null;
  }

  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag) => String(tag)).filter(Boolean)
    : [];

  return {
    slug: filename.replace(/\.mdx$/, ""),
    title: String(data.title).trim(),
    date,
    author: String(data.author).trim(),
    excerpt: String(data.excerpt).trim(),
    tags,
    draft: Boolean(data.draft),
    coverImage: data.coverImage ? String(data.coverImage) : null,
    content: parsed.content ?? "",
  };
}

function loadPosts() {
  return listMdxFiles()
    .map(readPost)
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/**
 * @param {{ includeDrafts?: boolean }} [options]
 * @returns {Array<{
 *   slug: string,
 *   title: string,
 *   date: string,
 *   author: string,
 *   excerpt: string,
 *   tags: string[],
 *   draft: boolean,
 *   coverImage: string | null,
 *   content: string,
 * }>}
 */
export function getAllPosts({ includeDrafts = false } = {}) {
  const posts = loadPosts();
  return includeDrafts ? posts : posts.filter((post) => !post.draft);
}

/**
 * @param {string} slug
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function getPostBySlug(slug, { includeDrafts = false } = {}) {
  if (!slug) return null;
  const post = loadPosts().find((entry) => entry.slug === slug);
  if (!post) return null;
  if (post.draft && !includeDrafts) return null;
  return post;
}

/**
 * Sorted, de-duplicated tags from published (non-draft) posts.
 * @returns {string[]}
 */
export function getAllTags() {
  const tags = new Set();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}
