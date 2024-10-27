// types/news.ts
export interface NewsItem {
  title: string;
  summary: string;
  time_published: string;
  url: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  urlToImage: string | null;
  overall_sentiment_score: number;
  overall_sentiment_label: string;
  ticker_sentiment: TickerSentiment[];
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: {
    title: string;
    description: string | null;
    publishedAt: string;
    url: string;
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    urlToImage: string | null;
  }[];
}

export interface TickerSentiment {
  ticker: string;
  relevance_score: string;
  ticker_sentiment_score: number;
  ticker_sentiment_label: string;
}

export interface AIMetrics {
  timestamp: string;
  aiMentions: number;
  sentimentScore: number;
  topKeywords: string[];
}