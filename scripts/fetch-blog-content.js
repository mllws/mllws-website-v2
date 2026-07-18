#!/usr/bin/env node
/**
 * Pulls blog post MDX files from the private mllws-blog repo into
 * content/blog/ at build time. The private repo's content is never
 * committed into this (public) repo.
 *
 * Requires BLOG_CONTENT_TOKEN - a fine-grained GitHub PAT scoped to
 * read-only "Contents" access on mllws/mllws-blog. Set it as an
 * environment variable locally (.env.local, not committed) and as a
 * Vercel/CI environment variable in production.
 *
 * If the token isn't set, this script skips silently so `npm run dev`
 * / `npm run build` still work for anyone without blog access - the
 * blog routes will just render an empty list.
 */

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const REPO = "mllws/mllws-blog";
const TARGET_DIR = path.join(process.cwd(), "content", "blog");
const TOKEN = process.env.BLOG_CONTENT_TOKEN;

if (!TOKEN) {
  console.log(
    "[fetch-blog-content] BLOG_CONTENT_TOKEN not set - skipping blog content fetch."
  );
  process.exit(0);
}

const tmpDir = fs.mkdtempSync(path.join(require("node:os").tmpdir(), "mllws-blog-"));

try {
  console.log(`[fetch-blog-content] Cloning ${REPO}...`);
  execSync(
    `git clone --depth 1 https://x-access-token:${TOKEN}@github.com/${REPO}.git "${tmpDir}"`,
    { stdio: "inherit" }
  );

  fs.rmSync(TARGET_DIR, { recursive: true, force: true });
  fs.mkdirSync(TARGET_DIR, { recursive: true });
  fs.cpSync(path.join(tmpDir, "content", "posts"), TARGET_DIR, {
    recursive: true,
  });

  console.log(`[fetch-blog-content] Copied posts into ${TARGET_DIR}`);
} catch (err) {
  console.error("[fetch-blog-content] Failed to fetch blog content:", err.message);
  // Don't fail the whole build over this - fall back to whatever's
  // already in content/blog (or an empty blog) rather than blocking deploys.
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
