# Current Features to Be Developed

Features slated for the next build phase of the MLLWS site.

## Content architecture

All dynamic content (blog posts, events, stories, galleries) lives in the private `mllws/mllws-blog` repo under `content/`. The website repo clones it at build time via `scripts/fetch-blog-content.js` using `BLOG_CONTENT_TOKEN`. A Vercel Deploy Hook rebuilds the site on every push to `mllws-blog` so new content goes live without a manual website deploy (~1–2 min).

Images are **not** stored in Git. Use existing URLs on `motherlanguagelovers.com` for historical photos, and Cloudinary free tier (or similar) for new uploads — the MDX files store only HTTPS URLs.

```
mllws-blog/content/
  posts/        # blog (done — #8, #10)
  events/       # one .mdx per event (#13)
  stories/      # one .mdx per story (#14)
  galleries/    # one .mdx per album (#15)
```

Fetch script extension: #16.

## Event history (#13)
A dedicated `/events` archive (12 years of Mother Language Festival, IMLD proclamations, Rafiqul Islam memorial events, Bill S-214 milestones) instead of burying past events on the homepage.

- Content: `content/events/*.mdx` in `mllws-blog`. Frontmatter: `title`, `date`, `location`, `category`, `tags`, `coverImage`, `mapHref`, `facebookHref`, `cityHref`, `sponsors[]`, `featured`, `draft`.
- Data layer: `lib/events.js` — `getAllEvents`, `getEventBySlug`, `getEventFilters` (same pattern as `lib/posts.js`).
- Pages: filterable timeline at `/events` (update existing page) plus detail page at `/events/[slug]`.
- Remove hardcoded `events`, `eventFilters`, `upcomingEvent` from `lib/data.js`.

## Chatbot
Two tiers depending on ambition:

- **Simple / fast to ship**: a support widget (Crisp, Tawk.to, or Chatbase) embedded as a script in `layout.js`, answering FAQs about IMLD, membership, and events. No backend work required.
- **Custom**: a small `/api/chat` route calling the Claude or OpenAI API, grounded on site content (mission, FAQ, event info) via a system prompt or lightweight RAG over the MDX content. More work, but on-brand, and can eventually answer questions in multiple languages — fitting for a multilingual-heritage nonprofit.

## MDX-friendly blog posts
Using **`next-mdx-remote/rsc`**: posts are content files fed through a shared blog layout (`content/blog/*.mdx` + `app/blog/[slug]/page.js`), which gives a consistent index page, tags, and pagination without duplicating layout in every post. Paired with `gray-matter` for frontmatter (title, date, author, tags, cover image, `draft`).

**Content lives in a separate private repo, not in `mllws-website`.** Draft posts need to stay unpublished until ready, and on a public GitHub repo *every* branch and open pull request is publicly visible — not just `main` — so drafting posts directly in this repo would leak them the moment a PR is opened. Instead:

- Posts live in `mllws/mllws-blog` (private repo), under `content/posts/*.mdx`, with a `draft: true/false` frontmatter flag.
- `scripts/fetch-blog-content.js` runs as a `predev`/`prebuild` npm script, clones `mllws-blog` using a read-only fine-grained PAT (`BLOG_CONTENT_TOKEN` env var), and copies its `content/posts` into `content/blog/` — which is gitignored in `mllws-website`, so fetched content never gets committed into the public repo's history.
- If `BLOG_CONTENT_TOKEN` isn't set (e.g. a contributor without blog access running `npm run dev`), the fetch step skips silently and the blog just renders empty rather than breaking the build.

Setup still needed (requires the repo owner, since it involves a credential): generate a fine-grained GitHub PAT scoped to read-only "Contents" access on `mllws/mllws-blog` only, then add it as `BLOG_CONTENT_TOKEN` in Vercel's project environment variables (and in a local `.env.local`, never committed, for local development).

