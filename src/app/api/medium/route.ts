import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

export async function GET() {
  try {
    const response = await fetch('https://medium.com/@robertmill/feed', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    const xmlData = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    
    const result = parser.parse(xmlData);
    const articles = result.rss.channel.item.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      categories: Array.isArray(item.category) ? item.category : [item.category],
      content: item["content:encoded"],
      image: item["content:encoded"].match(/<img.*?src="(.*?)"/)?.[1] || null
    }));

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
