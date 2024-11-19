'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  categories: string[];
  image?: string | null;
  content?: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/medium');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (err) {
        setError('Failed to load articles');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Articles
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Thoughts and insights on AI, technology, and business strategy
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {articles.map((article, index) => (
                <motion.div
                  key={article.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <Link 
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block space-y-4"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {article.title}
                    </h2>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {article.pubDate}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {article.categories.map(category => (
                          <span
                            key={category}
                            className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center pt-8">
            <Link
              href="https://medium.com/@robertmill"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Follow Me on Medium
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
