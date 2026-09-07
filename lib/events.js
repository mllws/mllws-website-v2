import { readHtml, readListing } from "@/lib/cms";

const TAGS = ["cms-events"];

const TAG_COLORS = {
  festivals: "#1F6B4C",
  advocacy: "#3B6EA5",
  memorial: "#8B3626",
  community: "#8B3626",
  milestone: "#6E4A9E",
};

function withDefaults(event) {
  const category = event.category ? String(event.category).toLowerCase() : "community";
  return {
    ...event,
    category,
    tag: event.tag || category.toUpperCase(),
    tagColor: TAG_COLORS[category] || "#3B6EA5",
    tags: Array.isArray(event.tags) ? event.tags : [],
    sponsors: Array.isArray(event.sponsors) ? event.sponsors : [],
    featured: Boolean(event.featured),
    draft: false,
    coverImage: event.coverImage || null,
    content: event.content || "",
  };
}

export async function getAllEvents() {
  const events = await readListing("events", TAGS);
  return events
    .map(withDefaults)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getEventBySlug(slug) {
  if (!slug) return null;
  const events = await getAllEvents();
  const event = events.find((entry) => entry.slug === slug);
  if (!event) return null;
  const content = await readHtml("events", slug, [...TAGS, `cms-events-${slug}`]);
  return { ...event, content };
}

export async function getFeaturedEvent() {
  const events = await getAllEvents();
  return events.find((e) => e.featured) || events[0] || null;
}

export async function getEventFilters() {
  const events = await getAllEvents();
  const categories = [...new Set(events.map((e) => e.category))].sort();
  return [
    { key: "all", label: "All events" },
    ...categories.map((c) => ({ key: c, label: c.charAt(0).toUpperCase() + c.slice(1) })),
  ];
}
