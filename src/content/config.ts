import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Use the modern glob loader for Astro 5
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { blog };