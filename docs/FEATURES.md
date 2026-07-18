# Current Features to Be Developed

Five features slated for the next build phase of the MLLWS site.

## Event history
A dedicated `/events` archive (12 years of Mother Language Festival, IMLD proclamations, Rafiqul Islam memorial events, Bill S-214 milestones) instead of burying past events on the homepage.

- Suggested shape: `lib/events.js` or an MDX collection at `content/events/*.mdx`, one entry per event with date, location, photo gallery, and recap text.
- Render as a filterable timeline at `/events` plus a detail page per event at `/events/[slug]`.
- Reuses the same MDX pipeline as the blog feature below — worth building both together.

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

## Membership & donation — Zeffy integration
Zeffy is free for nonprofits (no platform, subscription, or transaction fees) and supports donation, membership, and event-ticket forms.

Two integration paths:

- **Embed**: paste Zeffy's embed snippet into a `/donate` and `/membership` page — fastest, but the embedded form only shows transaction fields (no logo/description), so wrap it with your own header/copy in Tailwind.
- **Link-out button**: a styled "Donate" / "Become a Member" button that opens the full Zeffy campaign page — keeps branding fully consistent on-site, sacrifices the inline checkout.

Because this is a donation flow, `/donate` needs its own QA pass (broken embed, mobile layout, no dead links) before every campaign launch — see [`TESTING.md`](./TESTING.md).

## Accessibility testing
Treated as a standing practice rather than a one-time task. Full plan, cadence, and tooling live in [`TESTING.md`](./TESTING.md).
