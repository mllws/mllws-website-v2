import PageBanner from "@/components/PageBanner";
import PersonCard from "@/components/PersonCard";
import { directors, chapters, advisors } from "@/lib/data";

export const metadata = {
  title: "Our Team",
  description:
    "Board of Directors / Global Policy Board of Mother Language Lovers of the World Society.",
};

export default function TeamPage() {
  return (
    <div>
      <PageBanner title="Our Team" crumb="Our Team" eyebrow="People behind MLLWS" />

      <p className="mx-auto mt-10 max-w-[900px] px-6 text-lg text-muted sm:px-12">
        The people behind MLLWS — a volunteer board, regional chapter presidents, and advisors who
        guide the organization&apos;s work promoting International Mother Language Day.
      </p>

      <section aria-labelledby="board-heading" className="mx-auto max-w-[1200px] px-6 py-12 sm:px-12">
        <h2 id="board-heading" className="font-display text-3xl font-extrabold text-foreground">
          Board of Directors
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {directors.map((d) => (
            <PersonCard key={d.name} {...d} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="chapters-heading"
        className="mx-auto max-w-[1200px] border-t border-border-muted px-6 py-12 sm:px-12"
      >
        <h2 id="chapters-heading" className="font-display text-3xl font-extrabold text-foreground">
          Chapters
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {chapters.map((d) => (
            <PersonCard key={d.name} {...d} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="advisors-heading"
        className="mx-auto max-w-[1200px] border-t border-border-muted px-6 py-12 sm:px-12"
      >
        <h2 id="advisors-heading" className="font-display text-3xl font-extrabold text-foreground">
          Advisors
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {advisors.map((d) => (
            <PersonCard key={d.name} {...d} />
          ))}
        </div>
      </section>
    </div>
  );
}
