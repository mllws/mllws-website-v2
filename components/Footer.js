import Image from "next/image";
import Link from "next/link";
import { sponsors, contactInfo, siteLogo, secondaryNav } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-background px-6 pb-8 pt-14 text-foreground sm:px-12">
      <div
        aria-hidden="true"
        className="animate-footer-gradient absolute top-0 right-0 left-0 h-[5px] bg-gradient-to-r from-accent via-green via-brand via-purple to-accent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-35 -right-20 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(179,69,47,0.12),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-[10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(46,139,103,0.1),transparent_70%)]"
      />

      <div className="relative mx-auto mb-10 max-w-[1200px] text-center">
        <p className="font-display mb-7 text-xl font-extrabold text-foreground">
          Our language is our identity
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-7 opacity-85">
          {sponsors.map((s) => (
            <li key={s.name} className="flex h-9 w-[100px] items-center justify-center">
              <Image
                src={s.src}
                alt={s.name}
                width={100}
                height={36}
                className="max-h-9 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto mb-10 grid max-w-[1200px] gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <Image src={siteLogo} alt="" width={30} height={30} className="h-[30px] w-[30px]" />
            <span className="font-display text-[15px] font-extrabold text-foreground">
              Mother Language Lovers of the World Society
            </span>
          </div>
          <p className="max-w-[320px] text-sm leading-relaxed text-muted">
            A volunteer-run non-profit celebrating linguistic diversity across Canada, and the
            home of International Mother Language Day advocacy.
          </p>
        </div>

        <nav aria-label="Explore">
          <p className="mb-4 text-sm font-extrabold tracking-wide text-accent-dark">Explore</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/events" className="inline-block text-muted no-underline transition hover:translate-x-1 hover:text-accent-dark">
                Events
              </Link>
            </li>
            <li>
              <Link href="/stories" className="inline-block text-muted no-underline transition hover:translate-x-1 hover:text-accent-dark">
                Stories
              </Link>
            </li>
            <li>
              <Link href="/about" className="inline-block text-muted no-underline transition hover:translate-x-1 hover:text-accent-dark">
                Our Story
              </Link>
            </li>
            {secondaryNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-block text-muted no-underline transition hover:translate-x-1 hover:text-accent-dark">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Get involved">
          <p className="mb-4 text-sm font-extrabold tracking-wide text-green-dark">Get involved</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/membership" className="inline-block text-muted no-underline transition hover:translate-x-1 hover:text-green-dark">
                Membership
              </Link>
            </li>
            <li>
              <Link href="/membership#donate" className="inline-block text-muted no-underline transition hover:translate-x-1 hover:text-green-dark">
                Donate
              </Link>
            </li>
            <li>
              <Link href="/contact" className="inline-block text-muted no-underline transition hover:translate-x-1 hover:text-green-dark">
                Volunteer
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-sm font-extrabold tracking-wide text-brand">Contact</p>
          <ul className="flex flex-col gap-2.5 text-sm text-muted">
            <li>
              <a href={`mailto:${contactInfo.email}`} className="text-muted no-underline hover:text-brand">
                {contactInfo.email}
              </a>
            </li>
            <li>
              <a href={contactInfo.phoneHref} className="text-muted no-underline hover:text-brand">
                {contactInfo.phone}
              </a>
            </li>
            <li>{contactInfo.locationLabel}</li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1200px] border-t border-foreground/10 pt-6">
        <p className="mb-3.5 max-w-[900px] text-[12.5px] leading-relaxed text-muted-light">
          Mother Language Lovers of the World Society (MLLWS) acknowledges that it is situated on
          the unceded traditional territories of the xʷməθkʷəy̓əm (Musqueam Indian Band),
          Sḵwx̱wú7mesh (Squamish Nation), and səlilwətaɬ (Tsleil-Waututh Nation).
        </p>
        <p className="text-[13px] text-muted-light">
          Copyright © {year} by Mother Language Lovers of the World Society | All rights reserved
        </p>
      </div>
    </footer>
  );
}
