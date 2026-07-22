import { flag } from "flags/next";
import { edgeConfigAdapter } from "@flags-sdk/edge-config";

/**
 * Feature tag for the experimental "language hover" effect: on hover,
 * button and link labels animate into a random translation of their English
 * text, then roll back on leave (see components/LanguageHover.js).
 *
 * Value is read from Vercel Edge Config, so it can be flipped on/off from
 * the Vercel dashboard without a redeploy. Falls back to `false` (the
 * effect is off, original Link/button rendering is used) whenever Edge
 * Config isn't configured yet, e.g. in local dev.
 *
 * To turn it on, add this to your project's Edge Config in the Vercel
 * dashboard:
 *   { "flags": { "language-hover": true } }
 */
export const languageHoverFlag = flag({
  key: "language-hover",
  description:
    "Animated hover-translation effect on buttons/links across the site",
  defaultValue: false,
  adapter: edgeConfigAdapter,
});
