import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { slugify } from '../utils/slugs';

export const GET: APIRoute = async () => {
  const lessons = await getCollection('lessons');
  const siteUrl = 'https://ucla-imls-open-sci.info';

  const header = `# UCLA IMLS Open Science

> Openly licensed open science curriculum for librarians and researchers, developed through an IMLS grant at UCLA. Lessons cover data management, qualitative research, containers, reproducibility, and more. All lessons are free to teach and adapt under CC BY 4.0.

## API

- [Lesson Catalog JSON](${siteUrl}/api/lessons.json): Full machine-readable catalog of all lessons. Includes name, status, authors with ORCIDs, keywords, pilot count, GitHub repository health signals, and DOIs where available. CORS-open.

## Lessons

`;

  const lines = lessons
    .filter((l) => l.data.type !== 'external')
    .sort((a, b) => a.data.name.localeCompare(b.data.name))
    .map((l) => {
      const url = `${siteUrl}/lessons/${slugify(l.data.name)}`;
      const desc = l.data.abstract
        ? l.data.abstract.replace(/\n/g, ' ').trim().slice(0, 200)
        : `Open science lesson: ${l.data.name}`;
      return `- [${l.data.name}](${url}): ${desc}`;
    })
    .join('\n');

  return new Response(header + lines + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
