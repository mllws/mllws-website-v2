import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const TYPE_TAGS = {
  post: "cms-posts",
  event: "cms-events",
  story: "cms-stories",
  gallery: "cms-galleries",
};

const TYPE_PATHS = {
  post: (slug) => ["/", "/blog", slug ? `/blog/${slug}` : null],
  event: (slug) => ["/", "/events", slug ? `/events/${slug}` : null],
  story: (slug) => ["/", "/stories", slug ? `/stories/${slug}` : null],
  gallery: (slug) => ["/", "/gallery", slug ? `/gallery/${slug}` : null],
};

function authorized(request, body) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false;
  const fromQuery = request.nextUrl.searchParams.get("secret");
  const header = request.headers.get("authorization");
  const bearer = header?.startsWith("Bearer ") ? header.slice(7) : "";
  return fromQuery === secret || bearer === secret || body?.secret === secret;
}

function slugOf(body) {
  if (typeof body?.slug === "string") return body.slug;
  if (body?.slug?.current) return body.slug.current;
  return "";
}

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  if (!authorized(request, body)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = typeof body._type === "string" ? body._type : "";
  const slug = slugOf(body);

  const tags = new Set();
  const paths = new Set();

  if (Array.isArray(body.tags)) {
    for (const tag of body.tags) {
      if (typeof tag === "string" && tag) tags.add(tag);
    }
  } else if (typeof body.tag === "string" && body.tag) {
    tags.add(body.tag);
  }

  if (Array.isArray(body.paths)) {
    for (const path of body.paths) {
      if (typeof path === "string" && path.startsWith("/")) paths.add(path);
    }
  }

  const typeTag = TYPE_TAGS[type];
  if (typeTag) {
    tags.add(typeTag);
    if (slug) tags.add(`${typeTag}-${slug}`);
    for (const path of TYPE_PATHS[type](slug)) {
      if (path) paths.add(path);
    }
  }

  if (tags.size === 0 && paths.size === 0) {
    tags.add("cms-posts");
    tags.add("cms-events");
    tags.add("cms-stories");
    tags.add("cms-galleries");
    paths.add("/");
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    tags: [...tags],
    paths: [...paths],
  });
}
