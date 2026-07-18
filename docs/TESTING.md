# Testing Strategy

What kind of testing the MLLWS site needs, why, how often, and which tools to use for each.

## Test types

| Type | Why it matters here | Cadence |
|---|---|---|
| **Accessibility (a11y)** | Nonprofit, government-facing, Canadian org — WCAG 2.1/2.2 AA is the de facto legal baseline under the *Accessible Canada Act* and BC's *Accessible British Columbia Act*. Also just the right thing for an org whose mission is inclusion. | Every PR (automated) + full manual pass quarterly |
| **Functional / E2E** | Nav, dropdown menu, donation flow, contact form, event RSVP must not silently break. | On every deploy (CI) |
| **Component/unit** | Header dropdown state, carousel logic, MDX rendering. | On every PR (CI) |
| **Visual regression** | Catch unintended layout shifts from Tailwind/content changes across pages. | On every PR or weekly |
| **Cross-browser & responsive** | Older donors/volunteers may use Safari/older Android; site must work down to small phones. | Before each release |
| **Performance** | Image-heavy homepage (carousel, sponsor logos, event photos) — slow load loses casual visitors. | Weekly / before release |
| **SEO / metadata** | Traffic-growth goals depend on this being correct (titles, OG tags, sitemap, structured data for events). | Before release + monthly audit |
| **Security** | Donation/membership pages, contact form, any custom `/api` routes (chatbot) are the actual attack surface. | Before release + dependency scanning ongoing |
| **Usability** | Real users (older/less technical donors, teachers, students) navigating donation and event pages. | Periodic, ~2x/year |

## Tools & guidelines by type

### Accessibility
- Guideline: **WCAG 2.1 AA** (2.2 AA to be ahead of the curve) — the standard referenced by the Accessible Canada Act and most provincial accessibility laws.
- Automated: [`axe-core`](https://github.com/dequelabs/axe-core) / `@axe-core/react` (catches roughly 30–50% of issues, zero false positives), [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) in GitHub Actions, [Pa11y CI](https://github.com/pa11y/pa11y-ci) for scripted page-by-page audits.
- Browser extensions for manual spot checks: **axe DevTools** or **WAVE** (webaim.org/extension).
- Manual/assistive tech: keyboard-only navigation pass, **NVDA** (Windows, free) or **VoiceOver** (Mac/iOS, built-in) screen-reader walkthroughs of the nav, donation form, and event pages — automated tools alone catch maybe half of real issues.
- Color contrast: **WebAIM Contrast Checker**.

### Functional / E2E
- **Playwright** — recommended over Cypress for a Next.js App Router site with better multi-tab/iframe support, which matters here since the site embeds Google Docs viewers and Zeffy/Facebook iframes.
- Run against a deployed preview (e.g. Vercel preview URLs) in CI on every PR.

### Unit / component
- **Vitest** + **React Testing Library** for Header dropdown/mobile menu logic, HeroCarousel state, and MDX frontmatter parsing.

### Visual regression
- **Chromatic** (if Storybook is adopted) or **Playwright's built-in screenshot comparison** — lighter-weight if Storybook overhead isn't wanted.

### Performance
- **Lighthouse** (Chrome DevTools or CLI) for Core Web Vitals (LCP/CLS/INP) — the hero carousel and unoptimized sponsor logos are the likely culprits; make sure every image routes through `next/image`.
- **WebPageTest.org** for real-world network condition testing.
- **Vercel Analytics / Speed Insights** if hosted on Vercel, for ongoing real-user monitoring.

### SEO
- **Google Search Console** (indexing, sitemap health) + **Google Rich Results Test** for event structured data.
- **Ahrefs/Ubersuggest free tier** or **Google Keyword Planner** for validating the content ideas in [`FUTURE_ENHANCEMENTS.md`](./FUTURE_ENHANCEMENTS.md) (mother-language and IMLD-related search volume).

### Security
- `npm audit` / **Dependabot** (GitHub) or **Snyk** for dependency scanning — especially relevant once the chatbot API route and Zeffy embeds ([`FEATURES.md`](./FEATURES.md)) are added.
- Basic checks: HTTPS enforced, CSP headers configured (matters more once third-party iframes are embedded — Zeffy, Google Docs viewer, YouTube, Facebook), form inputs sanitized if a server-side handler is added (e.g. a volunteer sign-up form).

### Usability
- Lightweight: a 5-user moderated test with **Maze**, or even a video call plus a short task list ("find how to donate," "find this year's festival date") — doesn't need to be expensive to be useful.

## Tying it together in CI
A practical setup for a small nonprofit team: GitHub Actions running `next build` + Playwright E2E + Lighthouse CI + Pa11y CI on every pull request, with a full manual accessibility and usability pass before the big pushes each year (IMLD in February, the Festival in August).
