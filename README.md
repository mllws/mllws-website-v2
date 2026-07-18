# MLLWS Website Clone

A Next.js (App Router) + Tailwind CSS rebuild of the
[motherlanguagelovers.com](https://www.motherlanguagelovers.com) website —
all 6 pages: Home, About, Our Team, Constitution & By-Laws, Recomendation,
and Contact.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # run the production build
```

## Structure

- `app/` — one route per page (`/`, `/about`, `/team`, `/constitution`,
  `/recommendation`, `/contact`), each a server component.
- `components/` — `Header` (dropdown + mobile nav), `Footer`, `HeroCarousel`
  (client component, auto-rotating), `PageBanner`, `PersonCard`.
- `lib/data.js` — all site content (nav, sponsors, directors, hero slides,
  contact info, PDF links) pulled from the live site, in one place for easy
  editing.

## Notes on fidelity

- All page copy (mission statement, history of IMLD, Bill S-214 writeup,
  director bios, contact details, etc.) was copied verbatim from the live
  site.
- Images and PDFs are referenced directly from
  `www.motherlanguagelovers.com` (hotlinked) rather than downloaded, since
  the build environment used to create this clone couldn't fetch binary
  assets from arbitrary domains. To self-host them, download the files
  referenced in `lib/data.js` into `public/` and swap the URLs.
- The original site's exact CSS/theme wasn't recoverable (only rendered
  page text was accessible), so the visual design — colors, spacing,
  carousel, cards — is a fresh Tailwind implementation matching the same
  structure and content rather than a pixel-for-pixel copy.
- Routes were renamed to be cleaner (`/team` instead of `/Home/directors`,
  `/recommendation` instead of `/Home/recomendation`) — update `lib/data.js`
  `nav` array if you'd rather match the original URLs exactly.
