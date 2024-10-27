// lib/newsService.ts

import { NewsItem, NewsAPIResponse, AIMetrics, TickerSentiment } from '@/types/news';

interface APIErrorResponse {
  error: string;
}

class NewsService {
  private readonly BANK_TICKERS = ['JPM', 'BAC', 'GS', 'MS', 'C', 'WFC'];

  async getAINewsAndSentiment(): Promise<NewsItem[]> {
    try {
      const response = await fetch('/api/news');

      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.statusText}`);
      }

      const data = await response.json() as NewsAPIResponse | APIErrorResponse;
      
      // Type guard to check if response is an error
      if ('error' in data) {
        throw new Error(data.error);
      }
      
      return data.articles.map(article => ({
        title: article.title,
        summary: article.description || '',
        time_published: article.publishedAt,
        url: article.url,
        source: {
          id: article.source.id,
          name: article.source.name
        },
        author: article.author,
        urlToImage: article.urlToImage,
        overall_sentiment_score: this.generateSentimentScore(),
        overall_sentiment_label: this.getSentimentLabel(this.generateSentimentScore()),
        ticker_sentiment: this.generateTickerSentiments()
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error instanceof Error ? error : new Error('Failed to fetch news');
    }
  }

  async getAIActivityMetrics(): Promise<AIMetrics> {
    const news = await this.getAINewsAndSentiment();
    
    return {
      timestamp: new Date().toISOString(),
      aiMentions: news.length,
      sentimentScore: news.reduce((acc, item) => acc + item.overall_sentiment_score, 0) / news.length,
      topKeywords: ['AI', 'machine learning', 'digital banking', 'automation', 'chatbots']
    };
  }

  private generateSentimentScore(): number {
    return (Math.random() * 2 - 1) * 0.5;
  }

  private getSentimentLabel(score: number): string {
    if (score >= 0.35) return 'Bullish';
    if (score >= 0.15) return 'Somewhat-Bullish';
    if (score <= -0.35) return 'Bearish';
    if (score <= -0.15) return 'Somewhat-Bearish';
    return 'Neutral';
  }

  private generateTickerSentiments(): TickerSentiment[] {
    const numTickers = Math.floor(Math.random() * 3) + 1;
    const selectedTickers = this.shuffleArray([...this.BANK_TICKERS]).slice(0, numTickers);
    
    return selectedTickers.map(ticker => ({
      ticker,
      relevance_score: (Math.random() * 0.5 + 0.5).toFixed(2),
      ticker_sentiment_score: this.generateSentimentScore(),
      ticker_sentiment_label: this.getSentimentLabel(this.generateSentimentScore())
    }));
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

export const newsService = new NewsService();
