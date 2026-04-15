import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const api = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/api" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    menu: z.any().optional(),
  }),
});

const legacy = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/legacy" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const manual = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/manual" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { api, legacy, manual };
