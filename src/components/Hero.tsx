// components/Hero.tsx
import React from 'react';
import { Code, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Product Manager & Developer
          </h1>
          
          <p className="text-xl text-gray-600">
            Driving fintech innovation at CIBC
          </p>

          <div className="space-y-12 mt-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Code className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold">Technical Expertise</h2>
              </div>
              <p className="text-gray-600 text-lg">
                Building robust applications and tools that drive business value through AI & code.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold">Market Insights</h2>
              </div>
              <p className="text-gray-600 text-lg">
                Deep understanding of fintech trends and market dynamics in banking.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link 
              href="/projects" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              View Projects
            </Link>
            <Link 
              href="/analysis" 
              className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all text-center"
            >
              Market Analysis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;