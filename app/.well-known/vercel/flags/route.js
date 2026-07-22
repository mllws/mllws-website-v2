import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";
import * as flags from "@/flags";

// Lets the Vercel Toolbar's Flags Explorer discover and override the flags
// defined in flags.js during a session, without changing Edge Config.
export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(flags);
});
