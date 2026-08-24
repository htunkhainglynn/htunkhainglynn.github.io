import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { publishedPosts } from '../utils/content';
import { siteData } from '../data/site';

export async function GET(context: { site: URL }) {
  const posts = publishedPosts(await getCollection('blog'));
  const siteWithBase = new URL(import.meta.env.BASE_URL, context.site);
  return rss({
    title: `${siteData.name}'s technical notes`,
    description: siteData.description,
    site: siteWithBase,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedDate,
      link: `blog/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
