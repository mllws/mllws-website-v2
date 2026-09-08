import StoriesList from "@/components/StoriesList";
import { getAllStories, getFeaturedStory, getStoryFilters } from "@/lib/stories";

export const dynamic = "force-static";

export default async function StoriesPage() {
  const stories = await getAllStories();
  const featured = await getFeaturedStory();
  const filters = await getStoryFilters();

  return (
    <div>
      <section className="mx-auto max-w-[900px] px-6 pt-16 pb-10 text-center sm:px-12 sm:pt-18">
        <h1 className="font-display mb-4 text-[40px] font-extrabold tracking-tight sm:text-[46px]">
          Stories from our community
        </h1>
        <p className="text-lg text-muted">
          Recaps, milestones, and the history behind International Mother Language Day.
        </p>
      </section>

      {stories.length > 0 ? (
        <StoriesList stories={stories} filters={filters} featured={featured} />
      ) : (
        <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12">
          <p className="py-10 text-center text-muted">
            No stories published yet — check back soon.
          </p>
        </section>
      )}
    </div>
  );
}
