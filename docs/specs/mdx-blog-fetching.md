# Superseded: MDX blog content fetching

This spec described cloning private `mllws-blog` MDX at build time.

**It is superseded.** Content is edited in Sanity Studio (`mllws-sanity`).
The public site reads published documents via GROQ (`lib/cms.js`). There is
no MDX and no `BLOG_CONTENT_TOKEN`.

See `docs/specs/sanity-cms.md`, `docs/FEATURES.md`, and
`.cursor/rules/content-and-data.mdc`.
