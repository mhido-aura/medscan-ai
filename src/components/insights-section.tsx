'use client'

import { TrendingUp, Lightbulb, Target } from 'lucide-react'

export default function InsightsSection() {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Health Trends',
      description: 'Track your health metrics over time with detailed analytics and predictive insights',
      stats: '87% Improvement'
    },
    {
      icon: Lightbulb,
      title: 'Smart Recommendations',
      description: 'Personalized medicine suggestions based on your health profile and AI analysis',
      stats: '100+ Options'
    },
    {
      icon: Target,
      title: 'Precision Medicine',
      description: 'Tailored treatment plans optimized specifically for your unique health needs',
      stats: '99.2% Match'
    }
  ]

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-cyan-500/20 via-transparent to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-t from-blue-500/15 via-transparent to-transparent rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            AI-Powered Insights
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Deep intelligence for better health decisions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <div
                key={index}
                className="group relative p-8 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden hover:border-blue-500/50 transition-all duration-300"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent"></div>

                {/* Corner glow */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full filter blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-2.5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-cyan-400">
                        {insight.stats}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {insight.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>

                  {/* Hover line */}
                  <div className="h-px bg-gradient-to-r from-blue-500/0 via-cyan-500 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
