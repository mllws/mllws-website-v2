import { createClient } from "@sanity/client";

// Public project ID (also in the Studio bundle). Override with
// NEXT_PUBLIC_SANITY_PROJECT_ID on Vercel if the project changes.
const DEFAULT_PROJECT_ID = "x3sfyxpc";

export function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || DEFAULT_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  if (!projectId) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion: "2025-01-01",
    useCdn: true,
    perspective: "published",
  });
}
