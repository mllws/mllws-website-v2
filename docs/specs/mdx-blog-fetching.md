# Spec: MDX Blog Content Fetching

Implementation spec for pulling blog post content from the private `mllws/mllws-blog`
repo into `mllws-website` at build/dev time, and exposing it as a typed-shape data
layer the rest of the app can read from.

Hand this file to Cursor as the task brief. It assumes the repo state described
in "Already in place" below — don't recreate those files from scratch, extend them.

## Why this exists

`mllws-website` is public. GitHub exposes every branch and open pull request on a
public repo, not just `main` — so draft blog posts can't be authored inside this
repo without leaking them before publish. Instead, posts live in the separate
private repo `mllws/mllws-blog` and get pulled in as a build step. Full rationale
in `docs/FEATURES.md` under "MDX-friendly blog posts."

## Already in place — do not recreate

- `scripts/fetch-blog-content.js` — clones `mllws/mllws-blog` using
  `BLOG_CONTENT_TOKEN` and copies `content/posts/` from the clone into
  `content/blog/` in this repo. Skips silently if the token isn't set.
- `package.json` — `predev` and `prebuild` scripts already call
  `node scripts/fetch-blog-content.js`.
- `.gitignore` — `/content/blog/` is already ignored (fetched content must never
  be committed here).
- `.env.local.example` — documents `BLOG_CONTENT_TOKEN`.
- Sample post already committed in `mllws-blog` at `content/posts/hello-world.mdx`
  with this frontmatter shape (use it as the source of truth for the schema):
  ```yaml
  ---
  title: "Hello, World"
  date: "2026-07-18"
  author: "MLLWS"
  tags: ["announcement"]
  draft: true
  excerpt: "A short description shown on the blog index."
  coverImage: "/blog/hello-world/cover.jpg"
  ---
  ```

## Scope of this task

1. Harden `scripts/fetch-blog-content.js` (it's a first draft — validate it, don't
   assume it's bug-free).
2. Add the missing dependencies for MDX rendering and frontmatter parsing.
3. Build a data-access layer (`lib/posts.js`) that reads the fetched files and
   exposes clean functions the rest of the app (blog index page, blog post page —
   both out of scope, built later) will consume.
4. Make the whole pipeline fail safely: a missing token, an empty content
   directory, or one malformed post must never break `npm run dev` or
   `npm run build` for the whole site.

Out of scope (do not build in this task): the actual `/blog` index page or
`/blog/[slug]` detail page UI/design, RSS feed, pagination UI, comments. This
spec only covers getting validated post data into a shape those pages can later
`import { getAllPosts, getPostBySlug } from "@/lib/posts"` and use.

## Requirements

### 1. Dependencies

Add to `package.json`:
- `gray-matter` — frontmatter parsing
- `next-mdx-remote` — MDX compilation/rendering (use the `next-mdx-remote/rsc`
  entrypoint, since this is an App Router project on React Server Components —
  see `app/layout.js` for confirmation there's no `"use client"` at the root)

This is a plain JavaScript project (see `jsconfig.json`, no `tsconfig.json`) —
write `.js` files, not `.ts`/`.tsx`, consistent with the rest of the codebase
(e.g. `lib/data.js`).

### 2. Harden `scripts/fetch-blog-content.js`

Current behavior to preserve: skip silently with a log line if
`BLOG_CONTENT_TOKEN` is unset; clone to a temp dir; copy `content/posts` into
`content/blog`; clean up the temp dir; never throw in a way that fails the
parent `npm run dev`/`npm run build` command.

Add:
- Validate that `content/posts` actually exists in the freshly-cloned repo
  before copying. If it doesn't, log a clear error ("mllws-blog repo has no
  content/posts directory") and exit 0 (don't fail the build — fall through to
  whatever's already in `content/blog`, or an empty blog).
- Make sure `content/blog` exists as an empty directory even when the fetch is
  skipped or fails, so `lib/posts.js` never has to special-case a missing
  directory.
- Keep using `execSync` + a token-in-URL `git clone --depth 1` — don't switch to
  the GitHub REST API or an SDK; this stays dependency-free and simple.

### 3. `lib/posts.js` — data access layer

Read every `.mdx` file directly under `content/blog/` (flat directory, not
nested — matches `content/posts/*.mdx` in the source repo). For each file:

- Derive `slug` from the filename (`hello-world.mdx` → `hello-world`).
- Parse frontmatter with `gray-matter`.
- Validate required frontmatter fields: `title`, `date`, `author`, `excerpt`.
  If a file is missing a required field, **skip that post and log a warning**
  with the filename — do not throw and do not block the other posts from
  loading.
- Coerce `date` into a `Date` (or keep as ISO string — pick one and be
  consistent; other code will format it for display later).
- Default `draft` to `false` if absent; default `tags` to `[]` if absent.

Expose:

```js
// Returns posts sorted newest-first by date.
// includeDrafts defaults to false; pass true only for local/preview use.
export function getAllPosts({ includeDrafts = false } = {}) { ... }

// Returns a single post (frontmatter + raw MDX body/content) by slug,
// or null if not found, or if found but draft and includeDrafts is false.
export function getPostBySlug(slug, { includeDrafts = false } = {}) { ... }

// Returns the sorted, de-duplicated list of all tags across non-draft posts.
// Used later for a tag filter UI - implement it now since it's cheap given
// getAllPosts() already exists.
export function getAllTags() { ... }
```

`includeDrafts` should read from an environment check by default at the call
site later (e.g. pages pass `includeDrafts: process.env.NODE_ENV !== "production"`)
— `lib/posts.js` itself should stay dumb/pure and just take the boolean; don't
read `process.env` inside this module.

If `content/blog/` is empty or doesn't exist, `getAllPosts()` must return `[]`,
not throw.

### 4. MDX body compilation

`getPostBySlug` should return the raw MDX body string (post-frontmatter) as
`content`, ready to be passed to `next-mdx-remote/rsc`'s `<MDXRemote source={content} />`
by the page component that will consume this later. Don't pre-compile/render
here — keep `lib/posts.js` framework-agnostic where possible, rendering is the
page's job.

## Acceptance criteria

- `npm run dev` and `npm run build` both succeed with `BLOG_CONTENT_TOKEN`
  unset (simulating a contributor without blog access) — no crash, `content/blog/`
  ends up empty, `getAllPosts()` returns `[]`.
- With a valid token and the real `mllws-blog` repo, after `npm run build`,
  `content/blog/hello-world.mdx` exists and `getAllPosts({ includeDrafts: true })`
  returns one post with `slug: "hello-world"`, `draft: true`.
- `getAllPosts()` (drafts excluded) returns `[]` when the only post is the
  draft `hello-world` one — confirms draft filtering works.
- A manually-added `.mdx` file in `content/blog/` missing the `title` field is
  skipped, logged, and does not prevent other valid posts from loading or crash
  the build.
- `getPostBySlug("does-not-exist")` returns `null`, doesn't throw.

## Notes for whoever reviews the PR

- No test framework is set up in this repo yet (see `docs/TESTING.md` for the
  planned strategy) — verify acceptance criteria manually by running the fetch
  script and calling the functions from a scratch script or the Node REPL,
  rather than blocking this task on adding Vitest first.
- Don't add the `/blog` route/page in this PR — that's a follow-up spec once
  this data layer exists.
