import PageBanner from "@/components/PageBanner";

export const metadata = {
  title: "Constitution & By-Laws",
  description:
    "Constitution and By-Laws of the Mother Language Lovers of the World Society",
};

export default function ConstitutionPage() {
  return (
    <div>
      <PageBanner title="Constitution and By-Laws" crumb="Constitution & By-Laws" eyebrow="Governance" />

      <section className="mx-auto max-w-3xl px-6 py-14 sm:px-12">
        <div className="rounded-[22px] border border-border-muted bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Mother Language Lovers of the World Society
          </p>
          <h2 className="font-display mt-2 text-xl font-extrabold text-foreground">
            Amendment in progress
          </h2>
          <p className="mt-3 leading-relaxed text-[#4a4438]">
            A committee has been formed to review and amend the current MLLWS
            Constitution to improve governance and address procedural
            concerns. The amendments are expected to be presented by the
            first week of December 2024.
          </p>
          <p className="mt-3 leading-relaxed text-[#4a4438]">
            The updated Constitution and By-Laws will be published here once
            finalized. For questions in the meantime, see the{" "}
            <a
              href="/contact"
              className="rounded text-brand underline underline-offset-2 hover:text-accent"
            >
              Contact page
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
