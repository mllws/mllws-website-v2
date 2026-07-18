import PageBanner from "@/components/PageBanner";
import { recommendationLetters, gviewUrl } from "@/lib/data";

export const metadata = {
  title: "Recomendation",
  description:
    "Several school boards in British Columbia recognizes the need to assist students being aware of their mother languages and upholding their heritage for future generations; this includes Surrey, Vancouver, Richmond, Langley etc.",
};

export default function RecommendationPage() {
  return (
    <div>
      <PageBanner title="Recomendation" crumb="Recomendation" />

      <p className="mx-auto mt-8 max-w-4xl px-4 text-lg text-gray-700">
        Letters of recognition and support from school boards and community
        partners across British Columbia.
      </p>

      <section className="mx-auto max-w-4xl space-y-10 px-4 py-12">
        {recommendationLetters.map((letter) => (
          <article
            key={letter.title}
            className="overflow-hidden rounded-xl border border-border-muted shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-muted bg-surface-muted px-5 py-4">
              <h2 className="text-lg font-bold text-brand-dark">{letter.title}</h2>
              <a
                href={letter.pdf}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-md border border-brand px-3 py-1.5 text-sm font-medium text-brand transition hover:bg-brand hover:text-white"
              >
                Open PDF in new tab
              </a>
            </div>
            {/* Embedded viewer is a visual convenience; the link above is
                the reliable, screen-reader- and keyboard-friendly path to
                the same document. */}
            <iframe
              title={letter.title}
              src={gviewUrl(letter.pdf)}
              className="h-[500px] w-full"
            />
          </article>
        ))}
      </section>
    </div>
  );
}
