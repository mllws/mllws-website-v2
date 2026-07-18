import Image from "next/image";

export default function PersonCard({ name, title, photo, email }) {
  return (
    <article className="group text-left">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface-muted grayscale-[15%] transition group-hover:grayscale-0">
        <Image
          src={photo}
          alt={`Portrait of ${name}`}
          width={340}
          height={425}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 border-t border-border-muted pt-3">
        <p
          className="text-lg font-bold text-brand-dark"
          style={{ fontFamily: "var(--font-display-family)" }}
        >
          {name}
        </p>
        <p className="mt-0.5 text-sm text-gray-600">{title}</p>
        {email && (
          <a
            href={`mailto:${email}`}
            className="mt-1.5 inline-block rounded text-xs text-brand underline decoration-transparent underline-offset-2 transition hover:text-accent hover:decoration-current"
          >
            {email}
          </a>
        )}
      </div>
    </article>
  );
}
