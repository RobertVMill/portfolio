// app/bankwave/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { Activity } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BankWave | AI Banking Innovation Intelligence',
  description: 'Riding the wave of AI banking innovation',
}

export default function BankWaveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}> {/* Add the inter font className here */}
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
        <nav className="border-b border-blue-800/30 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center gap-2">
                  <Activity className="h-8 w-8 text-cyan-400" />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    BankWave
                  </h1>
                </div>
                <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                  <a href="#trends" className="text-gray-300 hover:text-cyan-400 transition-colors inline-flex items-center px-1 pt-1 text-sm font-medium">
                    AI Trends
                  </a>
                  <a href="#innovations" className="text-gray-300 hover:text-cyan-400 transition-colors inline-flex items-center px-1 pt-1 text-sm font-medium">
                    Innovations
                  </a>
                  <a href="#analysis" className="text-gray-300 hover:text-cyan-400 transition-colors inline-flex items-center px-1 pt-1 text-sm font-medium">
                    Analysis
                  </a>
                  <a href="#forecast" className="text-gray-300 hover:text-cyan-400 transition-colors inline-flex items-center px-1 pt-1 text-sm font-medium">
                    AI Forecast
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </div>
    </div>
  )
}