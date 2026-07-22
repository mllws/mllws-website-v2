import Image from "next/image";
import Link from "next/link";
import { aboutMilestones, aboutValues, directors } from "@/lib/data";

export const metadata = {
  title: "Our Story",
  description:
    "Mother Language Lovers of the World Society's mission is to fortify and strengthen the love for one's own mother language and respect for other languages, raise awareness among all people about the importance of mother language in social and cultural development, and protect minority languages, including Braille and Sign Language.",
};

const IMG = "https://www.motherlanguagelovers.com";
const boardPreview = directors.slice(0, 4);

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-[900px] px-6 pt-16 pb-10 text-center sm:px-12 sm:pt-20">
        <h1 className="font-display mb-4 text-[40px] font-extrabold tracking-tight sm:text-[46px]">
          Our story
        </h1>
        <p className="text-lg text-muted">
          Neighbours who wanted every mother tongue spoken proudly — grown into a movement that
          helped bring International Mother Language Day to the world, and to Canada.
        </p>
      </section>

      <section className="mx-auto max-w-[1000px] px-6 pb-16 sm:px-12 sm:pb-22">
        <div className="relative h-[320px] overflow-hidden rounded-[28px] sm:h-[420px]">
          <Image
            src={`${IMG}/Content/Pictures/mllws2.jpg`}
            alt="MLLWS community gathering"
            fill
            className="object-cover"
            sizes="(max-width: 1000px) 100vw, 1000px"
            priority
          />
        </div>
      </section>

      <section className="prose-content mx-auto max-w-[800px] px-6 pb-16 sm:px-12 sm:pb-22">
        <p className="text-[19px] leading-[1.8] text-[#33302A]">
          We are a non-profit organization bringing together people of various linguistic and
          cultural origins to celebrate their heritage and enrich multiculturalism and
          intercultural harmony. We promote International Mother Language Day (February 21) to
          build national and community-level capacity for inclusive education and multilingualism
          as envisioned by UNESCO.
        </p>
        <p className="text-[19px] leading-[1.8] text-[#33302A]">
          To love, observe and conserve all mother languages of the world, the pioneer late Mr.
          Rafiqul Islam (1950–2013) proposed that February 21 be International Mother Language Day
          — the day Bangalee people sacrificed their lives for their mother language during the
          1952 Language Movement. In 1999, with the help of Bangladesh and 29 countries including
          Canada, UNESCO proclaimed the day. Since 2000 it has been celebrated globally.
        </p>
        <p className="text-[19px] leading-[1.8] text-[#33302A]">
          Today MLLWS is a volunteer-run society in Surrey / Vancouver, BC, powered by members,
          chapters, school and library partners, and one simple belief: every language deserves to
          be celebrated, not just preserved.
        </p>
      </section>

      <section aria-labelledby="milestones-heading" className="mx-auto max-w-[900px] px-6 pb-16 sm:px-12 sm:pb-22">
        <h2 id="milestones-heading" className="font-display mb-9 text-center text-[28px] font-extrabold">
          Milestones
        </h2>
        <div className="flex flex-col">
          {aboutMilestones.map((m, i) => (
            <div
              key={m.year}
              className={`grid grid-cols-[100px_1fr] gap-6 py-5 ${
                i < aboutMilestones.length - 1 ? "border-b border-border-muted" : ""
              }`}
            >
              <div className={`font-display text-xl font-extrabold ${m.color}`}>{m.year}</div>
              <div className="text-[15px] leading-relaxed text-[#4a4438]">{m.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="values-heading" className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <h2 id="values-heading" className="font-display mb-8 text-center text-[28px] font-extrabold">
          What we believe
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {aboutValues.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border-muted bg-white p-7">
              <h3 className="font-display mb-2.5 text-[17px] font-bold">{v.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="board-heading" className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <h2 id="board-heading" className="font-display mb-8 text-center text-[28px] font-extrabold">
          Volunteer board
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {boardPreview.map((person) => (
            <div key={person.name} className="text-center">
              <div className="relative mx-auto mb-3.5 h-[120px] w-[120px] overflow-hidden rounded-full">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
              <div className="text-[15px] font-bold">{person.name}</div>
              <div className="text-[13px] text-muted">{person.title}</div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/team" className="font-bold no-underline">
            Meet the full team →
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-[800px] px-6 pb-16 text-center sm:px-12 sm:pb-22">
        <div className="rounded-[28px] bg-brand px-8 py-12 text-white">
          <h2 className="font-display mb-3 text-2xl font-extrabold">Learn more</h2>
          <p className="mb-6 text-[#D6E6F2]">
            Read our constitution, recommendation letters, or get in touch.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/constitution"
              className="rounded-full bg-white px-5 py-3 text-sm font-bold text-brand no-underline hover:text-brand"
            >
              Constitution
            </Link>
            <Link
              href="/recommendation"
              className="rounded-full bg-white/15 px-5 py-3 text-sm font-bold text-white no-underline hover:text-white"
            >
              Recommendations
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-white/15 px-5 py-3 text-sm font-bold text-white no-underline hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
