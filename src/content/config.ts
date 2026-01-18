import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Use the modern glob loader for Astro 5 and include mdoc
  loader: glob({ pattern: '**/[^_]*.{md,mdoc}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date().or(z.string()).optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    slug: z.string().optional(),
  }),
});

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: "./src/content/lessons" }),
  schema: z.object({
    name: z.string(),
    duration: z.string().optional(),
    authors: z.array(z.string()).optional(),
    contributors: z.array(z.string()).optional(),
    content_contributors: z.array(z.string()).optional(),
    status: z.enum(['pre-alpha', 'alpha', 'beta', 'mature']).optional(),
    status_note: z.string().optional(),
    educationalLevel: z.string().optional(),
    abstract: z.string().optional(),
    why_teach: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    learningResourceType: z.string().optional(),
    teaches: z.array(z.string()).optional(),
    url: z.string().url().optional().nullable(),
    repo: z.string().url().optional().nullable(),
    doi: z.string().optional(),
    version: z.string().optional(),
    library_carpentry_adopted: z.boolean().optional(),
    pilots: z.array(
      z.object({
        date: z.date().or(z.string()).optional(), // Date might be string in yaml if not iso
        location: z.string().optional(),
        instructor: z.string().optional(),
        type: z.string().optional(),
        note: z.string().optional(),
      })
    ).optional(),
    recognition: z.array(
      z.object({
        title: z.string().optional(),
        desc: z.string().optional(),
        url: z.string().url().optional(),
      })
    ).optional(),
    prerequisites: z.array(
        z.object({
            name: z.string().optional(),
            url: z.string().url().optional(),
        })
    ).optional(),
    type: z.string().optional(), // For external resources like 'course', 'reference'
  }),
});

export const collections = { blog, lessons };