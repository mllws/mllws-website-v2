import PageBanner from "@/components/PageBanner";
import { contactInfo } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description:
    "If you are in the middle of something and you don't want to miss that important call to preserve your mother language that could be the start of an exciting new journey",
};

const rows = [
  {
    label: "Address",
    value: (
      <address className="not-italic">
        {contactInfo.address.map((line, i) => (
          <span key={line}>
            {line}
            {i < contactInfo.address.length - 1 && <br />}
          </span>
        ))}
      </address>
    ),
  },
  {
    label: "Email",
    value: (
      <a
        href={`mailto:${contactInfo.email}`}
        className="rounded text-brand underline underline-offset-2 hover:text-accent"
      >
        {contactInfo.email}
      </a>
    ),
  },
  {
    label: "Phone",
    value: (
      <a
        href={contactInfo.phoneHref}
        className="rounded text-brand underline underline-offset-2 hover:text-accent"
      >
        {contactInfo.phone}
      </a>
    ),
  },
];

export default function ContactPage() {
  return (
    <div>
      <PageBanner title="Contact us" crumb="Contact Us" />

      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-dark">Contact information</h2>
        <p className="mt-3 max-w-2xl text-lg text-gray-700">
          If you are in the middle of something and you don&apos;t want to
          miss that important call that could be the start of an exciting
          new journey.
        </p>

        <dl className="mt-8 divide-y divide-border-muted overflow-hidden rounded-xl border border-border-muted bg-white shadow-sm">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[140px_1fr] sm:gap-4"
            >
              <dt className="font-semibold text-brand-dark">{row.label}</dt>
              <dd className="text-gray-700">{row.value}</dd>
            </div>
          ))}
          {contactInfo.social.map((s) => (
            <div
              key={s.label}
              className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[140px_1fr] sm:gap-4"
            >
              <dt className="font-semibold text-brand-dark">{s.label}</dt>
              <dd>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded text-brand underline underline-offset-2 hover:text-accent"
                >
                  {s.handle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
