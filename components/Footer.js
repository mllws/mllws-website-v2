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
    <footer className="mt-16 bg-brand-dark text-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Mother Language Lovers of the World Society
          </h2>
          <p className="mt-1 text-sm uppercase tracking-widest text-white">
            Our language is our identity
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-6">
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

        <div className="mt-10 grid gap-10 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <h3 className="text-lg font-semibold text-white">About Us</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              A non-profit organization bringing together various linguistic
              and cultural origins to celebrate heritage and enrich
              multiculturalism and intercultural harmony — and the home of
              International Mother Language Day (Feb 21).
            </p>
          </div>

          <nav aria-label="Footer" className="sm:col-span-1">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded text-gray-300 underline decoration-transparent underline-offset-2 transition hover:text-white hover:decoration-current"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-1">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="rounded underline decoration-transparent underline-offset-2 transition hover:text-white hover:decoration-current"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.phoneHref}
                  className="rounded underline decoration-transparent underline-offset-2 transition hover:text-white hover:decoration-current"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>{contactInfo.address.join(", ")}</li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs leading-relaxed text-gray-400">
          Mother Language Lovers of the World Society (MLLWS) acknowledges
          that it is situated on the unceded traditional territories of the
          xʷməθkʷəy̓əm (Musqueam Indian Band), Sḵwx̱wú7mesh (Squamish
          Nation), and səlilwətaɬ (Tsleil-Waututh Nation).
        </p>

        <p className="mt-4 text-center text-xs text-gray-500">
          Copyright © {year} by Mother Language Lovers of the World Society |
          All rights reserved
        </p>
      </div>
    </footer>
  );
}
