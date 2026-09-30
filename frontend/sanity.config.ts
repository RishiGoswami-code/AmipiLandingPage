"use client";

/**
 * Sanity Studio, mounted inside the site at /studio (src/app/studio). Editors
 * sign in with their Sanity account there to write Journal posts.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "amipi",
  title: "AMIPI Journal",
  basePath: "/studio",
  projectId: projectId || "missing-project-id",
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool()],
  document: {
    // Only blog posts exist; don't offer to create anything else.
    newDocumentOptions: (prev) => prev.filter((t) => t.templateId === "post"),
  },
  api: { apiVersion },
});
