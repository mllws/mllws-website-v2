# Current Features to Be Developed

Features slated for the next build phase of the MLLWS site.

## Content architecture

Editors use Sanity Studio in `mllws-sanity`. Drafts stay in Content Lake.
This site reads **published** documents with GROQ (`lib/cms.js`), caches
them (`force-static` + `revalidateTag`), and never queries drafts or Neon.

New images upload in Studio (Sanity CDN). Historical
`motherlanguagelovers.com` URLs still work via `coverImageUrl` / gallery
`src`.

Website env: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
and `REVALIDATE_SECRET` (Sanity webhook → `POST /api/revalidate`). Missing
project ID must render empty lists, not crash the build.

Archive `mllws-blog`, Tina (`mllws-cms`), and Payload after this cutover is
proven on the live site.

## Event history (#13)
Done — `/events` and `/events/[slug]` read published Sanity events via `lib/events.js`.

## Chatbot
Two tiers depending on ambition:

- **Simple / fast to ship**: a support widget (Crisp, Tawk.to, or Chatbase) embedded as a script in `layout.js`, answering FAQs about IMLD, membership, and events. No backend work required.
- **Custom**: a small `/api/chat` route calling the Claude or OpenAI API, grounded on site content (mission, FAQ, event info) via a system prompt or lightweight RAG over published snapshots. More work, but on-brand, and can eventually answer questions in multiple languages — fitting for a multilingual-heritage nonprofit.

## Blog, stories, galleries

Done — `/blog`, `/stories`, `/gallery` and their `[slug]` pages read published
Sanity documents. Editors publish from `mllws-sanity`.

## Membership & donation — Zeffy integration
Zeffy is free for nonprofits (no platform, subscription, or transaction fees) and supports donation, membership, and event-ticket forms.

Two integration paths:

- **Embed**: paste Zeffy's embed snippet into a `/donate` and `/membership` page — fastest, but the embedded form only shows transaction fields (no logo/description), so wrap it with your own header/copy in Tailwind.
- **Link-out button**: a styled "Donate" / "Become a Member" button that opens the full Zeffy campaign page — keeps branding fully consistent on-site, sacrifices the inline checkout.

Because this is a donation flow, `/donate` needs its own QA pass (broken embed, mobile layout, no dead links) before every campaign launch — see [`TESTING.md`](./TESTING.md).

## Accessibility testing
Treated as a standing practice rather than a one-time task. Full plan, cadence, and tooling live in [`TESTING.md`](./TESTING.md).
