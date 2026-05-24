'use client'

import {
  AlertTriangle,
  ShieldCheck,
  Activity,
  Sparkles,
} from 'lucide-react'

type Props = {
  aiData?: any
  fdaData?: any
}

export default function AiAnalysisCard({
  aiData,
  fdaData,
}: Props) {

  const medicine = fdaData?.results?.[0]

  const sections = [
    {
      title: 'Warnings',
      icon: AlertTriangle,
      value:
        medicine?.warnings?.[0] ||
        'May cause dizziness and drowsiness.',
      color:
        'from-red-500 to-orange-500',
    },
    {
      title: 'Conservation Advice',
      icon: ShieldCheck,
      value:
        'Store below 25°C in a dry environment away from sunlight.',
      color:
        'from-cyan-500 to-blue-500',
    },
    {
      title: 'Dosage Insights',
      icon: Activity,
      value:
        medicine?.dosage_and_administration?.[0] ||
        'Take 1 tablet every 8 hours after meals.',
      color:
        'from-green-500 to-emerald-500',
    },
    {
      title: 'Effectiveness',
      icon: Sparkles,
      value:
        'AI effectiveness score: 92%',
      color:
        'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section className="py-20 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm mb-6">

            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>

            AI Medical Analysis

          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Advanced AI Insights
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Real-time pharmaceutical analysis powered by AI technology.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {sections.map((section, index) => {

            const Icon = section.icon

            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-2"
              >

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>

                {/* Content */}
                <div className="relative z-10">

                  {/* Top */}
                  <div className="flex items-center justify-between mb-6">

                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} p-3 shadow-lg`}>

                      <Icon className="w-full h-full text-white" />

                    </div>

                    <div className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs animate-pulse">
                      ACTIVE
                    </div>

                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {section.title}
                  </h3>

                  {/* Text */}
                  <p className="text-gray-300 leading-relaxed">
                    {section.value}
                  </p>

                </div>

              </div>
            )
          })}

        </div>

        {/* AI Summary */}
        <div className="mt-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>

            <h3 className="text-2xl font-semibold text-white">
              AI Summary
            </h3>

          </div>

          <p className="text-gray-300 leading-relaxed whitespace-pre-line">

            {aiData?.choices?.[0]?.message?.content ||
              'AI analysis will appear here after scanning the medicine.'}

          </p>

        </div>

      </div>

    </section>
  )
}