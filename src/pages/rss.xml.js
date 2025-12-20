import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../site_config';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || '', // Ensure you have description in frontmatter or derive it
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>${siteConfig.locale}</language>`,
  });
}
