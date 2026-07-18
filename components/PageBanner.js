import Link from "next/link";

export default function PageBanner({ title, crumb, eyebrow }) {
  return (
    <div className="relative overflow-hidden bg-brand-dark text-white">
      {/* Subtle decorative gradient, purely visual — no content, hidden from AT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/40 via-transparent to-accent/20"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-white/70">
            <li>
              <Link href="/" className="rounded hover:text-white hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">
              {crumb || title}
            </li>
          </ol>
        </nav>
        {eyebrow && <p className="section-eyebrow-inverse max-w-xs">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
