import Image from "next/image";
import Link from "next/link";
import { membershipTiers } from "@/lib/data";

export const metadata = {
  title: "Get Involved",
  description:
    "Become a member, donate, or volunteer with Mother Language Lovers of the World Society.",
};

const IMG = "https://www.motherlanguagelovers.com";

export default function MembershipPage() {
  return (
    <div>
      <section className="mx-auto max-w-[900px] px-6 pt-16 pb-14 text-center sm:px-12 sm:pt-20">
        <h1 className="font-display mb-4 text-[40px] font-extrabold tracking-tight sm:text-[46px]">
          However you show up, thank you.
        </h1>
        <p className="text-lg text-muted">
          Membership, donations and volunteering all keep languages alive across Canada — pick
          what fits.
        </p>
      </section>

      <section aria-labelledby="tiers-heading" className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <h2 id="tiers-heading" className="font-display mb-8 text-center text-[28px] font-extrabold">
          Become a member
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {membershipTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-9 ${
                tier.featured
                  ? "bg-brand text-white"
                  : "border border-border-muted bg-white text-foreground"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-9 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-display mb-1.5 text-xl font-bold">{tier.name}</h3>
              <div className="font-display mb-[18px] text-[34px] font-extrabold">
                {tier.price}
                <span
                  className={`text-[15px] font-semibold ${
                    tier.featured ? "text-[#D6E6F2]" : "text-muted"
                  }`}
                >
                  {tier.period}
                </span>
              </div>
              <ul className="mb-[26px] flex flex-col gap-2.5 text-sm">
                {tier.perks.map((perk) => (
                  <li
                    key={perk}
                    className={tier.featured ? "text-[#DCE9F7]" : "text-[#4a4438]"}
                  >
                    ✓ {perk}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`block rounded-full py-3 text-center text-sm font-bold no-underline transition hover:scale-[1.03] ${
                  tier.featured
                    ? "bg-white text-brand hover:text-brand"
                    : "bg-foreground text-white hover:text-white"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Membership payments will connect to Zeffy soon. For now, reach us via{" "}
          <Link href="/contact">Contact</Link>.
        </p>
      </section>

      <section id="donate" aria-labelledby="donate-heading" className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <div className="grid items-stretch overflow-hidden rounded-[28px] border border-border-muted bg-white md:grid-cols-2">
          <div className="p-8 sm:p-12">
            <span className="mb-[18px] inline-block rounded-full bg-[#F7E4D3] px-3.5 py-1.5 text-[13px] font-bold text-accent-dark">
              Donate
            </span>
            <h2 id="donate-heading" className="font-display mb-3.5 text-[28px] font-extrabold">
              Your gift funds a free ticket for a newcomer family
            </h2>
            <p className="mb-[26px] leading-relaxed text-[#4a4438]">
              Donations support venue costs, artist fees, translation services and free admission
              for newcomer and refugee families at our festivals.
            </p>
            <div className="mb-5 flex flex-wrap gap-3">
              {["$25", "$50", "$100", "Other"].map((amount, i) => (
                <span
                  key={amount}
                  className={`rounded-full px-[22px] py-3 text-[15px] font-bold ${
                    i === 2
                      ? "bg-accent text-white"
                      : "border border-foreground/12 bg-background text-foreground"
                  }`}
                >
                  {amount}
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-foreground px-7 py-3.5 font-bold text-white no-underline transition hover:scale-105 hover:text-white"
            >
              Donate now
            </Link>
          </div>
          <div className="relative min-h-[280px]">
            <Image
              src={`${IMG}/Content/Pictures/mllws2.jpg`}
              alt="Community celebration at an MLLWS festival"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="volunteer-heading" className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-[28px] bg-green p-8 sm:p-13">
          <div className="max-w-[520px]">
            <h2 id="volunteer-heading" className="font-display mb-3 text-[26px] font-extrabold text-white">
              Volunteer with us
            </h2>
            <p className="text-[15px] leading-relaxed text-[#CBE9D9]">
              Run a booth, translate, mentor youth, or help set up the festival. No experience
              needed — just enthusiasm for your community.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-white px-7 py-3.5 font-bold text-green no-underline transition hover:scale-105 hover:text-green"
          >
            Sign up to volunteer
          </Link>
        </div>
      </section>
    </div>
  );
}
