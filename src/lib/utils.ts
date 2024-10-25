// src/lib/utils.ts
export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  export function truncateText(text: string, length: number) {
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + '...';
  }
  
  export function generateSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
  
  export function getReadingTime(text: string) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }
  
  // SEO utils
  export function generateMetadata(params: {
    title: string;
    description: string;
    image?: string;
  }) {
    return {
      title: `${params.title} | Robert Mill`,
      description: params.description,
      openGraph: {
        title: params.title,
        description: params.description,
        images: params.image ? [{ url: params.image }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: params.title,
        description: params.description,
        images: params.image ? [params.image] : undefined,
      },
    };
  }