**Publishing without remembering to redeploy:** keep the build-time fetch. Add a Vercel **Deploy Hook** so a push to `mllws-blog` rebuilds the live site. That is a normal production deploy (about 1–2 minutes), not runtime GitHub fetching.

1. Vercel project → **Settings → Git → Deploy Hooks**. Create a hook named e.g. `blog-content`, branch `main`. Copy the URL. Treat it like a secret (anyone with it can trigger a production deploy).
2. In `mllws/mllws-blog` → **Settings → Webhooks** → Add webhook:
   - Payload URL: the Deploy Hook URL
   - Content type: `application/json`
   - Secret: leave empty (Vercel authenticates via the unique hook URL)
   - Events: **Just the `push` event**
   - Active
3. Confirm `BLOG_CONTENT_TOKEN` is set on Vercel for Production (and Preview if you want posts on preview deploys).

After that: merge or push a published post (`draft: false`) to `main` on `mllws-blog` → GitHub POSTs the hook → Vercel rebuilds → `prebuild` clones posts → `/blog` updates. You do not need to open the website repo. Extra pushes to `mllws-blog` (docs, drafts) will also rebuild; that is fine at low volume.

## Stories MDX data layer (#14)
Move story content (Bill S-214, IMLD origins, partner spotlights, tributes) from hardcoded arrays in `lib/data.js` into `content/stories/*.mdx` in `mllws-blog`. Each story gets a full MDX page.

- Frontmatter: `title`, `date`, `author`, `category` (milestones / origins / recaps / spotlights), `tags`, `excerpt`, `coverImage`, `draft`.
- Data layer: `lib/stories.js` — `getAllStories`, `getStoryBySlug`, `getStoryFilters`.
- Pages: update `/stories` to read from the data layer; add `/stories/[slug]` for full MDX.
- Remove hardcoded `stories`, `storyFilters` from `lib/data.js`.

## Photo gallery / image catalogue (#15)
Album pages at `/gallery` and `/gallery/[slug]` with a responsive image grid. Albums are MDX files that reference externally hosted image URLs.

- Content: `content/galleries/*.mdx` in `mllws-blog`. Frontmatter: `title`, `date`, `event` (linked event slug), `coverImage`, `draft`. Body lists images with `src`, `alt`, `caption`.
- Data layer: `lib/galleries.js` — `getAllGalleries`, `getGalleryBySlug`.
- Pages: `/gallery` album grid, `/gallery/[slug]` image lightbox.
- Optional: homepage gallery strip reads from the latest album.
- Image hosting: keep existing `motherlanguagelovers.com` URLs for history; Cloudinary free tier for new photos. Never commit binaries to Git.

## Extend fetch script (#16)
Update `scripts/fetch-blog-content.js` to copy the full `content/` tree from `mllws-blog` — not just `content/posts/`. Add `content/events/`, `content/stories/`, `content/galleries/` to `.gitignore`. Ensure each target directory exists even if empty. No new env vars needed.

## Build order
1. #16 — extend fetch script (prerequisite for all three)
2. #13 — events MDX + `/events/[slug]`
3. #14 — stories MDX + `/stories/[slug]`
4. #15 — gallery + `/gallery/[slug]`

## Membership & donation — Zeffy integration
Zeffy is free for nonprofits (no platform, subscription, or transaction fees) and supports donation, membership, and event-ticket forms.

Two integration paths:

- **Embed**: paste Zeffy's embed snippet into a `/donate` and `/membership` page — fastest, but the embedded form only shows transaction fields (no logo/description), so wrap it with your own header/copy in Tailwind.
- **Link-out button**: a styled "Donate" / "Become a Member" button that opens the full Zeffy campaign page — keeps branding fully consistent on-site, sacrifices the inline checkout.

Because this is a donation flow, `/donate` needs its own QA pass (broken embed, mobile layout, no dead links) before every campaign launch — see [`TESTING.md`](./TESTING.md).

## Accessibility testing
Treated as a standing practice rather than a one-time task. Full plan, cadence, and tooling live in [`TESTING.md`](./TESTING.md).
