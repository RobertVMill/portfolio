// app/blog/page.tsx
import Parser from 'rss-parser';
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';

export default async function BlogPage() {
  const parser = new Parser();
  
  // Fetch Medium posts during build or runtime
  const feed = await parser.parseURL('https://medium.com/feed/@robertmill');
  const mediumPosts = feed.items.slice(0, 5);

  // Fetch local posts
  const localPosts = getAllPosts();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Blog & Insights</h1>

        {/* Local Posts Section */}
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Local Posts</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {localPosts.map(post => (
            <div key={post.slug} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                <Link href={`/blog/${post.slug}`} className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
            </div>
          ))}
        </div>

        {/* Medium Posts Section */}
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Medium Posts</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {mediumPosts.map(post => {
            const slug = post.link?.split('-').pop(); // Extract slug from Medium URL, with optional chaining
            return (
              <div key={post.link} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  <Link href={`/blog/${slug}`} className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors">
                    {post.title || 'Untitled'}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{post.contentSnippet}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.pubDate ? new Date(post.pubDate).toLocaleDateString() : 'Unknown date'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
