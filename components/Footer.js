import Image from "next/image";
import Link from "next/link";
import { sponsors, contactInfo } from "@/lib/data";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Constitution & By-Laws", href: "/constitution" },
  { label: "Recomendation", href: "/recommendation" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-brand-dark text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p
              className="text-2xl font-bold leading-tight text-white"
              style={{ fontFamily: "var(--font-display-family)" }}
            >
              Mother Language Lovers of the World Society
            </p>
            <p className="section-eyebrow-inverse mt-3 max-w-[220px]">
              Our language is our identity
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-300">
              A non-profit organization bringing together various linguistic
              and cultural origins to celebrate heritage and enrich
              multiculturalism and intercultural harmony — and the home of
              International Mother Language Day (Feb 21).
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded text-gray-300 underline decoration-transparent underline-offset-4 transition hover:text-white hover:decoration-current"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-300">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="rounded underline decoration-transparent underline-offset-4 transition hover:text-white hover:decoration-current"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.phoneHref}
                  className="rounded underline decoration-transparent underline-offset-4 transition hover:text-white hover:decoration-current"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>{contactInfo.address.join(", ")}</li>
            </ul>
          </div>
        </div>

        <ul className="mt-14 flex flex-wrap items-center gap-6 border-t border-white/10 pt-10">
          {sponsors.map((s) => (
            <li
              key={s.name}
              className="flex h-16 w-28 items-center justify-center rounded bg-white p-2"
            >
              <Image
                src={s.src}
                alt={s.name}
                width={110}
                height={50}
                className="max-h-12 w-auto object-contain"
              />
            </li>
          ))}
        </ul>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-gray-400">
          Mother Language Lovers of the World Society (MLLWS) acknowledges
          that it is situated on the unceded traditional territories of the
          xʷməθkʷəy̓əm (Musqueam Indian Band), Sḵwx̱wú7mesh (Squamish
          Nation), and səlilwətaɬ (Tsleil-Waututh Nation).
        </p>

        <p className="mt-4 flex flex-col gap-1 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Copyright © {year} by Mother Language Lovers of the World Society
          </span>
          <span>All rights reserved</span>
        </p>
      </div>
    </footer>
  );
}
