// types/news.ts

export interface NewsSource {
    id: string | null;
    name: string;
  }
  
  export interface NewsAPIArticle {
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    urlToImage?: string;
  }
  
  export interface NewsItem {
    title: string;
    summary: string;
    time_published: string;
    url: string;
    source: NewsSource;
    author: string | null;
    urlToImage?: string;
    overall_sentiment_score: number;
    overall_sentiment_label: string;
    ticker_sentiment: TickerSentiment[];
  }
  
  export interface TickerSentiment {
    ticker: string;
    relevance_score: string;
    ticker_sentiment_score: number;
    ticker_sentiment_label: string;
  }
  
  export interface NewsAPIResponse {
    status: string;
    totalResults: number;
    articles: NewsAPIArticle[];
  }
  
  export interface AIMetrics {
    timestamp: string;
    aiMentions: number;
    sentimentScore: number;
    topKeywords: string[];
  }