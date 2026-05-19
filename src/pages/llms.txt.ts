import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { slugify } from '../utils/slugs';

export const GET: APIRoute = async () => {
  const lessons = await getCollection('lessons');
  const siteUrl = 'https://ucla-imls-open-sci.info';

  const header = `# UCLA IMLS Open Science Lesson Catalog
# ${siteUrl}
# An openly licensed library of open science curriculum for librarians and researchers.
# Generated at build time. Full catalog: ${siteUrl}/api/lessons.json

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
