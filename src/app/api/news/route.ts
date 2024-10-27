// src/app/api/news/route.ts
import { NextResponse } from 'next/server';
import type { NewsAPIResponse } from '@/types/news';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export async function GET() {
  try {
    const response = await fetch(
      `${NEWS_API_URL}?q=(banking OR fintech) AND (AI OR "artificial intelligence")&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: `NewsAPI responded with status: ${response.status}` },
        { status: response.status }
      );
    }

    const newsData = await response.json() as NewsAPIResponse;
    return NextResponse.json(newsData);

  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}