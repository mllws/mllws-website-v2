import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import LanguageListen from "@/components/LanguageListen";
import NewsletterForm from "@/components/NewsletterForm";
import {
  greetingRibbon,
  upcomingEvent,
  programs,
  communityQuotes,
  galleryImages,
} from "@/lib/data";

function ProgramIcon({ color }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 4h10l6 6v10H4z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div>
      <HeroCarousel />

      <section aria-label="Greetings in many languages" className="overflow-hidden border-y border-border-muted bg-white py-[18px]">
        <div className="animate-drift font-display flex w-max gap-12 text-[17px] font-bold whitespace-nowrap text-muted">
          <span>{greetingRibbon}</span>
          <span aria-hidden="true">{greetingRibbon}</span>
        </div>
      </section>

      <section aria-labelledby="upcoming-heading" className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12 sm:py-22">
        <div className="mb-9 flex items-baseline justify-between gap-4">
          <h2 id="upcoming-heading" className="font-display text-[32px] font-extrabold">
            Up next
          </h2>
          <Link href="/events" className="font-bold text-brand no-underline hover:text-accent">
            All events →
          </Link>
        </div>
        <div className="grid items-stretch overflow-hidden rounded-[28px] border border-border-muted bg-white md:grid-cols-2">
          <div className="relative min-h-[280px] md:min-h-[340px]">
            <Image
              src={upcomingEvent.image}
              alt={upcomingEvent.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-8 sm:p-12">
            <span className="mb-[18px] inline-block rounded-full bg-[#EAF3EC] px-3.5 py-1.5 text-[13px] font-bold text-green-dark">
              {upcomingEvent.badge}
            </span>
            <h3 className="font-display mb-3.5 text-[28px] font-extrabold">{upcomingEvent.title}</h3>
            <p className="mb-[22px] leading-relaxed text-[#4a4438]">{upcomingEvent.description}</p>
            <div className="mb-7 flex flex-col gap-2.5 text-[15px] font-semibold text-foreground">
              <span>{upcomingEvent.date}</span>
              <span>
                <a href={upcomingEvent.mapHref} target="_blank" rel="noreferrer" className="text-foreground no-underline hover:text-accent">
                  {upcomingEvent.location}
                </a>
              </span>
            </div>
            <Link
              href={upcomingEvent.ctaHref}
              className="inline-block rounded-full bg-accent px-[26px] py-3.5 font-bold text-white no-underline transition hover:scale-105 hover:text-white"
            >
              {upcomingEvent.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="programs-heading" className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <h2 id="programs-heading" className="font-display mb-2 text-[32px] font-extrabold">
          What we run, year-round
        </h2>
        <p className="mb-9 text-[17px] text-muted">Not just one day in February — community, all year.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.title}
              className="rounded-[22px] border border-border-muted bg-white p-8 transition hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(34,31,26,0.1)]"
            >
              <div className={`mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-2xl ${program.iconBg}`}>
                <ProgramIcon color={program.iconColor} />
              </div>
              <h3 className="font-display mb-2.5 text-[19px] font-bold">{program.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{program.description}</p>
            </div>
          ))}
        </div>
      </section>

      <LanguageListen />

      <section aria-labelledby="voices-heading" className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12 sm:py-22">
        <h2 id="voices-heading" className="font-display mb-9 text-[32px] font-extrabold">
          Voices from our community
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {communityQuotes.map((q) => (
            <blockquote
              key={q.name + q.role}
              className={`rounded-[22px] p-7 transition hover:-translate-y-1 ${q.bg}`}
            >
              <p className="mb-[22px] text-base leading-relaxed text-foreground">&ldquo;{q.quote}&rdquo;</p>
              <footer>
                <div className="text-sm font-bold">{q.name}</div>
                <div className="text-[13px] text-muted">{q.role}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section aria-labelledby="gallery-heading" className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <h2 id="gallery-heading" className="font-display mb-9 text-[32px] font-extrabold">
          Moments from our events
        </h2>
        <div className="grid auto-rows-[160px] grid-cols-2 gap-4 md:grid-cols-4">
          {galleryImages.map((img) => (
            <div
              key={img.src + img.alt}
              className={`relative overflow-hidden rounded-[18px] ${
                img.span ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="involved-heading" className="relative overflow-hidden bg-brand px-6 py-16 sm:px-12 sm:py-22">
        <div className="relative mx-auto max-w-[1200px]">
          <h2 id="involved-heading" className="font-display mb-2 text-[32px] font-extrabold text-white">
            Get involved
          </h2>
          <p className="mb-9 text-[17px] text-[#D6E6F2]">
            However you show up, you help keep languages alive.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-9 text-white transition hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.25)]">
              <h3 className="font-display mb-3 text-[21px] font-bold">Become a member</h3>
              <p className="mb-[26px] text-[15px] leading-relaxed text-[#D6E6F2]">
                Get event updates, our newsletter, and a voice in what we do next.
              </p>
              <Link
                href="/membership"
                className="inline-block rounded-full bg-white px-[22px] py-3 text-sm font-bold text-brand no-underline hover:text-brand"
              >
                Join today
              </Link>
            </div>
            <div className="rounded-3xl bg-accent p-9 text-white transition hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(179,69,47,0.35)]">
              <h3 className="font-display mb-3 text-[21px] font-bold">Donate</h3>
              <p className="mb-[26px] text-[15px] leading-relaxed text-[#F0CFC2]">
                Every dollar funds venue costs, artist fees and free tickets for newcomer families.
              </p>
              <Link
                href="/membership#donate"
                className="inline-block rounded-full bg-white px-[22px] py-3 text-sm font-bold text-accent no-underline hover:text-accent"
              >
                Give today
              </Link>
            </div>
            <div className="rounded-3xl bg-green p-9 text-white transition hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(46,139,103,0.35)]">
              <h3 className="font-display mb-3 text-[21px] font-bold">Volunteer</h3>
              <p className="mb-[26px] text-[15px] leading-relaxed text-[#CBE9D9]">
                Help run booths, translate, or support youth and community programs in your language.
              </p>
              <Link
                href="/contact"
                className="inline-block rounded-full bg-white px-[22px] py-3 text-sm font-bold text-green no-underline hover:text-green"
              >
                Sign up
              </Link>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-8 rounded-[28px] bg-white/10 p-8 sm:p-13">
            <div>
              <h3 className="font-display mb-2 text-2xl font-extrabold text-white">
                Never miss a celebration
              </h3>
              <p className="text-[15px] text-[#D6E6F2]">Monthly event updates, straight to your inbox.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
