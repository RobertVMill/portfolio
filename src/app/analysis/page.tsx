// app/analysis/page.tsx
import { TrendingUp, LineChart, PieChart, BarChart } from 'lucide-react'

export default function Page() {
  const insights = [
    {
      title: "Fintech Trends",
      description: "Analysis of emerging trends in financial technology and their impact on traditional banking.",
      icon: TrendingUp
    },
    {
      title: "Market Research",
      description: "Deep dive into market dynamics, competitor analysis, and industry opportunities.",
      icon: LineChart
    },
    {
      title: "Data Analytics",
      description: "Leveraging data to drive business decisions and identify growth opportunities.",
      icon: BarChart
    },
    {
      title: "Industry Reports",
      description: "Comprehensive reports on specific sectors within financial services.",
      icon: PieChart
    }
  ]

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Market Analysis</h1>
        <p className="text-xl text-gray-600 mb-12">
          In-depth analysis of fintech trends and market dynamics in banking
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{insight.title}</h3>
                </div>
                <p className="text-gray-600">{insight.description}</p>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Want to learn more?</h2>
          <p className="text-gray-600 mb-8">
            I regularly publish detailed market analysis and insights.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Latest Reports
          </button>
        </div>
      </div>
    </section>
  )
}