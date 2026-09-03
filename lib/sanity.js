import { createClient } from "@sanity/client";

export function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
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
