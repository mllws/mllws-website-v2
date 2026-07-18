import Image from "next/image";

export default function PersonCard({ name, title, photo, email }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border-muted bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="aspect-square w-full overflow-hidden bg-surface-muted">
        <Image
          src={photo}
          alt={`Portrait of ${name}`}
          width={300}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <p className="font-semibold text-brand-dark">{name}</p>
        <p className="mt-1 text-sm text-gray-600">{title}</p>
        {email && (
          <a
            href={`mailto:${email}`}
            className="mt-2 inline-block rounded text-xs text-brand underline decoration-transparent underline-offset-2 transition hover:text-accent hover:decoration-current"
          >
            {email}
          </a>
        )}
      </div>
    </article>
  );
}
