import { readHtml, readListing } from "@/lib/cms";

const TAGS = ["cms-stories"];

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

function withDefaults(story) {
  const category = story.category ? String(story.category).toLowerCase() : "recaps";
  return {
    ...story,
    category,
    tag: story.tag || category.toUpperCase(),
    tagColor: TAG_COLORS[category] || "#3B6EA5",
    tags: Array.isArray(story.tags) ? story.tags : [],
    featured: Boolean(story.featured),
    draft: false,
    coverImage: story.coverImage || null,
    content: story.content || "",
  };
}

export async function getAllStories() {
  const stories = await readListing("stories", TAGS);
  return stories
    .map(withDefaults)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getStoryBySlug(slug) {
  if (!slug) return null;
  const stories = await getAllStories();
  const story = stories.find((entry) => entry.slug === slug);
  if (!story) return null;
  const content = await readHtml("stories", slug, [...TAGS, `cms-stories-${slug}`]);
  return { ...story, content };
}

export async function getFeaturedStory() {
  const stories = await getAllStories();
  return stories.find((s) => s.featured) || stories[0] || null;
}

export async function getStoryFilters() {
  const stories = await getAllStories();
  const categories = [...new Set(stories.map((s) => s.category))].sort();
  return [
    { key: "all", label: "All" },
    ...categories.map((c) => ({
      key: c,
      label: CATEGORY_LABELS[c] || c.charAt(0).toUpperCase() + c.slice(1),
    })),
  ];
}
