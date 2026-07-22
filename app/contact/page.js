import PageBanner from "@/components/PageBanner";
import { contactInfo } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Mother Language Lovers of the World Society — membership, volunteering, and partnership inquiries.",
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
      <PageBanner title="Contact us" crumb="Contact" eyebrow="Reach Us" />

      <section className="mx-auto max-w-3xl px-6 py-14 sm:px-12">
        <h2 className="font-display text-2xl font-extrabold text-foreground">Contact information</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Reach out about membership, volunteering, partnerships, or International Mother Language
          Day.
        </p>

        <dl className="mt-8 divide-y divide-border-muted overflow-hidden rounded-[22px] border border-border-muted bg-white">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[140px_1fr] sm:gap-4"
            >
              <dt className="font-semibold text-foreground">{row.label}</dt>
              <dd className="text-[#4a4438]">{row.value}</dd>
            </div>
          ))}
          {contactInfo.social.map((s) => (
            <div
              key={s.label}
              className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[140px_1fr] sm:gap-4"
            >
              <dt className="font-semibold text-foreground">{s.label}</dt>
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
