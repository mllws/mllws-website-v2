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
const os = require("node:os");
const path = require("node:path");

const REPO = "mllws/mllws-blog";
const TARGET_DIR = path.join(process.cwd(), "content", "blog");

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

function ensureTargetDir() {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

loadEnvLocal();

const TOKEN = process.env.BLOG_CONTENT_TOKEN;

if (!TOKEN) {
  console.log(
    "[fetch-blog-content] BLOG_CONTENT_TOKEN not set - skipping blog content fetch."
  );
  ensureTargetDir();
  process.exit(0);
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "mllws-blog-"));

try {
  console.log(`[fetch-blog-content] Cloning ${REPO}...`);
  execSync(
    `git clone --depth 1 https://x-access-token:${TOKEN}@github.com/${REPO}.git "${tmpDir}"`,
    {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
    }
  );

  const postsDir = path.join(tmpDir, "content", "posts");
  if (!fs.existsSync(postsDir) || !fs.statSync(postsDir).isDirectory()) {
    console.error("[fetch-blog-content] mllws-blog repo has no content/posts directory");
    ensureTargetDir();
    process.exit(0);
  }

  const stagingDir = fs.mkdtempSync(path.join(os.tmpdir(), "mllws-blog-staging-"));
  try {
    fs.cpSync(postsDir, stagingDir, { recursive: true });
    fs.rmSync(TARGET_DIR, { recursive: true, force: true });
    fs.mkdirSync(path.dirname(TARGET_DIR), { recursive: true });
    fs.cpSync(stagingDir, TARGET_DIR, { recursive: true });
  } finally {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }

  console.log(`[fetch-blog-content] Copied posts into ${TARGET_DIR}`);
} catch (err) {
  const message = String(err.message || err).replaceAll(TOKEN, "[redacted]");
  console.error("[fetch-blog-content] Failed to fetch blog content:", message);
  ensureTargetDir();
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
