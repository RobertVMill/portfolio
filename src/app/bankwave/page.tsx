// app/bankwave/page.tsx
import { Activity, Network, Sparkles } from 'lucide-react'

const insights = [
  {
    title: "AI Transformations",
    description: "How neural networks are reshaping traditional banking systems",
    icon: Activity, // Changed from Brain
    category: "Innovation",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Digital Banking Evolution",
    description: "The convergence of AI and digital banking platforms",
    icon: Network,
    category: "Technology",
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    title: "Future of FinTech",
    description: "Predictive analysis of upcoming banking technologies",
    icon: Sparkles,
    category: "Future Trends",
    gradient: "from-teal-500 to-blue-500"
  }
]

// Rest of the code...

export default function BankWavePage() {
  return (
    <div>
      {/* Hero Section with Wave Animation */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10" />
        <div className="relative pt-20 pb-32 sm:pt-32 sm:pb-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Riding the Wave of</span>
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AI Banking Innovation
                </span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300">
                Discover how artificial intelligence is creating ripples of change across the banking industry.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid gap-8 md:grid-cols-3">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <div 
                key={index} 
                className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${insight.gradient}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-white">{insight.title}</h3>
                </div>
                <p className="text-gray-300">{insight.description}</p>
                <div className="mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${insight.gradient} text-white`}>
                    {insight.category}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}