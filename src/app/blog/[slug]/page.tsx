// app/blog/[slug]/page.tsx
import Parser from 'rss-parser';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface MediumPost {
  title: string | undefined;
  content: string;
  pubDate: string | undefined;
}

async function getPostBySlug(slug: string): Promise<MediumPost | null> {
  const parser = new Parser();
  const feed = await parser.parseURL('https://medium.com/feed/@robertmill');

  // Find the post by its slug
  const post = feed.items.find(item => item.link?.includes(slug));
  
  if (!post) {
    return null;
  }

  return {
    title: post.title || 'Untitled',
    content: post['content:encoded'] || post.contentSnippet || '', // Ensure we get the full HTML content
    pubDate: post.pubDate || 'Unknown date',
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-4">
        {/* Post Title */}
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{post.title}</h1>

        {/* Post Date */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          {post.pubDate ? new Date(post.pubDate).toLocaleDateString() : 'Unknown date'}
        </div>

        {/* Post Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Back to Blog Button */}
        <div className="mt-16">
          <Link href="/blog" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
