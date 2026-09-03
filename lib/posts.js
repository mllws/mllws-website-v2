import { readHtml, readListing } from "@/lib/cms";

const TAGS = ["cms-posts"];

function withDefaults(post) {
  return {
    ...post,
    tags: Array.isArray(post.tags) ? post.tags : [],
    draft: false,
    coverImage: post.coverImage || null,
    content: post.content || "",
  };
}

export async function getAllPosts() {
  const posts = await readListing("posts", TAGS);
  return posts
    .map(withDefaults)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getPostBySlug(slug) {
  if (!slug) return null;
  const posts = await getAllPosts();
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) return null;
  const content = await readHtml("posts", slug, [...TAGS, `cms-posts-${slug}`]);
  return { ...post, content };
}

export async function getAllTags() {
  const tags = new Set();
  for (const post of await getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}
