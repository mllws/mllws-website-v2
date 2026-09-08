# Sanity CMS cutover

Replace Payload (`mllws-payload` + Neon + Blob snapshots) with Sanity as the
editor and content store. The public site stays Next.js 16 / Tailwind / plain
JavaScript in `mllws-website-v2`.

## Why

- No Neon and no extra Vercel app for the CMS.
- Studio can be hosted by Sanity (`*.sanity.studio`) on the Free plan.
- The Payload GitHub repo is private, which blocks Vercel Hobby. Sanity does
  not need that deploy.

## Target architecture

```
Editors  →  mllws-sanity Studio (localhost:3333 or *.sanity.studio)
              drafts + published docs in Content Lake
              new images on Sanity’s image CDN

Website  →  Next.js static pages (force-static)
              GROQ via @sanity/client (published perspective)
              webhook POST /api/revalidate on publish
              never query drafts on the public site
```

Do **not** query Sanity on every visitor request. Cache listings and pages
(`force-static` + `revalidateTag`). A publish webhook busts the cache.
That keeps Free-plan API CDN usage low.

Keep `coverImageUrl` / gallery `src` for existing motherlanguagelovers.com
assets. New uploads use Sanity `image`.

Do **not** add `.ts`/`.tsx` to the website. Sanity client and Portable Text
rendering stay in `.js`. Studio TypeScript lives only in `mllws-sanity`.

## Repos

| Repo | Role |
|---|---|
| `mllws-sanity` | Studio + schema (this work) |
| `mllws-website-v2` | Public site |
| `mllws-payload` | Freeze; do not deploy. Archive after cutover. |
| `mllws-cms` / `mllws-blog` | Already being retired; archive after cutover. |

## Phases

### 0. Repo (done)

Studio scaffold in `mllws-sanity` with `post`, `event`, `story`, `gallery`
schemas.

### 1. Sanity project (you)

Create **MLLWS CMS** at https://www.sanity.io/manage, dataset `production`,
put the project id in Studio `.env` and website `.env.local`. Hosted Studio
(`npm run deploy`) can wait until the site is proven locally.

### 2. Import content (done)

`mllws-sanity`: `npm run migrate:mdx` reads sibling `mllws-blog/content`.
Markdown → Portable Text. Slugs unchanged. Historical image URLs kept.

### 3. Website read path (done)

In `mllws-website-v2` (JavaScript only):

1. `@sanity/client` + `@portabletext/to-html` (HTML for existing `CmsHtml`).
2. Env: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`.
   No write token on the website. Read token only if preview is added later.
3. `lib/cms.js` GROQ helpers return the same shapes `lib/posts.js`,
   `events.js`, `stories.js`, `galleries.js` already expect.
4. `generateStaticParams` from GROQ slug lists; pages are `force-static`.
5. `POST /api/revalidate?secret=` maps Sanity `_type` / slug to
   `revalidateTag` (`cms-posts`, etc.).
6. Next image config allows `cdn.sanity.io`.

Webhook in Manage: URL `https://<site>/api/revalidate?secret=<REVALIDATE_SECRET>`,
projection `{_type, "slug": slug.current}`, trigger on create/update/delete
for `post`, `event`, `story`, `gallery`.

### 4. Verify

- Home Up Next, stories, gallery.
- `/blog`, `/events`, `/stories`, `/gallery` and one slug each.
- Publish from Studio → website updates without a full rebuild.
- Drafts not visible on the public site.

### 5. Cut over

- Point editors at `*.sanity.studio`.
- Leave Tina and Payload projects in place until this is proven.
- Then archive `mllws-cms`, `mllws-blog`, and `mllws-payload`.

## Out of scope for first cut

- Visual Editing / Presentation (can add after listings work).
- Embedding Studio inside the Next.js app.
- Neon, Vercel Blob snapshots, Payload deploy.
- TypeScript on the public website.
