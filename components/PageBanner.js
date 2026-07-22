import Link from "next/link";

export default function PageBanner({ title, crumb, eyebrow }) {
  return (
    <div className="relative overflow-hidden bg-foreground text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/50 via-transparent to-accent/30"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 py-16 sm:px-12 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-white/70">
            <li>
              <Link href="/" className="rounded text-white/70 no-underline hover:text-white hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">
              {crumb || title}
            </li>
          </ol>
        </nav>
        {eyebrow && (
          <p className="mb-3 text-sm font-bold tracking-wide text-[#f3d9b8]">{eyebrow}</p>
        )}
        <h1 className="font-display max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
