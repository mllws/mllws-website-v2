import { toHTML, uriLooksSafe } from "@portabletext/to-html";
import { getSanityClient } from "@/lib/sanity";

const TYPE_BY_COLLECTION = {
  posts: "post",
  events: "event",
  stories: "story",
  galleries: "gallery",
};

const LISTING_PROJECTION = `{
  "slug": slug.current,
  title,
  date,
  author,
  excerpt,
  location,
  dateLocation,
  description,
  category,
  tag,
  tags,
  mapHref,
  cityHref,
  facebookHref,
  sponsors,
  featured,
  imageAlt,
  "coverImage": coalesce(coverImage.asset->url, coverImageUrl),
  "event": event->slug.current,
  images[] {
    "src": coalesce(image.asset->url, src),
    alt,
    caption
  }
}`;

function documentType(collection) {
  return TYPE_BY_COLLECTION[collection] || collection;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function portableTextToHtml(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  try {
    return toHTML(blocks, {
      components: {
        types: {
          image: ({ value }) => {
            const src = value?.url || value?.asset?.url || "";
            if (!src || !uriLooksSafe(src)) return "";
            const alt = escapeHtml(value?.alt || "");
            return `<img src="${escapeHtml(src)}" alt="${alt}" />`;
          },
        },
      },
    });
  } catch (err) {
    console.warn(`[cms] Portable Text render failed: ${err.message}`);
    return "";
  }
}

async function groq(query, params, tags) {
  const client = getSanityClient();
  if (!client) return null;
  try {
    return await client.fetch(query, params, {
      cache: "force-cache",
      next: { tags },
    });
  } catch (err) {
    console.warn(`[cms] Sanity query failed: ${err.message}`);
    return null;
  }
}

/**
 * @param {string} collection
 * @param {string[]} tags
 */
export async function readListing(collection, tags) {
  const type = documentType(collection);
  const rows = await groq(
    `*[_type == $type && defined(slug.current)] | order(date desc) ${LISTING_PROJECTION}`,
    { type },
    tags,
  );
  if (!Array.isArray(rows)) return [];
  return rows
    .filter((row) => row?.slug)
    .map((row) => ({
      ...row,
      date: row.date ? String(row.date).slice(0, 10) : "",
    }));
}

/**
 * @param {string} collection
 * @param {string} slug
 * @param {string[]} tags
 */
export async function readHtml(collection, slug, tags) {
  const type = documentType(collection);
  const doc = await groq(
    `*[_type == $type && slug.current == $slug][0]{
      body[]{
        ...,
        _type == "image" => {
          ...,
          "url": asset->url
        }
      }
    }`,
    { type, slug },
    tags,
  );
  return portableTextToHtml(doc?.body);
}
