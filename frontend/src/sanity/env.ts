/**
 * Sanity connection settings, read from .env.local (see .env.example).
 *
 * Both are public on purpose: the project ID and dataset only say *where* the
 * content lives, and the blog reads a public dataset with no token.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-09-01";

/** False until a project ID is set; the blog then shows sample posts. */
export const sanityConfigured = /^[a-z0-9-]+$/.test(projectId);
