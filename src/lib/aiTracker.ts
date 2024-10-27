// lib/aiTracker.ts

import axios from 'axios';

// In lib/aiTracker.ts, update the NewsItem interface
interface NewsItem {
    title: string;
    summary: string;
    time_published: string;
    url: string;
    authors?: string[];
    banner_image?: string;
    source?: string;
    category_within_source?: string;
    source_domain?: string;
    topics?: Array<{
      topic: string;
      relevance_score: string;
    }>;
    overall_sentiment_score: number;
    overall_sentiment_label: string;
    ticker_sentiment: Array<{
      ticker: string;
      relevance_score: string;
      ticker_sentiment_score: number;
      ticker_sentiment_label: string;
    }>;
  }

interface AIBankingMetrics {
  timestamp: string;
  aiMentions: number;
  sentimentScore: number;
  topKeywords: string[];
}

export class AIBankingTracker {
  private readonly ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
  private readonly BASE_URL = 'https://www.alphavantage.co/query';
  
  private readonly bankTickers = [
    'JPM',  // JPMorgan Chase
    'BAC',  // Bank of America
    'GS',   // Goldman Sachs
    'MS',   // Morgan Stanley
    'C',    // Citigroup
  ];

  private readonly aiKeywords = [
    'artificial intelligence',
    'machine learning',
    'AI adoption',
    'digital transformation',
    'automation',
    'chatbot',
    'natural language processing',
    'predictive analytics'
  ];

  async getAINewsAndSentiment(): Promise<NewsItem[]> {
    if (!this.ALPHA_VANTAGE_API_KEY) {
      throw new Error('Alpha Vantage API key is not configured');
    }

    try {
      const relevantNews: NewsItem[] = [];
      
      // Get news for each bank
      for (const ticker of this.bankTickers) {
        const response = await axios.get(this.BASE_URL, {
          params: {
            function: 'NEWS_SENTIMENT',
            tickers: ticker,
            topics: 'technology',
            apikey: this.ALPHA_VANTAGE_API_KEY
          }
        });

        // Filter news items for AI-related content
        const newsItems = response.data.feed || [];
        const aiRelatedNews = newsItems.filter((item: NewsItem) => 
          this.aiKeywords.some(keyword => 
            item.title.toLowerCase().includes(keyword) || 
            item.summary.toLowerCase().includes(keyword)
          )
        );

        relevantNews.push(...aiRelatedNews);
      }

      return relevantNews;
    } catch (error) {
      console.error('Error fetching AI news:', error);
      throw error;
    }
  }

  async getAIActivityMetrics(): Promise<AIBankingMetrics> {
    try {
      const news = await this.getAINewsAndSentiment();
      
      // Calculate metrics
      const metrics: AIBankingMetrics = {
        timestamp: new Date().toISOString(),
        aiMentions: news.length,
        sentimentScore: this.calculateAverageSentiment(news),
        topKeywords: this.extractTopKeywords(news)
      };

      return metrics;
    } catch (error) {
      console.error('Error calculating AI metrics:', error);
      throw error;
    }
  }

  private calculateAverageSentiment(news: NewsItem[]): number {
    if (news.length === 0) return 0;
    
    const totalSentiment = news.reduce(
      (sum, item) => sum + item.overall_sentiment_score, 
      0
    );
    return totalSentiment / news.length;
  }

  private extractTopKeywords(news: NewsItem[]): string[] {
    const keywordCounts = new Map<string, number>();

    // Count occurrences of AI keywords in news
    news.forEach(item => {
      const content = `${item.title} ${item.summary}`.toLowerCase();
      this.aiKeywords.forEach(keyword => {
        if (content.includes(keyword)) {
          keywordCounts.set(
            keyword, 
            (keywordCounts.get(keyword) || 0) + 1
          );
        }
      });
    });

    // Sort keywords by frequency
    return Array.from(keywordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([keyword]) => keyword);
  }
}

// Export a default instance
export default new AIBankingTracker();