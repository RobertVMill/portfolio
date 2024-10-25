// app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <time>{post.date}</time>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="prose prose-lg max-w-none">
          {post.content}
        </div>

        <div className="mt-8 pt-8 border-t">
          <h2 className="text-lg font-semibold mb-4">Tags</h2>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}