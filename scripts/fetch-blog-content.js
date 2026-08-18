#!/usr/bin/env node
/**
 * Pulls content from the private mllws-blog repo into local content/
 * directories at build time. The private repo's content is never
 * committed into this (public) repo.
 *
 * Copied directories:
 *   content/posts/     → content/blog/
 *   content/events/    → content/events/
 *   content/stories/   → content/stories/
 *   content/galleries/ → content/galleries/
 *
 * Requires BLOG_CONTENT_TOKEN - a fine-grained GitHub PAT scoped to
 * read-only "Contents" access on mllws/mllws-blog. Set it as an
 * environment variable locally (.env.local, not committed) and as a
 * Vercel/CI environment variable in production.
 *
 * If the token isn't set, this script skips silently so `npm run dev`
 * / `npm run build` still work for anyone without blog access - the
 * content routes will just render empty lists.
 */

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const REPO = "mllws/mllws-blog";

const CONTENT_MAPPINGS = [
  { src: "content/posts", dest: "content/blog" },
  { src: "content/events", dest: "content/events" },
  { src: "content/stories", dest: "content/stories" },
  { src: "content/galleries", dest: "content/galleries" },
];

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function ensureAllTargetDirs() {
  for (const { dest } of CONTENT_MAPPINGS) {
    ensureDir(path.join(process.cwd(), dest));
  }
}

loadEnvLocal();

const TOKEN = process.env.BLOG_CONTENT_TOKEN;

if (!TOKEN) {
  console.log(
    "[fetch-content] BLOG_CONTENT_TOKEN not set - skipping content fetch."
  );
  ensureAllTargetDirs();
  process.exit(0);
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "mllws-blog-"));

try {
  console.log(`[fetch-content] Cloning ${REPO}...`);
  // Fine-grained PATs often 403 with x-access-token. oauth2:TOKEN is the
  // HTTPS username GitHub accepts for user PATs (classic and fine-grained).
  execSync(
    `git clone --depth 1 https://oauth2:${TOKEN}@github.com/${REPO}.git "${tmpDir}"`,
    {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
    }
  );

  let copied = 0;

  for (const { src, dest } of CONTENT_MAPPINGS) {
    const srcDir = path.join(tmpDir, src);
    const destDir = path.join(process.cwd(), dest);

    if (!fs.existsSync(srcDir) || !fs.statSync(srcDir).isDirectory()) {
      console.log(`[fetch-content] No ${src}/ in mllws-blog — skipping.`);
      ensureDir(destDir);
      continue;
    }

    const stagingDir = fs.mkdtempSync(
      path.join(os.tmpdir(), `mllws-staging-${path.basename(dest)}-`)
    );
    try {
      fs.cpSync(srcDir, stagingDir, { recursive: true });
      fs.rmSync(destDir, { recursive: true, force: true });
      ensureDir(path.dirname(destDir));
      fs.cpSync(stagingDir, destDir, { recursive: true });
      copied++;
      console.log(`[fetch-content] Copied ${src}/ → ${dest}/`);
    } finally {
      fs.rmSync(stagingDir, { recursive: true, force: true });
    }
  }

  if (copied === 0) {
    console.log("[fetch-content] No content directories found in mllws-blog.");
  }

  ensureAllTargetDirs();
} catch (err) {
  const message = String(err.message || err).replaceAll(TOKEN, "[redacted]");
  console.error("[fetch-content] Failed to fetch content:", message);
  ensureAllTargetDirs();
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
