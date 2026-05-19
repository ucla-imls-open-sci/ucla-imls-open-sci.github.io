import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { slugify } from '../../utils/slugs';

export const GET: APIRoute = async () => {
  const lessons = await getCollection('lessons');
  const siteUrl = 'https://ucla-imls-open-sci.info';

  const catalog = lessons
    .sort((a, b) => a.data.name.localeCompare(b.data.name))
    .map((l) => ({
      name: l.data.name,
      url: `${siteUrl}/lessons/${slugify(l.data.name)}`,
      externalUrl: l.data.url ?? null,
      repo: l.data.repo ?? null,
      abstract: l.data.abstract ?? null,
      status: l.data.status ?? null,
      educationalLevel: l.data.educationalLevel ?? null,
      keywords: l.data.keywords ?? [],
      teaches: l.data.teaches ?? [],
      authors: l.data.authors ?? [],
      learningResourceType: l.data.learningResourceType ?? null,
      doi: l.data.doi ?? null,
      library_carpentry_adopted: l.data.library_carpentry_adopted ?? false,
      pilotCount: l.data.pilots?.length ?? 0,
      type: l.data.type ?? 'lesson',
    }));

  return new Response(JSON.stringify({ lessons: catalog }, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
