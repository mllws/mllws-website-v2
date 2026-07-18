import Link from "next/link";

export default function PageBanner({ title, crumb }) {
  return (
    <div className="bg-brand text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-2">
          <ol className="flex items-center gap-2 text-sm text-white/80">
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
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      </div>
    </div>
  );
}
