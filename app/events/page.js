import LanguageHover from "@/components/LanguageHover";
import EventsList from "@/components/EventsList";
import { getAllEvents, getFeaturedEvent, getEventFilters } from "@/lib/events";

export const dynamic = "force-static";

export default async function EventsPage() {
  const events = await getAllEvents();
  const featured = await getFeaturedEvent();
  const filters = await getEventFilters();

  return (
    <div>
      <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-10 text-center sm:px-12 sm:pt-18">
        <h1 className="font-display mb-4 text-[40px] font-extrabold tracking-tight sm:text-[46px]">
          Events &amp; Gatherings
        </h1>
        <p className="mx-auto max-w-[560px] text-lg text-muted">
          From our flagship Mother Language Festival to year-round advocacy — find what&apos;s
          happening with MLLWS.
        </p>
      </section>

      {events.length > 0 ? (
        <EventsList events={events} filters={filters} featured={featured} />
      ) : (
        <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12">
          <p className="py-10 text-center text-muted">
            No events published yet — check back soon.
          </p>
        </section>
      )}

      <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-brand p-12">
          <div>
            <h2 className="font-display mb-2 text-2xl font-extrabold text-white">
              Want to host an event with us?
            </h2>
            <p className="text-[15px] text-[#D6E6F2]">
              We support community groups running their own language celebrations.
            </p>
          </div>
          <LanguageHover
            href="/contact"
            className="rounded-full bg-white px-7 py-3.5 font-bold text-brand no-underline transition hover:scale-105 hover:text-brand"
          >
            Get in touch
          </LanguageHover>
        </div>
      </section>
    </div>
  );
}
