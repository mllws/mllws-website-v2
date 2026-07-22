import { flag } from "flags/next";
import { edgeConfigAdapter } from "@flags-sdk/edge-config";

/**
 * Feature tag for the experimental "language hover" effect: on hover,
 * button and link labels animate into a random translation of their English
 * text, then roll back on leave (see components/LanguageHover.js).
 *
 * With EDGE_CONFIG set (Vercel / `vercel env pull`), value comes from Edge
 * Config item `flags` → key `language-hover`:
 *   { "flags": { "language-hover": true } }
 *
 * Without EDGE_CONFIG (typical local until env is pulled), falls back to
 * LANGUAGE_HOVER=true|false, then false.
 */
export const languageHoverFlag = flag({
  key: "language-hover",
  description:
    "Animated hover-translation effect on buttons/links across the site",
  defaultValue: false,
  ...(process.env.EDGE_CONFIG
    ? { adapter: edgeConfigAdapter }
    : {
        decide: () => process.env.LANGUAGE_HOVER === "true",
      }),
});
