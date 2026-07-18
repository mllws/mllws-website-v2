import PageBanner from "@/components/PageBanner";
import PersonCard from "@/components/PersonCard";
import { directors, chapters, advisors } from "@/lib/data";

export const metadata = {
  title: "Our Team",
  description:
    "Board of Directors / Global Policy Board of Mother Language Lovers of the World Society for 2019 – 2021.",
};

export default function TeamPage() {
  return (
    <div>
      <PageBanner title="Our Team" crumb="Our Team" />

      <p className="mx-auto mt-8 max-w-4xl px-4 text-lg text-gray-700">
        The people behind MLLWS — a volunteer board, regional chapter
        presidents, and advisors who guide the organization's work promoting
        International Mother Language Day.
      </p>

      <section aria-labelledby="board-heading" className="mx-auto max-w-6xl px-4 py-12">
        <h2 id="board-heading" className="text-2xl font-bold text-brand-dark">
          Board of Directors
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {directors.map((d) => (
            <PersonCard key={d.name} {...d} />
          ))}
        </div>
      </section>

      <section aria-labelledby="chapters-heading" className="mx-auto max-w-6xl px-4 pb-12">
        <h2 id="chapters-heading" className="text-2xl font-bold text-brand-dark">
          Chapters
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {chapters.map((d) => (
            <PersonCard key={d.name} {...d} />
          ))}
        </div>
      </section>

      <section aria-labelledby="advisors-heading" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 id="advisors-heading" className="text-2xl font-bold text-brand-dark">
          Advisors
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {advisors.map((d) => (
            <PersonCard key={d.name} {...d} />
          ))}
        </div>
      </section>
    </div>
  );
}
