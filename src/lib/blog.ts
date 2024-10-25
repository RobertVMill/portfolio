// src/lib/blog.ts
export interface BlogPost {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    readingTime: string;
    content: string;
    tags: string[];
  }
  
  export const blogPosts: BlogPost[] = [
    {
      title: "Fintech Trends in 2024",
      slug: "fintech-trends-2024",
      excerpt: "Exploring the latest innovations in banking technology and what they mean for the industry.",
      date: "2024-02-01",
      readingTime: "5 min read",
      content: `
  # Fintech Trends in 2024
  
  The banking industry continues to evolve rapidly with new technologies...
  
  ## AI in Banking
  Artificial Intelligence is transforming how banks operate...
  
  ## Open Banking
  The rise of open banking APIs...
  
  ## Blockchain Applications
  Distributed ledger technology...
      `,
      tags: ["fintech", "banking", "technology", "AI"]
    },
    {
      title: "Building Modern Web Applications",
      slug: "modern-web-development",
      excerpt: "Best practices for building scalable web applications with Next.js and TypeScript.",
      date: "2024-01-15",
      readingTime: "7 min read",
      content: `
  # Building Modern Web Applications
  
  The landscape of web development is constantly changing...
  
  ## Type Safety with TypeScript
  Why TypeScript is essential...
  
  ## Server Components in Next.js
  Understanding the new paradigm...
      `,
      tags: ["development", "nextjs", "typescript", "web"]
    }
  ];
  
  // Utility functions for blog
  export function getAllPosts() {
    return blogPosts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  
  export function getPostBySlug(slug: string) {
    return blogPosts.find(post => post.slug === slug);
  }
  
  export function getAllTags() {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }
  
  export function getPostsByTag(tag: string) {
    return blogPosts.filter(post => post.tags.includes(tag));
  }