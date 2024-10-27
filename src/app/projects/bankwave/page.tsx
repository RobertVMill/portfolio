// app/projects/bankwave/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Newspaper, TrendingUp, Brain, Globe, Clock, User, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';
import type { NewsItem, AIMetrics } from '@/types/news';
import { formatDistance } from 'date-fns';
import { newsService } from '@/lib/newsService'; // Changed from default import

// Your components remain the same
const Header = () => (
  <header className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm z-50">
    <nav className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-blue-400 text-2xl">📈</span>
          <span className="text-white font-semibold text-xl">BankWave</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-300 hover:text-white">AI Trends</a>
          <a href="#" className="text-gray-300 hover:text-white">Innovations</a>
          <a href="#" className="text-gray-300 hover:text-white">Analysis</a>
          <a href="#" className="text-gray-300 hover:text-white">AI Forecast</a>
        </div>
      </div>
    </nav>
  </header>
);

interface StatsCardProps {
  title: string;
  value: string | number | JSX.Element;
  icon: JSX.Element;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => (
  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400">{title}</p>
        <div className="mt-2">{value}</div>
      </div>
      {icon}
    </div>
  </div>
);

interface NewsCardProps {
  item: NewsItem;
  getSentimentColor: (sentiment: number) => string;
  formatDate: (date: string) => string;
}

const NewsCard = ({ item, getSentimentColor, formatDate }: NewsCardProps) => (
  <div className="border-b border-gray-700/50 last:border-0 pb-8">
    <div className="flex gap-6">
      {item.urlToImage && (
        <div className="hidden md:block">
          <img 
            src={item.urlToImage} 
            alt={item.title}
            className="w-48 h-32 object-cover rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <a 
              href={item.url}
              target="_blank"
              rel="noopener noreferrer" 
              className="text-lg font-medium text-white hover:text-blue-400 transition-colors group flex items-center gap-2"
            >
              {item.title}
              <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              {item.source?.name && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {item.source.name}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatDate(item.time_published)}
              </div>
              {item.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {item.author.split(',')[0]}
                </div>
              )}
            </div>
            
            <p className="text-gray-300 mt-3">{item.summary}</p>
          </div>
          <div className="flex items-center">
            {Number(item.overall_sentiment_score) >= 0 ? (
              <ArrowUp className={`h-6 w-6 ${getSentimentColor(Number(item.overall_sentiment_score))}`} />
            ) : (
              <ArrowDown className={`h-6 w-6 ${getSentimentColor(Number(item.overall_sentiment_score))}`} />
            )}
          </div>
        </div>
        
        {item.ticker_sentiment && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {item.ticker_sentiment.map((ticker, idx) => (
              <div 
                key={idx}
                className={`text-sm px-2 py-1 rounded-full border ${
                  getSentimentColor(ticker.ticker_sentiment_score)
                } border-gray-700`}
              >
                {ticker.ticker}: {ticker.ticker_sentiment_score.toFixed(2)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex gap-4">
      <div className="w-48 h-32 bg-slate-700/50 rounded"></div>
      <div className="flex-1">
        <div className="h-6 bg-slate-700/50 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-700/50 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-slate-700/50 rounded w-full"></div>
      </div>
    </div>
  </div>
);

export default function BankWavePage() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [metrics, setMetrics] = useState<AIMetrics>({
    timestamp: new Date().toISOString(),
    aiMentions: 0,
    sentimentScore: 0,
    topKeywords: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [news, newsMetrics] = await Promise.all([
          newsService.getAINewsAndSentiment(),
          newsService.getAIActivityMetrics()
        ]);
        
        setNewsData(news);
        setMetrics(newsMetrics);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSentimentColor = (sentiment: number): string => {
    if (sentiment >= 0.35) return 'text-emerald-500';
    if (sentiment >= 0.15) return 'text-emerald-400';
    if (sentiment <= -0.35) return 'text-red-500';
    if (sentiment <= -0.15) return 'text-red-400';
    return 'text-gray-400';
  };

  const formatDate = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 pt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Overall AI Sentiment"
              value={
                <p className={`text-2xl font-bold ${getSentimentColor(metrics.sentimentScore)}`}>
                  {metrics.sentimentScore.toFixed(3)}
                </p>
              }
              icon={<TrendingUp className="h-8 w-8 text-blue-400" />}
            />
            
            <StatsCard
              title="AI News Coverage"
              value={<p className="text-2xl font-bold text-white">{newsData.length}</p>}
              icon={<Newspaper className="h-8 w-8 text-blue-400" />}
            />
            
            <StatsCard
              title="Top Keywords"
              value={
                <div className="flex flex-wrap gap-2">
                  {metrics.topKeywords.slice(0, 3).map((keyword, index) => (
                    <span key={index} className="text-sm text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              }
              icon={<Brain className="h-8 w-8 text-blue-400" />}
            />
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Newspaper className="h-6 w-6 text-blue-400" />
              AI Banking News & Sentiment Analysis
            </h2>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <LoadingSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-red-400 py-8">{error}</div>
            ) : (
              <div className="space-y-8">
                {newsData.map((item, index) => (
                  <NewsCard
                    key={index}
                    item={item}
                    getSentimentColor={getSentimentColor}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}