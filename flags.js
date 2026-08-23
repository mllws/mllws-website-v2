import { flag } from "flags/next";
import { edgeConfigAdapter } from "@flags-sdk/edge-config";

/**
 * Feature flags (see lib/feature-flags-context.js and app/layout.js).
 *
 * With EDGE_CONFIG set (Vercel / `vercel env pull`), values come from Edge
 * Config item `flags`:
 *   {
 *     "flags": {
 *       "language-hover": true,
 *       "become-a-member": true,
 *       "donate": true,
 *       "volunteer": true,
 *       "hear-it-in-your-language": true
 *     }
 *   }
 *
 * Without EDGE_CONFIG (typical local until env is pulled), each flag falls
 * back to its env name = true|false, then false.
 */
function defineFlag(key, description, envName) {
  return flag({
    key,
    description,
    defaultValue: false,
    ...(process.env.EDGE_CONFIG
      ? { adapter: edgeConfigAdapter }
      : {
          decide: () => process.env[envName] === "true",
        }),
  });
}

export const languageHoverFlag = defineFlag(
  "language-hover",
  "Animated hover-translation effect on buttons/links across the site",
  "LANGUAGE_HOVER"
);

export const becomeAMemberFlag = defineFlag(
  "become-a-member",
  "Use the live membership signup URL when ZEFFY_MEMBERSHIP_URL is set",
  "BECOME_A_MEMBER"
);

export const donateFlag = defineFlag(
  "donate",
  "Use the live donation URL when ZEFFY_DONATE_URL is set",
  "DONATE"
);

export const volunteerFlag = defineFlag(
  "volunteer",
  "Use the live volunteer signup URL when ZEFFY_VOLUNTEER_URL is set",
  "VOLUNTEER"
);

export const hearItInYourLanguageFlag = defineFlag(
  "hear-it-in-your-language",
  "Play real greeting audio in the Hear it in your language homepage section",
  "HEAR_IT_IN_YOUR_LANGUAGE"
);
