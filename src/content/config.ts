import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    author: z.string().optional(),
    layout: z.string().optional(),
    // Add other fields if necessary
  }),
});

export const collections = {
  'blog': blogCollection,
};
